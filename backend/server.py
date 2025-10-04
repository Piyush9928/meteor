from fastapi import FastAPI, APIRouter, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime, date, timedelta
import httpx
import asyncio
from contextlib import asynccontextmanager
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# NASA API configuration
NASA_API_KEY = "DEMO_KEY"  # Using demo key for initial development
NASA_BASE_URL = "https://api.nasa.gov/neo/rest/v1"

# Global HTTP client
http_client: Optional[httpx.AsyncClient] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global http_client
    # Initialize HTTP client
    http_client = httpx.AsyncClient(timeout=30.0)
    logging.info("NASA API client initialized")
    yield
    # Cleanup
    if http_client:
        await http_client.aclose()
    logging.info("NASA API client closed")

# Create FastAPI app
app = FastAPI(
    title="Meteor Madness - Asteroid Impact Portal",
    description="Advanced asteroid visualization and mitigation platform",
    version="1.0.0",
    lifespan=lifespan
)

# Create API router
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class AsteroidSummary(BaseModel):
    id: str
    name: str
    diameter_km: Optional[float] = None
    velocity_kmh: Optional[float] = None
    miss_distance_km: Optional[float] = None
    is_hazardous: bool = False
    approach_date: Optional[str] = None

class AsteroidDetails(BaseModel):
    id: str
    name: str
    nasa_jpl_url: str
    absolute_magnitude: Optional[float] = None
    diameter_min_km: Optional[float] = None
    diameter_max_km: Optional[float] = None
    is_hazardous: bool = False
    orbital_data: Optional[Dict[str, Any]] = None
    close_approaches: List[Dict[str, Any]] = []

class SimulationInput(BaseModel):
    diameter_km: float = Field(..., ge=0.001, le=100, description="Asteroid diameter in kilometers")
    velocity_kms: float = Field(..., ge=1, le=100, description="Impact velocity in km/s")
    angle_degrees: float = Field(45, ge=10, le=90, description="Impact angle in degrees")
    composition: str = Field("rocky", description="Asteroid composition")
    target_location: str = Field("land", description="Impact location type")

class SimulationResult(BaseModel):
    crater_diameter_km: float
    energy_megatons: float
    affected_radius_km: float
    population_at_risk: int
    damage_assessment: Dict[str, str]
    seismic_magnitude: float
    fireball_radius_km: float

class MitigationStrategy(BaseModel):
    id: str
    name: str
    description: str
    effectiveness_percent: float
    cost_billions_usd: float
    timeline_years: float
    technology_readiness: int
    pros: List[str]
    cons: List[str]

# NASA API helper functions
async def fetch_nasa_data(endpoint: str, params: Dict[str, Any] = None) -> Dict[str, Any]:
    """Fetch data from NASA NeoWs API"""
    global http_client
    if not http_client:
        raise HTTPException(status_code=503, detail="HTTP client not available")
    
    url = f"{NASA_BASE_URL}{endpoint}"
    params = params or {}
    params["api_key"] = NASA_API_KEY
    
    try:
        response = await http_client.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Asteroid not found")
        elif e.response.status_code == 429:
            raise HTTPException(status_code=429, detail="NASA API rate limit exceeded")
        else:
            raise HTTPException(status_code=503, detail=f"NASA API error: {e.response.status_code}")
    except Exception as e:
        logging.error(f"NASA API request failed: {e}")
        raise HTTPException(status_code=503, detail="NASA API service unavailable")

def parse_asteroid_summary(asteroid_data: Dict[str, Any]) -> AsteroidSummary:
    """Parse NASA asteroid data into summary format"""
    close_approaches = asteroid_data.get("close_approach_data", [])
    closest_approach = min(close_approaches, key=lambda x: float(x["miss_distance"]["kilometers"])) if close_approaches else None
    
    diameter_data = asteroid_data.get("estimated_diameter", {}).get("kilometers", {})
    diameter_km = diameter_data.get("estimated_diameter_max") if diameter_data else None
    
    velocity_kmh = None
    miss_distance_km = None
    approach_date = None
    
    if closest_approach:
        velocity_kmh = float(closest_approach["relative_velocity"]["kilometers_per_hour"])
        miss_distance_km = float(closest_approach["miss_distance"]["kilometers"])
        approach_date = closest_approach["close_approach_date"]
    
    return AsteroidSummary(
        id=asteroid_data["id"],
        name=asteroid_data["name"],
        diameter_km=diameter_km,
        velocity_kmh=velocity_kmh,
        miss_distance_km=miss_distance_km,
        is_hazardous=asteroid_data["is_potentially_hazardous_asteroid"],
        approach_date=approach_date
    )

def calculate_impact_simulation(params: SimulationInput) -> SimulationResult:
    """Calculate asteroid impact simulation results"""
    import math
    
    # Basic impact physics calculations
    diameter_m = params.diameter_km * 1000
    velocity_ms = params.velocity_kms * 1000
    
    # Asteroid mass estimation (assuming rocky composition, density ~2600 kg/m³)
    radius_m = diameter_m / 2
    volume_m3 = (4/3) * math.pi * (radius_m ** 3)
    mass_kg = volume_m3 * 2600  # Rocky asteroid density
    
    # Kinetic energy calculation
    energy_joules = 0.5 * mass_kg * (velocity_ms ** 2)
    energy_megatons = energy_joules / (4.184e15)  # Convert to megatons TNT
    
    # Crater diameter (complex crater scaling)
    crater_diameter_km = 1.8 * (params.diameter_km ** 0.13) * (params.velocity_kms ** 0.44) * (math.sin(math.radians(params.angle_degrees)) ** 0.33)
    
    # Affected radius (various damage zones)
    fireball_radius_km = 0.028 * (energy_megatons ** 0.33)
    blast_radius_km = 0.4 * (energy_megatons ** 0.33)
    thermal_radius_km = 1.9 * (energy_megatons ** 0.33)
    
    affected_radius_km = max(fireball_radius_km, blast_radius_km, thermal_radius_km)
    
    # Population estimation (rough global average)
    affected_area_km2 = math.pi * (affected_radius_km ** 2)
    population_density_per_km2 = 15  # Global average
    population_at_risk = int(affected_area_km2 * population_density_per_km2)
    
    # Seismic magnitude estimation
    seismic_magnitude = 0.67 * math.log10(energy_megatons) + 5.87
    
    # Damage assessment
    if energy_megatons < 1:
        damage_level = "Local damage, buildings destroyed within blast radius"
    elif energy_megatons < 100:
        damage_level = "Regional catastrophe, severe damage across metropolitan area"
    elif energy_megatons < 10000:
        damage_level = "National disaster, continent-wide effects"
    else:
        damage_level = "Global catastrophe, mass extinction event"
    
    damage_assessment = {
        "overall": damage_level,
        "crater": f"Crater diameter: {crater_diameter_km:.1f} km",
        "fireball": f"Fireball radius: {fireball_radius_km:.1f} km",
        "blast": f"Blast damage radius: {blast_radius_km:.1f} km",
        "thermal": f"Thermal radiation radius: {thermal_radius_km:.1f} km"
    }
    
    return SimulationResult(
        crater_diameter_km=crater_diameter_km,
        energy_megatons=energy_megatons,
        affected_radius_km=affected_radius_km,
        population_at_risk=population_at_risk,
        damage_assessment=damage_assessment,
        seismic_magnitude=seismic_magnitude,
        fireball_radius_km=fireball_radius_km
    )

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Meteor Madness - Asteroid Impact Portal API", "version": "1.0.0"}

@api_router.get("/asteroids/feed", response_model=List[AsteroidSummary])
async def get_asteroid_feed(
    start_date: date = Query(..., description="Start date (YYYY-MM-DD)"),
    end_date: Optional[date] = Query(None, description="End date (YYYY-MM-DD)")
):
    """Get asteroid feed from NASA for specified date range"""
    if end_date is None:
        end_date = start_date
    
    # NASA API limits to 7 days
    if (end_date - start_date).days > 7:
        raise HTTPException(status_code=400, detail="Date range cannot exceed 7 days")
    
    params = {
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat()
    }
    
    data = await fetch_nasa_data("/feed", params)
    
    asteroids = []
    for date_key, daily_asteroids in data.get("near_earth_objects", {}).items():
        for asteroid in daily_asteroids:
            try:
                asteroids.append(parse_asteroid_summary(asteroid))
            except Exception as e:
                logging.warning(f"Failed to parse asteroid {asteroid.get('id', 'unknown')}: {e}")
                continue
    
    # Sort by closest approach distance
    asteroids.sort(key=lambda x: x.miss_distance_km or float('inf'))
    
    return asteroids

@api_router.get("/asteroids/{asteroid_id}", response_model=AsteroidDetails)
async def get_asteroid_details(asteroid_id: str):
    """Get detailed information about a specific asteroid"""
    data = await fetch_nasa_data(f"/neo/{asteroid_id}")
    
    diameter_data = data.get("estimated_diameter", {}).get("kilometers", {})
    
    return AsteroidDetails(
        id=data["id"],
        name=data["name"],
        nasa_jpl_url=data["nasa_jpl_url"],
        absolute_magnitude=data.get("absolute_magnitude_h"),
        diameter_min_km=diameter_data.get("estimated_diameter_min"),
        diameter_max_km=diameter_data.get("estimated_diameter_max"),
        is_hazardous=data["is_potentially_hazardous_asteroid"],
        orbital_data=data.get("orbital_data"),
        close_approaches=data.get("close_approach_data", [])
    )

@api_router.get("/asteroids/browse", response_model=List[AsteroidSummary])
async def browse_asteroids(
    page: int = Query(0, ge=0, description="Page number"),
    size: int = Query(20, ge=1, le=50, description="Page size")
):
    """Browse asteroids with pagination"""
    params = {"page": page, "size": size}
    data = await fetch_nasa_data("/neo/browse", params)
    
    asteroids = []
    for asteroid in data.get("near_earth_objects", []):
        try:
            asteroids.append(parse_asteroid_summary(asteroid))
        except Exception as e:
            logging.warning(f"Failed to parse asteroid {asteroid.get('id', 'unknown')}: {e}")
            continue
    
    return asteroids

@api_router.get("/asteroids/hazardous", response_model=List[AsteroidSummary])
async def get_hazardous_asteroids():
    """Get potentially hazardous asteroids from recent data"""
    # Get data for the last 7 days
    end_date = date.today()
    start_date = end_date - timedelta(days=7)
    
    params = {
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat()
    }
    
    data = await fetch_nasa_data("/feed", params)
    
    hazardous_asteroids = []
    for date_key, daily_asteroids in data.get("near_earth_objects", {}).items():
        for asteroid in daily_asteroids:
            if asteroid["is_potentially_hazardous_asteroid"]:
                try:
                    hazardous_asteroids.append(parse_asteroid_summary(asteroid))
                except Exception as e:
                    logging.warning(f"Failed to parse hazardous asteroid {asteroid.get('id', 'unknown')}: {e}")
                    continue
    
    # Sort by size (largest first)
    hazardous_asteroids.sort(key=lambda x: x.diameter_km or 0, reverse=True)
    
    return hazardous_asteroids

@api_router.post("/simulation/impact", response_model=SimulationResult)
async def simulate_impact(params: SimulationInput):
    """Simulate asteroid impact with given parameters"""
    return calculate_impact_simulation(params)

@api_router.get("/mitigation/strategies", response_model=List[MitigationStrategy])
async def get_mitigation_strategies():
    """Get available asteroid mitigation strategies"""
    strategies = [
        MitigationStrategy(
            id="kinetic_impactor",
            name="Kinetic Impactor",
            description="Spacecraft collision to change asteroid trajectory",
            effectiveness_percent=75,
            cost_billions_usd=2.5,
            timeline_years=5,
            technology_readiness=8,
            pros=["Proven technology", "Relatively low cost", "Quick deployment"],
            cons=["Limited to smaller asteroids", "Requires early detection", "Single point of failure"]
        ),
        MitigationStrategy(
            id="gravity_tractor",
            name="Gravity Tractor",
            description="Spacecraft uses gravitational force to gradually change orbit",
            effectiveness_percent=60,
            cost_billions_usd=5.0,
            timeline_years=10,
            technology_readiness=6,
            pros=["Very precise control", "No debris creation", "Scalable force"],
            cons=["Very slow process", "High cost", "Requires decades of warning"]
        ),
        MitigationStrategy(
            id="nuclear_deflection",
            name="Nuclear Deflection",
            description="Nuclear device detonation to change asteroid trajectory",
            effectiveness_percent=95,
            cost_billions_usd=15.0,
            timeline_years=3,
            technology_readiness=7,
            pros=["Very effective", "Works on large asteroids", "Proven nuclear technology"],
            cons=["Political challenges", "Risk of fragmentation", "Complex mission"]
        ),
        MitigationStrategy(
            id="ion_beam",
            name="Ion Beam Shepherd",
            description="Ion propulsion to slowly deflect asteroid over time",
            effectiveness_percent=70,
            cost_billions_usd=8.0,
            timeline_years=15,
            technology_readiness=5,
            pros=["Precise control", "No contamination", "Continuous operation"],
            cons=["Requires very early detection", "Complex technology", "Long deployment time"]
        ),
        MitigationStrategy(
            id="solar_sail",
            name="Solar Sail/Mirror",
            description="Reflective material to create radiation pressure",
            effectiveness_percent=40,
            cost_billions_usd=3.0,
            timeline_years=20,
            technology_readiness=4,
            pros=["No fuel required", "Sustainable operation", "Minimal mass needed"],
            cons=["Very slow process", "Limited effectiveness", "Deployment challenges"]
        )
    ]
    
    return strategies

@api_router.get("/statistics/dashboard")
async def get_dashboard_statistics():
    """Get comprehensive statistics for dashboard"""
    try:
        # Get recent asteroid data
        end_date = date.today()
        start_date = end_date - timedelta(days=7)
        
        params = {
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat()
        }
        
        data = await fetch_nasa_data("/feed", params)
        
        total_asteroids = 0
        hazardous_count = 0
        size_categories = {"small": 0, "medium": 0, "large": 0, "unknown": 0}
        closest_approach = {"distance": float('inf'), "name": "", "date": ""}
        
        for date_key, daily_asteroids in data.get("near_earth_objects", {}).items():
            total_asteroids += len(daily_asteroids)
            
            for asteroid in daily_asteroids:
                if asteroid["is_potentially_hazardous_asteroid"]:
                    hazardous_count += 1
                
                # Size categorization
                diameter_data = asteroid.get("estimated_diameter", {}).get("kilometers", {})
                if diameter_data:
                    max_diameter = diameter_data.get("estimated_diameter_max", 0)
                    if max_diameter < 0.1:
                        size_categories["small"] += 1
                    elif max_diameter < 1.0:
                        size_categories["medium"] += 1
                    else:
                        size_categories["large"] += 1
                else:
                    size_categories["unknown"] += 1
                
                # Find closest approach
                for approach in asteroid.get("close_approach_data", []):
                    distance_km = float(approach["miss_distance"]["kilometers"])
                    if distance_km < closest_approach["distance"]:
                        closest_approach = {
                            "distance": distance_km,
                            "name": asteroid["name"],
                            "date": approach["close_approach_date"]
                        }
        
        return {
            "total_asteroids": total_asteroids,
            "hazardous_asteroids": hazardous_count,
            "hazardous_percentage": (hazardous_count / total_asteroids * 100) if total_asteroids > 0 else 0,
            "size_distribution": size_categories,
            "closest_approach": closest_approach,
            "observation_period": f"{start_date} to {end_date}"
        }
        
    except Exception as e:
        logging.error(f"Failed to get dashboard statistics: {e}")
        return {
            "total_asteroids": 0,
            "hazardous_asteroids": 0,
            "hazardous_percentage": 0,
            "size_distribution": {"small": 0, "medium": 0, "large": 0, "unknown": 0},
            "closest_approach": {"distance": 0, "name": "N/A", "date": ""},
            "observation_period": "No data available"
        }

# Include router
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
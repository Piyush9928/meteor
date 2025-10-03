from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests
from urllib.parse import quote

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# NASA NeoWs API Configuration
NASA_API_BASE = "https://api.nasa.gov/neo/rest/v1"

# Define Models
class ImpactSimulation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    diameter: float  # in meters
    velocity: float  # in km/s
    angle: float  # in degrees
    density: float  # in kg/m³
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
class ImpactSimulationCreate(BaseModel):
    diameter: float
    velocity: float
    angle: float
    density: float

class ImpactResult(BaseModel):
    kinetic_energy: float  # in megatons TNT
    crater_diameter: float  # in km
    crater_depth: float  # in km
    fireball_radius: float  # in km
    blast_radius: float  # in km
    thermal_radiation_radius: float  # in km
    seismic_magnitude: float
    affected_population_estimate: str

# NASA API Routes
@api_router.get("/asteroids/near-earth")
async def get_near_earth_asteroids(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    limit: int = 20
):
    """
    Fetch near-Earth asteroids from NASA NeoWs API
    """
    try:
        # Use current date if not provided
        if not start_date:
            from datetime import date, timedelta
            today = date.today()
            start_date = today.isoformat()
            end_date = (today + timedelta(days=7)).isoformat()
        
        # NASA API endpoint (no API key needed for basic usage)
        url = f"{NASA_API_BASE}/feed?start_date={start_date}&end_date={end_date}"
        
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            # Extract and format asteroid data
            asteroids = []
            for date_key, date_asteroids in data.get('near_earth_objects', {}).items():
                for asteroid in date_asteroids[:limit]:
                    asteroids.append({
                        'id': asteroid.get('id'),
                        'name': asteroid.get('name'),
                        'nasa_jpl_url': asteroid.get('nasa_jpl_url'),
                        'absolute_magnitude': asteroid.get('absolute_magnitude_h'),
                        'estimated_diameter': asteroid.get('estimated_diameter', {}).get('meters', {}),
                        'is_potentially_hazardous': asteroid.get('is_potentially_hazardous_asteroid'),
                        'close_approach_data': asteroid.get('close_approach_data', [{}])[0] if asteroid.get('close_approach_data') else {},
                        'orbital_data': asteroid.get('orbital_data', {})
                    })
            
            return {
                'count': len(asteroids),
                'asteroids': asteroids[:limit]
            }
        else:
            # Fallback to sample data if API fails
            return get_sample_asteroids()
            
    except Exception as e:
        logger.error(f"Error fetching NASA data: {str(e)}")
        # Return sample data as fallback
        return get_sample_asteroids()

def get_sample_asteroids():
    """Sample asteroid data for when NASA API is unavailable"""
    return {
        'count': 10,
        'asteroids': [
            {
                'id': '2021277',
                'name': '2021277 (1996 TO5)',
                'absolute_magnitude': 19.73,
                'estimated_diameter': {'estimated_diameter_min': 310.3, 'estimated_diameter_max': 693.8},
                'is_potentially_hazardous': True,
                'close_approach_data': {
                    'close_approach_date': '2024-12-15',
                    'relative_velocity': {'kilometers_per_second': '18.42'},
                    'miss_distance': {'astronomical': '0.3156', 'kilometers': '47219844'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'APO'}}
            },
            {
                'id': '3122',
                'name': '3122 Florence (1981 ET3)',
                'absolute_magnitude': 14.1,
                'estimated_diameter': {'estimated_diameter_min': 4300, 'estimated_diameter_max': 9600},
                'is_potentially_hazardous': True,
                'close_approach_data': {
                    'close_approach_date': '2025-01-20',
                    'relative_velocity': {'kilometers_per_second': '13.51'},
                    'miss_distance': {'astronomical': '0.047', 'kilometers': '7033950'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'AMO'}}
            },
            {
                'id': '433',
                'name': '433 Eros (1898 DQ)',
                'absolute_magnitude': 10.4,
                'estimated_diameter': {'estimated_diameter_min': 16840, 'estimated_diameter_max': 37660},
                'is_potentially_hazardous': False,
                'close_approach_data': {
                    'close_approach_date': '2025-03-10',
                    'relative_velocity': {'kilometers_per_second': '7.42'},
                    'miss_distance': {'astronomical': '0.217', 'kilometers': '32464380'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'AMO'}}
            },
            {
                'id': '99942',
                'name': '99942 Apophis (2004 MN4)',
                'absolute_magnitude': 19.7,
                'estimated_diameter': {'estimated_diameter_min': 340, 'estimated_diameter_max': 370},
                'is_potentially_hazardous': True,
                'close_approach_data': {
                    'close_approach_date': '2029-04-13',
                    'relative_velocity': {'kilometers_per_second': '7.42'},
                    'miss_distance': {'astronomical': '0.0002', 'kilometers': '31000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'ATE'}}
            },
            {
                'id': '101955',
                'name': '101955 Bennu (1999 RQ36)',
                'absolute_magnitude': 20.9,
                'estimated_diameter': {'estimated_diameter_min': 490, 'estimated_diameter_max': 490},
                'is_potentially_hazardous': True,
                'close_approach_data': {
                    'close_approach_date': '2135-09-25',
                    'relative_velocity': {'kilometers_per_second': '11.03'},
                    'miss_distance': {'astronomical': '0.002', 'kilometers': '299000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'APO'}}
            },
            {
                'id': '162173',
                'name': '162173 Ryugu (1999 JU3)',
                'absolute_magnitude': 19.2,
                'estimated_diameter': {'estimated_diameter_min': 900, 'estimated_diameter_max': 900},
                'is_potentially_hazardous': False,
                'close_approach_data': {
                    'close_approach_date': '2025-06-15',
                    'relative_velocity': {'kilometers_per_second': '9.87'},
                    'miss_distance': {'astronomical': '0.18', 'kilometers': '26930000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'APO'}}
            },
            {
                'id': '4179',
                'name': '4179 Toutatis (1989 AC)',
                'absolute_magnitude': 15.3,
                'estimated_diameter': {'estimated_diameter_min': 2500, 'estimated_diameter_max': 5400},
                'is_potentially_hazardous': True,
                'close_approach_data': {
                    'close_approach_date': '2025-11-29',
                    'relative_velocity': {'kilometers_per_second': '10.42'},
                    'miss_distance': {'astronomical': '0.019', 'kilometers': '2844000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'APO'}}
            },
            {
                'id': '1866',
                'name': '1866 Sisyphus (1972 XA)',
                'absolute_magnitude': 12.5,
                'estimated_diameter': {'estimated_diameter_min': 8500, 'estimated_diameter_max': 8500},
                'is_potentially_hazardous': False,
                'close_approach_data': {
                    'close_approach_date': '2025-07-08',
                    'relative_velocity': {'kilometers_per_second': '12.63'},
                    'miss_distance': {'astronomical': '0.115', 'kilometers': '17200000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'APO'}}
            },
            {
                'id': '2062',
                'name': '2062 Aten (1976 AA)',
                'absolute_magnitude': 16.8,
                'estimated_diameter': {'estimated_diameter_min': 900, 'estimated_diameter_max': 2000},
                'is_potentially_hazardous': False,
                'close_approach_data': {
                    'close_approach_date': '2025-02-14',
                    'relative_velocity': {'kilometers_per_second': '14.22'},
                    'miss_distance': {'astronomical': '0.092', 'kilometers': '13760000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'ATE'}}
            },
            {
                'id': '1620',
                'name': '1620 Geographos (1951 RA)',
                'absolute_magnitude': 15.6,
                'estimated_diameter': {'estimated_diameter_min': 2000, 'estimated_diameter_max': 5100},
                'is_potentially_hazardous': True,
                'close_approach_data': {
                    'close_approach_date': '2025-08-18',
                    'relative_velocity': {'kilometers_per_second': '16.78'},
                    'miss_distance': {'astronomical': '0.033', 'kilometers': '4936000'}
                },
                'orbital_data': {'orbit_class': {'orbit_class_type': 'APO'}}
            }
        ]
    }

@api_router.get("/asteroids/{asteroid_id}")
async def get_asteroid_details(asteroid_id: str):
    """
    Get detailed information about a specific asteroid
    """
    try:
        url = f"{NASA_API_BASE}/neo/{asteroid_id}"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=404, detail="Asteroid not found")
            
    except Exception as e:
        logger.error(f"Error fetching asteroid details: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching asteroid data")

@api_router.post("/simulate/impact", response_model=ImpactResult)
async def simulate_impact(simulation: ImpactSimulationCreate):
    """
    Calculate impact effects based on asteroid parameters
    Uses simplified impact modeling formulas
    """
    try:
        # Store simulation in database
        sim_obj = ImpactSimulation(**simulation.dict())
        await db.impact_simulations.insert_one(sim_obj.dict())
        
        # Physics calculations
        diameter_m = simulation.diameter
        velocity_ms = simulation.velocity * 1000  # convert km/s to m/s
        angle_rad = simulation.angle * 3.14159 / 180
        density = simulation.density
        
        # Mass calculation (assuming spherical asteroid)
        radius = diameter_m / 2
        volume = (4/3) * 3.14159 * (radius ** 3)
        mass = volume * density
        
        # Kinetic energy in joules
        kinetic_energy_j = 0.5 * mass * (velocity_ms ** 2)
        # Convert to megatons of TNT (1 megaton = 4.184e15 joules)
        kinetic_energy_mt = kinetic_energy_j / 4.184e15
        
        # Crater calculations (simplified)
        crater_diameter_km = 0.07 * (diameter_m / 1000) * (velocity_ms / 1000) ** 0.44
        crater_depth_km = crater_diameter_km / 5
        
        # Blast effects radii
        fireball_radius_km = 0.28 * (kinetic_energy_mt ** 0.33)
        blast_radius_km = 1.2 * (kinetic_energy_mt ** 0.33)
        thermal_radiation_radius_km = 2.5 * (kinetic_energy_mt ** 0.41)
        
        # Seismic magnitude (Richter scale approximation)
        seismic_magnitude = 0.67 * (kinetic_energy_mt ** 0.33) + 3.87
        
        # Population estimate based on blast radius
        if blast_radius_km < 5:
            pop_estimate = "Localized damage - Thousands affected"
        elif blast_radius_km < 20:
            pop_estimate = "City-scale damage - Hundreds of thousands affected"
        elif blast_radius_km < 100:
            pop_estimate = "Regional devastation - Millions affected"
        else:
            pop_estimate = "Continental impact - Tens of millions or more affected"
        
        return ImpactResult(
            kinetic_energy=round(kinetic_energy_mt, 2),
            crater_diameter=round(crater_diameter_km, 2),
            crater_depth=round(crater_depth_km, 2),
            fireball_radius=round(fireball_radius_km, 2),
            blast_radius=round(blast_radius_km, 2),
            thermal_radiation_radius=round(thermal_radiation_radius_km, 2),
            seismic_magnitude=round(seismic_magnitude, 1),
            affected_population_estimate=pop_estimate
        )
        
    except Exception as e:
        logger.error(f"Error in impact simulation: {str(e)}")
        raise HTTPException(status_code=500, detail="Error calculating impact simulation")

@api_router.get("/simulations/history", response_model=List[ImpactSimulation])
async def get_simulation_history():
    """
    Get history of impact simulations
    """
    simulations = await db.impact_simulations.find().sort('timestamp', -1).limit(50).to_list(50)
    return [ImpactSimulation(**sim) for sim in simulations]

# Statistics endpoint
@api_router.get("/statistics")
async def get_statistics():
    """
    Get aggregated statistics about asteroid threats
    """
    return {
        'total_known_neos': 34000,
        'potentially_hazardous': 2300,
        'close_approaches_2025': 156,
        'avg_diameter_pha': '140-300m',
        'tunguska_equivalent': '50m diameter',
        'chicxulub_equivalent': '10km diameter',
        'last_major_impact': 'Chelyabinsk, Russia (2013)'
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

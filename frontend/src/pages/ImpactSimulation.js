import React, { useState } from 'react';
import axios from 'axios';
import { Calculator, Zap, AlertTriangle, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './ImpactSimulation.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ImpactSimulation = () => {
  const [formData, setFormData] = useState({
    diameter: 100,
    velocity: 20,
    angle: 45,
    density: 3000
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowResults(false);

    try {
      const response = await axios.post(`${API}/simulate/impact`, formData);
      setResult(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error simulating impact:', error);
      alert('Error calculating impact simulation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const presets = [
    { name: 'Tunguska Event (1908)', diameter: 50, velocity: 15, angle: 45, density: 2000 },
    { name: 'Chelyabinsk Meteor (2013)', diameter: 20, velocity: 19, angle: 18, density: 3300 },
    { name: 'Apophis Scenario', diameter: 340, velocity: 12.6, angle: 45, density: 3200 },
    { name: 'Dinosaur Extinction', diameter: 10000, velocity: 20, angle: 90, density: 3000 }
  ];

  const applyPreset = (preset) => {
    setFormData({
      diameter: preset.diameter,
      velocity: preset.velocity,
      angle: preset.angle,
      density: preset.density
    });
    setShowResults(false);
  };

  // Prepare chart data
  const getChartData = () => {
    if (!result) return { barData: [], radarData: [] };

    const barData = [
      { name: 'Fireball', radius: result.fireball_radius, color: '#EF4444' },
      { name: 'Blast Wave', radius: result.blast_radius, color: '#F97316' },
      { name: 'Thermal Radiation', radius: result.thermal_radiation_radius, color: '#F59E0B' }
    ];

    const radarData = [
      { metric: 'Energy (MT)', value: Math.min(result.kinetic_energy / 100, 100) },
      { metric: 'Crater (km)', value: Math.min(result.crater_diameter * 10, 100) },
      { metric: 'Seismic', value: Math.min(result.seismic_magnitude * 10, 100) },
      { metric: 'Blast (km)', value: Math.min(result.blast_radius, 100) },
      { metric: 'Thermal (km)', value: Math.min(result.thermal_radiation_radius / 2, 100) }
    ];

    return { barData, radarData };
  };

  const { barData, radarData } = getChartData();

  return (
    <div className="impact-simulation-page">
      <div className="page-container">
        <div className="simulation-container">
          {/* Header */}
          <div className="simulation-header">
            <div className="header-content">
              <h1 className="simulation-title" data-testid="simulation-title">
                <Calculator className="title-icon" />
                Impact Simulation
              </h1>
              <p className="simulation-subtitle">
                Calculate potential impact effects using physics-based modeling
              </p>
            </div>
          </div>

          <div className="simulation-layout">
            {/* Input Form */}
            <div className="input-section">
              <div className="form-card">
                <h2 className="form-title">Asteroid Parameters</h2>
                
                <form onSubmit={handleSubmit} className="simulation-form">
                  <div className="form-group">
                    <label className="form-label">
                      Diameter (meters)
                      <span className="value-display">{formData.diameter}m</span>
                    </label>
                    <input
                      type="range"
                      name="diameter"
                      min="10"
                      max="15000"
                      step="10"
                      value={formData.diameter}
                      onChange={handleInputChange}
                      className="form-slider"
                      data-testid="diameter-input"
                    />
                    <div className="slider-labels">
                      <span>10m</span>
                      <span>15km</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Velocity (km/s)
                      <span className="value-display">{formData.velocity} km/s</span>
                    </label>
                    <input
                      type="range"
                      name="velocity"
                      min="5"
                      max="72"
                      step="0.5"
                      value={formData.velocity}
                      onChange={handleInputChange}
                      className="form-slider"
                      data-testid="velocity-input"
                    />
                    <div className="slider-labels">
                      <span>5 km/s</span>
                      <span>72 km/s</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Impact Angle (degrees)
                      <span className="value-display">{formData.angle}°</span>
                    </label>
                    <input
                      type="range"
                      name="angle"
                      min="15"
                      max="90"
                      step="5"
                      value={formData.angle}
                      onChange={handleInputChange}
                      className="form-slider"
                      data-testid="angle-input"
                    />
                    <div className="slider-labels">
                      <span>15° (Shallow)</span>
                      <span>90° (Vertical)</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Density (kg/m³)
                      <span className="value-display">{formData.density} kg/m³</span>
                    </label>
                    <input
                      type="range"
                      name="density"
                      min="1000"
                      max="8000"
                      step="100"
                      value={formData.density}
                      onChange={handleInputChange}
                      className="form-slider"
                      data-testid="density-input"
                    />
                    <div className="slider-labels">
                      <span>Ice/Rock</span>
                      <span>Iron/Nickel</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-simulate"
                    disabled={loading}
                    data-testid="simulate-btn"
                  >
                    {loading ? (
                      <>
                        <div className="btn-spinner"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        Calculate Impact
                      </>
                    )}
                  </button>
                </form>

                {/* Presets */}
                <div className="presets-section">
                  <h3 className="presets-title">Historical Events</h3>
                  <div className="presets-grid">
                    {presets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => applyPreset(preset)}
                        className="preset-btn"
                        data-testid={`preset-btn-${index}`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            {showResults && result && (
              <div className="results-section">
                <div className="results-card">
                  <h2 className="results-title" data-testid="results-title">
                    <AlertTriangle className="results-icon" />
                    Impact Analysis Results
                  </h2>

                  {/* Key Metrics */}
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <Zap className="metric-icon" style={{ color: '#EF4444' }} />
                      <div className="metric-value" data-testid="energy-value">
                        {result.kinetic_energy.toLocaleString()}
                      </div>
                      <div className="metric-label">Megatons TNT</div>
                    </div>

                    <div className="metric-card">
                      <MapPin className="metric-icon" style={{ color: '#F97316' }} />
                      <div className="metric-value" data-testid="crater-value">
                        {result.crater_diameter.toFixed(2)}
                      </div>
                      <div className="metric-label">Crater Diameter (km)</div>
                    </div>

                    <div className="metric-card">
                      <AlertTriangle className="metric-icon" style={{ color: '#F59E0B' }} />
                      <div className="metric-value" data-testid="seismic-value">
                        {result.seismic_magnitude.toFixed(1)}
                      </div>
                      <div className="metric-label">Seismic Magnitude</div>
                    </div>
                  </div>

                  {/* Damage Radii Chart */}
                  <div className="chart-container">
                    <h3 className="chart-title">Damage Radii (km)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#1A1A2E" />
                        <YAxis stroke="#1A1A2E" />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'white', 
                            border: '2px solid #00B4D8',
                            borderRadius: '12px'
                          }} 
                        />
                        <Bar dataKey="radius" fill="#00B4D8" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Radar Chart */}
                  <div className="chart-container">
                    <h3 className="chart-title">Impact Profile</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="metric" stroke="#1A1A2E" />
                        <PolarRadiusAxis stroke="#1A1A2E" />
                        <Radar 
                          name="Impact" 
                          dataKey="value" 
                          stroke="#00B4D8" 
                          fill="#00B4D8" 
                          fillOpacity={0.6} 
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Detailed Results */}
                  <div className="details-section">
                    <h3 className="details-title">Detailed Impact Effects</h3>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Fireball Radius:</span>
                        <span className="detail-value">{result.fireball_radius.toFixed(2)} km</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Blast Wave Radius:</span>
                        <span className="detail-value">{result.blast_radius.toFixed(2)} km</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Thermal Radiation:</span>
                        <span className="detail-value">{result.thermal_radiation_radius.toFixed(2)} km</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Crater Depth:</span>
                        <span className="detail-value">{result.crater_depth.toFixed(2)} km</span>
                      </div>
                    </div>
                  </div>

                  {/* Population Impact */}
                  <div className="population-warning" data-testid="population-impact">
                    <AlertTriangle size={24} />
                    <div>
                      <h4>Population Impact Estimate</h4>
                      <p>{result.affected_population_estimate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder when no results */}
            {!showResults && (
              <div className="results-placeholder">
                <Calculator size={64} className="placeholder-icon" />
                <h3>Ready to Calculate</h3>
                <p>Enter asteroid parameters and click "Calculate Impact" to see detailed simulation results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSimulation;

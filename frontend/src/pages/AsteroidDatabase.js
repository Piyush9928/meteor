import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, AlertCircle, ExternalLink, Orbit } from 'lucide-react';
import AsteroidOrbit from '../components/AsteroidOrbit';
import './AsteroidDatabase.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AsteroidDatabase = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [filteredAsteroids, setFilteredAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHazardous, setFilterHazardous] = useState(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [showOrbitView, setShowOrbitView] = useState(false);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterHazardous, asteroids]);

  const fetchAsteroids = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/asteroids/near-earth?limit=50`);
      setAsteroids(response.data.asteroids || []);
      setFilteredAsteroids(response.data.asteroids || []);
    } catch (error) {
      console.error('Error fetching asteroids:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...asteroids];

    if (searchTerm) {
      filtered = filtered.filter(ast =>
        ast.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterHazardous !== null) {
      filtered = filtered.filter(ast => ast.is_potentially_hazardous === filterHazardous);
    }

    setFilteredAsteroids(filtered);
  };

  const getThreatLevel = (isHazardous, missDistance) => {
    if (!isHazardous) return { level: 'Low', color: '#10B981' };
    
    const distanceAU = parseFloat(missDistance?.astronomical || 999);
    if (distanceAU < 0.05) return { level: 'Critical', color: '#EF4444' };
    if (distanceAU < 0.2) return { level: 'High', color: '#F59E0B' };
    return { level: 'Medium', color: '#F97316' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="asteroid-database-page">
      <div className="page-container">
        <div className="database-container">
          {/* Header */}
          <div className="database-header">
            <div className="header-content">
              <h1 className="database-title" data-testid="database-title">
                <Orbit className="title-icon" />
                Asteroid Database
              </h1>
              <p className="database-subtitle">Real-time NASA data on near-Earth asteroids and their trajectories</p>
            </div>
            
            <div className="header-image">
              <img 
                src="https://images.unsplash.com/photo-1710268470228-6d77e6d999b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxhc3Rlcm9pZHxlbnwwfHx8fDE3NTk1MTgwNTR8MA&ixlib=rb-4.1.0&q=85"
                alt="Asteroid visualization"
                className="header-bg-image"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search asteroids by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                data-testid="search-input"
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterHazardous === null ? 'active' : ''}`}
                onClick={() => setFilterHazardous(null)}
                data-testid="filter-all-btn"
              >
                <Filter size={18} />
                All Asteroids
              </button>
              <button
                className={`filter-btn ${filterHazardous === true ? 'active' : ''}`}
                onClick={() => setFilterHazardous(true)}
                data-testid="filter-hazardous-btn"
              >
                <AlertCircle size={18} />
                Potentially Hazardous
              </button>
              <button
                className={`filter-btn ${filterHazardous === false ? 'active' : ''}`}
                onClick={() => setFilterHazardous(false)}
                data-testid="filter-safe-btn"
              >
                Safe
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            <p data-testid="results-count">Found <strong>{filteredAsteroids.length}</strong> asteroids</p>
            <button 
              className="orbit-view-btn"
              onClick={() => setShowOrbitView(!showOrbitView)}
              data-testid="orbit-view-btn"
            >
              {showOrbitView ? 'Hide' : 'Show'} 3D Orbit View
            </button>
          </div>

          {/* 3D Orbit Visualization */}
          {showOrbitView && (
            <div className="orbit-container">
              <AsteroidOrbit asteroids={filteredAsteroids.slice(0, 10)} />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading asteroid data from NASA...</p>
            </div>
          )}

          {/* Asteroids Grid */}
          {!loading && (
            <div className="asteroids-grid">
              {filteredAsteroids.map((asteroid, index) => {
                const closeApproach = asteroid.close_approach_data || {};
                const diameter = asteroid.estimated_diameter || {};
                const velocity = closeApproach.relative_velocity || {};
                const missDistance = closeApproach.miss_distance || {};
                const threat = getThreatLevel(asteroid.is_potentially_hazardous, missDistance);

                return (
                  <div 
                    key={asteroid.id || index} 
                    className="asteroid-card"
                    data-testid={`asteroid-card-${index}`}
                  >
                    <div className="card-header">
                      <h3 className="asteroid-name">{asteroid.name}</h3>
                      <span 
                        className="threat-badge"
                        style={{ backgroundColor: threat.color }}
                        data-testid="threat-badge"
                      >
                        {threat.level}
                      </span>
                    </div>

                    <div className="card-content">
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Diameter</span>
                          <span className="info-value">
                            {diameter.estimated_diameter_min ? 
                              `${Math.round(diameter.estimated_diameter_min)} - ${Math.round(diameter.estimated_diameter_max)} m` 
                              : 'N/A'}
                          </span>
                        </div>

                        <div className="info-item">
                          <span className="info-label">Velocity</span>
                          <span className="info-value">
                            {velocity.kilometers_per_second ? 
                              `${parseFloat(velocity.kilometers_per_second).toFixed(2)} km/s` 
                              : 'N/A'}
                          </span>
                        </div>

                        <div className="info-item">
                          <span className="info-label">Miss Distance</span>
                          <span className="info-value">
                            {missDistance.astronomical ? 
                              `${parseFloat(missDistance.astronomical).toFixed(4)} AU` 
                              : 'N/A'}
                          </span>
                        </div>

                        <div className="info-item">
                          <span className="info-label">Close Approach</span>
                          <span className="info-value">
                            {formatDate(closeApproach.close_approach_date)}
                          </span>
                        </div>

                        <div className="info-item">
                          <span className="info-label">Absolute Magnitude</span>
                          <span className="info-value">
                            {asteroid.absolute_magnitude?.toFixed(2) || 'N/A'}
                          </span>
                        </div>

                        <div className="info-item">
                          <span className="info-label">Orbit Class</span>
                          <span className="info-value">
                            {asteroid.orbital_data?.orbit_class?.orbit_class_type || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {asteroid.is_potentially_hazardous && (
                        <div className="hazard-warning">
                          <AlertCircle size={16} />
                          <span>Classified as Potentially Hazardous Asteroid</span>
                        </div>
                      )}

                      {asteroid.nasa_jpl_url && (
                        <a 
                          href={asteroid.nasa_jpl_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="jpl-link"
                          data-testid="jpl-link"
                        >
                          <ExternalLink size={16} />
                          View on NASA JPL
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && filteredAsteroids.length === 0 && (
            <div className="no-results">
              <AlertCircle size={48} />
              <h3>No asteroids found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsteroidDatabase;

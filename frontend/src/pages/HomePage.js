import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Database, Target, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import './HomePage.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/statistics`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Database size={32} />,
      title: 'Asteroid Database',
      description: 'Explore real-time NASA data on near-Earth asteroids with interactive 3D visualizations',
      link: '/database',
      color: '#00B4D8'
    },
    {
      icon: <Target size={32} />,
      title: 'Impact Simulation',
      description: 'Calculate potential impact effects with physics-based modeling and visual analysis',
      link: '/simulation',
      color: '#0077B6'
    },
    {
      icon: <Shield size={32} />,
      title: 'Mitigation Strategies',
      description: 'Learn about planetary defense techniques and asteroid deflection methods',
      link: '/mitigation',
      color: '#00B4D8'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1697325320142-28beaededbf3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhc3Rlcm9pZHxlbnwwfHx8fDE3NTk1MTgwNTR8MA&ixlib=rb-4.1.0&q=85" 
            alt="Asteroid approaching Earth" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge" data-testid="hero-badge">
            <Rocket size={20} />
            <span>NASA Space Apps Challenge 2025</span>
          </div>
          
          <h1 className="hero-title" data-testid="hero-title">
            Meteor Madness
          </h1>
          
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Advanced Asteroid Impact Visualization & Planetary Defense Portal
          </p>
          
          <p className="hero-description">
            Explore near-Earth asteroids, simulate impact scenarios, and understand mitigation strategies 
            using real NASA datasets and scientific modeling.
          </p>
          
          <div className="hero-buttons">
            <Link to="/database" data-testid="explore-database-btn">
              <button className="btn-hero-primary">
                Explore Database
              </button>
            </Link>
            <Link to="/simulation" data-testid="try-simulation-btn">
              <button className="btn-hero-secondary">
                Try Simulation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && stats && (
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-card" data-testid="stat-card-total">
              <TrendingUp className="stat-icon" size={28} />
              <div className="stat-value">{stats.total_known_neos?.toLocaleString() || '34,000'}</div>
              <div className="stat-label">Known Near-Earth Objects</div>
            </div>
            
            <div className="stat-card" data-testid="stat-card-hazardous">
              <AlertTriangle className="stat-icon" size={28} />
              <div className="stat-value">{stats.potentially_hazardous?.toLocaleString() || '2,300'}</div>
              <div className="stat-label">Potentially Hazardous</div>
            </div>
            
            <div className="stat-card" data-testid="stat-card-approaches">
              <Target className="stat-icon" size={28} />
              <div className="stat-value">{stats.close_approaches_2025 || '156'}</div>
              <div className="stat-label">Close Approaches in 2025</div>
            </div>
            
            <div className="stat-card" data-testid="stat-card-impact">
              <Shield className="stat-icon" size={28} />
              <div className="stat-value">2013</div>
              <div className="stat-label">Last Major Impact Event</div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title" data-testid="features-title">Explore Our Platform</h2>
            <p className="section-subtitle">Comprehensive tools for asteroid threat analysis and mitigation planning</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="feature-card-link">
                <div 
                  className="feature-card" 
                  data-testid={`feature-card-${index}`}
                  style={{ '--feature-color': feature.color }}
                >
                  <div className="feature-icon" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-arrow" style={{ color: feature.color }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title" data-testid="cta-title">Ready to Explore Asteroid Threats?</h2>
            <p className="cta-description">
              Access real-time NASA data, run impact simulations, and learn about planetary defense strategies.
            </p>
            <Link to="/database">
              <button className="btn-cta" data-testid="cta-btn">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

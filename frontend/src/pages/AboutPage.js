import React from 'react';
import { Book, ExternalLink, Database, Code, Award, Users } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const resources = [
    {
      title: 'NASA Near-Earth Object Program',
      description: 'Official NASA program for detecting, tracking, and characterizing potentially hazardous asteroids and comets.',
      url: 'https://cneos.jpl.nasa.gov/',
      icon: <Database size={24} />
    },
    {
      title: 'NASA NeoWs API',
      description: 'RESTful web service for near-Earth object information, providing asteroid orbital data and close approach information.',
      url: 'https://api.nasa.gov/',
      icon: <Code size={24} />
    },
    {
      title: 'DART Mission',
      description: 'NASA\'s Double Asteroid Redirection Test - the first planetary defense test mission demonstrating kinetic impactor technology.',
      url: 'https://www.nasa.gov/dart',
      icon: <Award size={24} />
    },
    {
      title: 'JPL Small-Body Database',
      description: 'Comprehensive database of orbital and physical data for small bodies in our solar system.',
      url: 'https://ssd.jpl.nasa.gov/',
      icon: <Database size={24} />
    },
    {
      title: 'IAU Minor Planet Center',
      description: 'International clearinghouse for observations of asteroids, comets, and natural satellites.',
      url: 'https://www.minorplanetcenter.net/',
      icon: <Users size={24} />
    },
    {
      title: 'Planetary Defense Conference',
      description: 'Biennial conference bringing together experts to discuss planetary defense strategies and technologies.',
      url: 'https://cneos.jpl.nasa.gov/pd/',
      icon: <Award size={24} />
    }
  ];

  const technologies = [
    { name: 'React', description: 'Frontend framework for building interactive UI', icon: '⚛️' },
    { name: 'FastAPI', description: 'Modern Python backend framework', icon: '⚡' },
    { name: 'MongoDB', description: 'NoSQL database for storing simulations', icon: '🍃' },
    { name: 'Three.js', description: '3D visualization library for orbital displays', icon: '🌐' },
    { name: 'Recharts', description: 'Composable charting library', icon: '📊' },
    { name: 'NASA APIs', description: 'Real-time asteroid data integration', icon: '🚀' }
  ];

  const features = [
    {
      title: 'Real NASA Data',
      description: 'Live integration with NASA\'s Near-Earth Object Web Service (NeoWs) API',
      icon: '🛰️'
    },
    {
      title: '3D Visualizations',
      description: 'Interactive 3D orbital path displays using Three.js and React Three Fiber',
      icon: '🌌'
    },
    {
      title: 'Physics Simulations',
      description: 'Scientific impact modeling based on kinetic energy calculations',
      icon: '💥'
    },
    {
      title: 'Defense Strategies',
      description: 'Comprehensive analysis of proven and theoretical mitigation methods',
      icon: '🛡️'
    }
  ];

  return (
    <div className="about-page">
      <div className="page-container">
        <div className="about-container">
          {/* Hero Section */}
          <div className="about-hero">
            <div className="hero-background-about">
              <img 
                src="https://images.unsplash.com/photo-1464802686167-b939a6910659?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxzcGFjZXxlbnwwfHx8fDE3NTk1MTgwNjB8MA&ixlib=rb-4.1.0&q=85"
                alt="Galaxy background"
                className="hero-bg-image-about"
              />
              <div className="hero-overlay-about"></div>
            </div>
            
            <div className="hero-content-about">
              <Book size={60} className="hero-icon-about" />
              <h1 className="about-title" data-testid="about-title">
                About Meteor Madness
              </h1>
              <p className="about-subtitle">
                Advanced Asteroid Impact Visualization & Mitigation Portal
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <div className="project-section">
            <div className="project-card">
              <h2 className="section-heading">Project Overview</h2>
              <p className="project-text">
                Meteor Madness is an advanced web application designed to help users, researchers, and decision-makers 
                explore asteroid threats, simulate impact scenarios, and evaluate mitigation strategies using real NASA datasets. 
                Built for the <strong>NASA Space Apps Challenge 2025</strong>, this platform combines cutting-edge web technologies 
                with scientifically accurate modeling to provide comprehensive asteroid threat analysis.
              </p>
              
              <div className="mission-statement">
                <h3 className="mission-title">Our Mission</h3>
                <p className="mission-text">
                  To democratize access to planetary defense information and empower communities worldwide with the 
                  knowledge and tools needed to understand and prepare for potential asteroid threats.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="features-showcase">
            <h2 className="section-heading">Key Features</h2>
            <div className="features-grid-about">
              {features.map((feature, index) => (
                <div key={index} className="feature-card-about" data-testid={`feature-${index}`}>
                  <div className="feature-icon-about">{feature.icon}</div>
                  <h3 className="feature-title-about">{feature.title}</h3>
                  <p className="feature-desc-about">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="tech-section">
            <h2 className="section-heading">Technology Stack</h2>
            <div className="tech-grid">
              {technologies.map((tech, index) => (
                <div key={index} className="tech-card" data-testid={`tech-${index}`}>
                  <span className="tech-icon">{tech.icon}</span>
                  <h3 className="tech-name">{tech.name}</h3>
                  <p className="tech-desc">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="resources-section">
            <h2 className="section-heading">Resources & Data Sources</h2>
            <div className="resources-grid">
              {resources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card"
                  data-testid={`resource-${index}`}
                >
                  <div className="resource-icon">
                    {resource.icon}
                  </div>
                  <div className="resource-content">
                    <h3 className="resource-title">
                      {resource.title}
                      <ExternalLink size={16} className="external-icon" />
                    </h3>
                    <p className="resource-desc">{resource.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer-section">
            <div className="disclaimer-card">
              <h3 className="disclaimer-title">Disclaimer</h3>
              <p className="disclaimer-text">
                This application is designed for educational and research purposes. While we use real NASA data and 
                scientifically-informed models, impact simulations are simplified approximations. For official planetary 
                defense information and emergency preparedness, please consult NASA, your national space agency, and 
                local emergency management authorities.
              </p>
            </div>
          </div>

          {/* Credits */}
          <div className="credits-section">
            <div className="credits-card">
              <h3 className="credits-title">Credits & Acknowledgments</h3>
              <p className="credits-text">
                Built for the NASA Space Apps Challenge 2025. Special thanks to NASA's Center for Near-Earth Object 
                Studies (CNEOS), the Jet Propulsion Laboratory (JPL), and all scientists and engineers working on 
                planetary defense. Data provided by NASA's NeoWs API and JPL Small-Body Database.
              </p>
              <div className="credits-links">
                <a href="https://www.nasa.gov/planetarydefense" target="_blank" rel="noopener noreferrer" className="credit-link">
                  NASA Planetary Defense
                </a>
                <a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer" className="credit-link">
                  CNEOS
                </a>
                <a href="https://www.spaceappschallenge.org/" target="_blank" rel="noopener noreferrer" className="credit-link">
                  Space Apps Challenge
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

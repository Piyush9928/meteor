import React from 'react';
import { Shield, Rocket, Users, Zap, Target, CheckCircle } from 'lucide-react';
import './MitigationStrategies.css';

const MitigationStrategies = () => {
  const strategies = [
    {
      id: 1,
      icon: <Rocket size={40} />,
      title: 'Kinetic Impactor',
      effectiveness: 85,
      cost: 'Moderate',
      leadTime: '5-10 years',
      description: 'Use a spacecraft to collide with the asteroid at high speed, changing its trajectory through momentum transfer.',
      pros: [
        'Well-tested technology (NASA DART mission)',
        'Predictable results',
        'No nuclear material required',
        'Suitable for medium-sized asteroids'
      ],
      cons: [
        'Requires significant lead time',
        'May fragment smaller asteroids',
        'Less effective on large asteroids',
        'Precision targeting essential'
      ],
      status: 'Proven',
      color: '#00B4D8'
    },
    {
      id: 2,
      icon: <Zap size={40} />,
      title: 'Nuclear Deflection',
      effectiveness: 95,
      cost: 'High',
      leadTime: '3-7 years',
      description: 'Detonate a nuclear device near or on the asteroid to vaporize surface material and push it off course.',
      pros: [
        'Most powerful option available',
        'Effective on large asteroids',
        'Can work with shorter lead times',
        'High success probability'
      ],
      cons: [
        'International treaty concerns',
        'Risk of fragmentation',
        'Public perception challenges',
        'Complex technical requirements'
      ],
      status: 'Theoretical',
      color: '#F59E0B'
    },
    {
      id: 3,
      icon: <Target size={40} />,
      title: 'Gravity Tractor',
      effectiveness: 70,
      cost: 'Moderate-High',
      leadTime: '10-20 years',
      description: 'Position a spacecraft near the asteroid to use gravitational attraction to slowly alter its trajectory.',
      pros: [
        'Gentle, controlled deflection',
        'No physical contact needed',
        'Predictable trajectory changes',
        'Works on any composition'
      ],
      cons: [
        'Very long lead time required',
        'Slow process',
        'High fuel requirements',
        'Complex orbital mechanics'
      ],
      status: 'Experimental',
      color: '#0077B6'
    },
    {
      id: 4,
      icon: <Users size={40} />,
      title: 'Evacuation & Preparedness',
      effectiveness: 60,
      cost: 'Variable',
      leadTime: '1-5 years',
      description: 'Prepare and execute evacuation plans, build shelters, and establish emergency response protocols.',
      pros: [
        'Can be implemented quickly',
        'Useful for smaller impacts',
        'No space mission required',
        'Saves lives directly'
      ],
      cons: [
        'Doesn\'t prevent impact',
        'Massive logistical challenges',
        'Economic disruption',
        'Limited for large asteroids'
      ],
      status: 'Ready',
      color: '#10B981'
    }
  ];

  const comparisonData = strategies.map(s => ({
    name: s.title,
    effectiveness: s.effectiveness,
    fill: s.color
  }));

  return (
    <div className="mitigation-strategies-page">
      <div className="page-container">
        <div className="mitigation-container">
          {/* Header */}
          <div className="mitigation-header">
            <Shield className="header-icon" size={60} />
            <h1 className="mitigation-title" data-testid="mitigation-title">
              Planetary Defense Strategies
            </h1>
            <p className="mitigation-subtitle">
              Explore proven and theoretical methods to deflect or mitigate asteroid threats
            </p>
          </div>

          {/* Overview */}
          <div className="overview-section">
            <div className="overview-card">
              <h2 className="section-title">The Challenge</h2>
              <p className="overview-text">
                While the probability of a catastrophic asteroid impact in our lifetime is low, 
                the potential consequences are severe enough to warrant serious preparation. 
                NASA and international space agencies have developed multiple strategies to defend 
                Earth from asteroid threats, each with unique advantages and limitations.
              </p>
              <div className="key-facts">
                <div className="fact-item">
                  <CheckCircle size={20} className="fact-icon" />
                  <span>NASA DART mission successfully redirected asteroid in 2022</span>
                </div>
                <div className="fact-item">
                  <CheckCircle size={20} className="fact-icon" />
                  <span>Multiple detection systems monitor 34,000+ near-Earth objects</span>
                </div>
                <div className="fact-item">
                  <CheckCircle size={20} className="fact-icon" />
                  <span>International cooperation essential for planetary defense</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategies Grid */}
          <div className="strategies-grid">
            {strategies.map((strategy) => (
              <div 
                key={strategy.id} 
                className="strategy-card"
                data-testid={`strategy-card-${strategy.id}`}
                style={{ '--strategy-color': strategy.color }}
              >
                <div className="strategy-header">
                  <div className="strategy-icon" style={{ color: strategy.color }}>
                    {strategy.icon}
                  </div>
                  <div className="strategy-meta">
                    <span className="strategy-status" style={{ backgroundColor: strategy.color }}>
                      {strategy.status}
                    </span>
                  </div>
                </div>

                <h3 className="strategy-title">{strategy.title}</h3>
                <p className="strategy-description">{strategy.description}</p>

                {/* Effectiveness Bar */}
                <div className="effectiveness-section">
                  <div className="effectiveness-header">
                    <span className="effectiveness-label">Effectiveness</span>
                    <span className="effectiveness-value">{strategy.effectiveness}%</span>
                  </div>
                  <div className="effectiveness-bar">
                    <div 
                      className="effectiveness-fill" 
                      style={{ 
                        width: `${strategy.effectiveness}%`,
                        backgroundColor: strategy.color 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Specs */}
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Cost:</span>
                    <span className="spec-value">{strategy.cost}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Lead Time:</span>
                    <span className="spec-value">{strategy.leadTime}</span>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="pros-cons-section">
                  <div className="pros-section">
                    <h4 className="pros-title">Advantages</h4>
                    <ul className="pros-list">
                      {strategy.pros.slice(0, 3).map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="cons-section">
                    <h4 className="cons-title">Challenges</h4>
                    <ul className="cons-list">
                      {strategy.cons.slice(0, 3).map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Section */}
          <div className="timeline-section">
            <h2 className="section-title">Implementation Timeline</h2>
            <div className="timeline-card">
              <div className="timeline-content">
                <div className="timeline-item">
                  <div className="timeline-marker" style={{ backgroundColor: '#10B981' }}></div>
                  <div className="timeline-text">
                    <strong>0-5 years:</strong> Enhanced detection and tracking systems, mission planning
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker" style={{ backgroundColor: '#00B4D8' }}></div>
                  <div className="timeline-text">
                    <strong>5-10 years:</strong> Kinetic impactor missions for medium-term threats
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker" style={{ backgroundColor: '#0077B6' }}></div>
                  <div className="timeline-text">
                    <strong>10-20 years:</strong> Gravity tractor deployment for long-term deflection
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker" style={{ backgroundColor: '#F59E0B' }}></div>
                  <div className="timeline-text">
                    <strong>Emergency:</strong> Nuclear deflection as last resort for imminent threats
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-section">
            <div className="cta-card">
              <h2 className="cta-title">Early Detection is Key</h2>
              <p className="cta-text">
                The effectiveness of any mitigation strategy depends heavily on early detection. 
                With sufficient warning time, even gravity tractors can successfully deflect potentially 
                hazardous asteroids. This is why continuous monitoring and improvement of detection 
                systems remain the highest priority in planetary defense.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MitigationStrategies;

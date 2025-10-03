import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import AsteroidDatabase from './Pages/AsteriodDatabases';
import ImpactSimulator from './Pages/ImpactSimulator';
import MitigationStrategies from './Pages/MitigationStrategies';
import Forecasting from './Pages/Forecasting';
import DisasterResponse from './Pages/DisasterResponse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/asteroid-database" element={<Layout><AsteroidDatabase /></Layout>} />
        <Route path="/impact-simulator" element={<Layout><ImpactSimulator /></Layout>} />
        <Route path="/mitigation-strategies" element={<Layout><MitigationStrategies /></Layout>} />
        <Route path="/forecasting" element={<Layout><Forecasting /></Layout>} />
        <Route path="/disaster-response" element={<Layout><DisasterResponse /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;

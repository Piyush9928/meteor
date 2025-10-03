import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { AsteroidSimulation } from "@/entities/AsteroidSimulation";
import { InvokeLLM } from "@/integrations/Core";
import SimulationForm from "../components/simulator/SimulationForm";
import SimulationResults from "../components/simulator/SimulationResults";
import SimulationHistory from "../components/simulator/SimulationHistory";

export default function ImpactSimulatorPage() {
  const [simulationData, setSimulationData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulations, setSimulations] = useState([]);

  React.useEffect(() => {
    loadSimulations();
  }, []);

  const loadSimulations = async () => {
    const data = await AsteroidSimulation.list("-created_date", 10);
    setSimulations(data);
  };

  const runSimulation = async (params) => {
    setIsSimulating(true);
    
    try {
      const impactEnergy = calculateImpactEnergy(
        params.asteroid_diameter,
        params.velocity,
        params.density
      );
      
      const craterDiameter = calculateCraterDiameter(
        params.asteroid_diameter,
        impactEnergy
      );
      
      const damageRadius = calculateDamageRadius(impactEnergy);
      
      const analysisPrompt = `Analyze the following asteroid impact scenario:
- Asteroid diameter: ${params.asteroid_diameter} meters
- Impact velocity: ${params.velocity} km/s
- Impact angle: ${params.angle} degrees
- Target location: ${params.target_location}
- Impact energy: ${impactEnergy.toFixed(2)} megatons TNT
- Estimated crater diameter: ${craterDiameter.toFixed(2)} km
- Damage radius: ${damageRadius.toFixed(2)} km

Provide a detailed analysis of:
1. Immediate impact effects
2. Environmental consequences
3. Estimated casualties and affected population
4. Long-term implications
5. Comparison to known events

Be specific and scientific in your assessment.`;

      const analysis = await InvokeLLM({
        prompt: analysisPrompt,
        add_context_from_internet: true
      });

      const simulationResult = {
        ...params,
        impact_energy: impactEnergy,
        crater_diameter: craterDiameter,
        damage_radius: damageRadius,
        casualties_estimate: "See analysis",
        analysis: analysis
      };

      const saved = await AsteroidSimulation.create(simulationResult);
      setSimulationData({ ...simulationResult, id: saved.id });
      await loadSimulations();
    } catch (error) {
      console.error("Simulation error:", error);
    }
    
    setIsSimulating(false);
  };

  const calculateImpactEnergy = (diameter, velocity, density = 2600) => {
    const radius = diameter / 2;
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    const mass = volume * density;
    const velocityMs = velocity * 1000;
    const energyJoules = 0.5 * mass * Math.pow(velocityMs, 2);
    const energyMegatons = energyJoules / 4.184e15;
    return energyMegatons;
  };

  const calculateCraterDiameter = (diameter, energy) => {
    const craterDiameter = Math.pow(energy, 0.25) * diameter * 0.1;
    return craterDiameter;
  };

  const calculateDamageRadius = (energy) => {
    const radius = Math.pow(energy, 0.33) * 2;
    return radius;
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Impact Simulator</h1>
          <p className="text-purple-300">Run realistic asteroid impact scenarios and analyze consequences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SimulationForm onSubmit={runSimulation} isSimulating={isSimulating} />
            
            {isSimulating && (
              <Card className="glass-effect p-12 border-purple-900/30">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-16 h-16 animate-spin text-purple-400" />
                  <p className="text-purple-300 text-lg">Running impact simulation...</p>
                  <p className="text-purple-400 text-sm">Analyzing trajectory, energy, and consequences</p>
                </div>
              </Card>
            )}
            
            {simulationData && !isSimulating && (
              <SimulationResults data={simulationData} />
            )}
          </div>

          <div>
            <SimulationHistory 
              simulations={simulations} 
              onSelect={setSimulationData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
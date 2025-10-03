import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Zap } from "lucide-react";

export default function SimulationForm({ onSubmit, isSimulating }) {
  const [params, setParams] = useState({
    name: "",
    asteroid_diameter: 100,
    velocity: 20,
    angle: 45,
    target_location: "Ocean",
    density: 2600
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <Card className="glass-effect border-purple-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Zap className="w-5 h-5 text-purple-400" />
          Simulation Parameters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-purple-300">Simulation Name</Label>
            <Input
              value={params.name}
              onChange={(e) => setParams({ ...params, name: e.target.value })}
              placeholder="e.g., NYC Impact 2025"
              className="bg-slate-900/50 border-purple-900/50 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-purple-300">Asteroid Diameter: {params.asteroid_diameter}m</Label>
            <Slider
              value={[params.asteroid_diameter]}
              onValueChange={([value]) => setParams({ ...params, asteroid_diameter: value })}
              min={10}
              max={1000}
              step={10}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-purple-400 mt-1">
              <span>10m</span>
              <span>1000m</span>
            </div>
          </div>

          <div>
            <Label className="text-purple-300">Impact Velocity: {params.velocity} km/s</Label>
            <Slider
              value={[params.velocity]}
              onValueChange={([value]) => setParams({ ...params, velocity: value })}
              min={5}
              max={70}
              step={1}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-purple-400 mt-1">
              <span>5 km/s</span>
              <span>70 km/s</span>
            </div>
          </div>

          <div>
            <Label className="text-purple-300">Impact Angle: {params.angle}°</Label>
            <Slider
              value={[params.angle]}
              onValueChange={([value]) => setParams({ ...params, angle: value })}
              min={15}
              max={90}
              step={5}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-purple-400 mt-1">
              <span>15° (shallow)</span>
              <span>90° (vertical)</span>
            </div>
          </div>

          <div>
            <Label className="text-purple-300">Target Location</Label>
            <Input
              value={params.target_location}
              onChange={(e) => setParams({ ...params, target_location: e.target.value })}
              placeholder="e.g., New York City, Pacific Ocean"
              className="bg-slate-900/50 border-purple-900/50 text-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isSimulating}
          >
            <Zap className="w-4 h-4 mr-2" />
            Run Simulation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

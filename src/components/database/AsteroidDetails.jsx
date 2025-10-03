import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AsteroidDetails = ({ asteroid, onClose }) => {
  const diameter = asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0;
  const velocity = parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0);
  const missDistance = parseFloat(asteroid.close_approach_data?.[0]?.miss_distance?.kilometers || 0);
  const closeApproachDate = asteroid.close_approach_data?.[0]?.close_approach_date || "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="glass-effect w-full max-w-2xl p-6 border-purple-900/30">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-white">{asteroid.name}</CardTitle>
          <Button variant="ghost" className="text-purple-300 hover:text-white" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 text-purple-200">
          <div>
            <strong>NASA ID:</strong> {asteroid.id}
          </div>
          <div>
            <strong>Diameter:</strong> {diameter.toFixed(2)} m
          </div>
          <div>
            <strong>Velocity:</strong> {velocity.toFixed(2)} km/s
          </div>
          <div>
            <strong>Miss Distance:</strong> {missDistance.toLocaleString()} km
          </div>
          <div>
            <strong>Close Approach Date:</strong> {closeApproachDate}
          </div>
          <div>
            <strong>Potentially Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsteroidDetails;

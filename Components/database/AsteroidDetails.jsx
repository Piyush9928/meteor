import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Ruler, Gauge, Target, Calendar } from "lucide-react";

export default function AsteroidDetails({ asteroid, onClose }) {
  const diameter = asteroid.estimated_diameter?.meters;
  const approach = asteroid.close_approach_data?.[0];
  const velocity = parseFloat(approach?.relative_velocity?.kilometers_per_second || 0);
  const missDistance = parseFloat(approach?.miss_distance?.kilometers || 0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-purple-900/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {asteroid.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {asteroid.is_potentially_hazardous_asteroid && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Potentially Hazardous Asteroid
            </Badge>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <div className="text-sm text-purple-300">Estimated Diameter</div>
                  <div className="text-lg font-semibold">
                    {diameter?.estimated_diameter_min?.toFixed(0)} - {diameter?.estimated_diameter_max?.toFixed(0)} m
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <div className="text-sm text-purple-300">Relative Velocity</div>
                  <div className="text-lg font-semibold">{velocity.toFixed(2)} km/s</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <div className="text-sm text-purple-300">Miss Distance</div>
                  <div className="text-lg font-semibold">
                    {(missDistance / 384400).toFixed(2)} LD
                  </div>
                  <div className="text-xs text-purple-400">{missDistance.toFixed(0)} km</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <div className="text-sm text-purple-300">Close Approach Date</div>
                  <div className="text-lg font-semibold">{approach?.close_approach_date}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-purple-900/30">
            <div className="text-sm text-purple-300 mb-1">NASA JPL ID</div>
            <div className="font-mono text-white">{asteroid.id}</div>
          </div>

          <div className="text-xs text-purple-400">
            * LD = Lunar Distance (distance from Earth to Moon = 384,400 km)
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Ruler, Target, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function SimulationResults({ data }) {
  const getSeverityColor = (energy) => {
    if (energy < 1) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (energy < 10) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="glass-effect border-purple-900/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">{data.name}</CardTitle>
            <Badge className={getSeverityColor(data.impact_energy)}>
              <AlertTriangle className="w-3 h-3 mr-1" />
              {data.impact_energy < 1 ? "Low" : data.impact_energy < 10 ? "Moderate" : "Severe"} Impact
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-purple-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-purple-300 text-sm">Impact Energy</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {data.impact_energy.toFixed(2)} MT
              </div>
              <div className="text-xs text-purple-400">TNT equivalent</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-purple-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-5 h-5 text-blue-400" />
                <span className="text-purple-300 text-sm">Crater Diameter</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {data.crater_diameter.toFixed(2)} km
              </div>
              <div className="text-xs text-purple-400">Estimated size</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-purple-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-red-400" />
                <span className="text-purple-300 text-sm">Damage Radius</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {data.damage_radius.toFixed(2)} km
              </div>
              <div className="text-xs text-purple-400">Affected area</div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-slate-900/50 border border-purple-900/30">
            <h3 className="text-lg font-bold text-white mb-4">Impact Analysis</h3>
            <div className="text-purple-200 whitespace-pre-wrap leading-relaxed">
              {data.analysis}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-300">Asteroid Size:</span>
              <span className="text-white ml-2 font-medium">{data.asteroid_diameter}m</span>
            </div>
            <div>
              <span className="text-purple-300">Impact Velocity:</span>
              <span className="text-white ml-2 font-medium">{data.velocity} km/s</span>
            </div>
            <div>
              <span className="text-purple-300">Impact Angle:</span>
              <span className="text-white ml-2 font-medium">{data.angle}°</span>
            </div>
            <div>
              <span className="text-purple-300">Target Location:</span>
              <span className="text-white ml-2 font-medium">{data.target_location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
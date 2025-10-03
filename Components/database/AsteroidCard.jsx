import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, AlertTriangle, Gauge, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function AsteroidCard({ asteroid, isSaved, onToggleSave, onClick, index }) {
  const diameter = asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0;
  const velocity = parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0);
  const isHazardous = asteroid.is_potentially_hazardous_asteroid;
  const closeApproach = asteroid.close_approach_data?.[0]?.close_approach_date || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        className="glass-effect p-6 border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
              {asteroid.name}
            </h3>
            {isHazardous && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Hazardous
              </Badge>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(asteroid);
            }}
            className={isSaved ? "text-yellow-400" : "text-gray-400"}
          >
            <Star className={`w-5 h-5 ${isSaved ? "fill-yellow-400" : ""}`} />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">Size:</span>
            <span className="text-white font-medium">{diameter.toFixed(0)}m</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">Velocity:</span>
            <span className="text-white font-medium">{velocity.toFixed(2)} km/s</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300">Approach:</span>
            <span className="text-white font-medium">{closeApproach}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

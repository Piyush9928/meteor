import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const AsteroidCard = ({ asteroid, isSaved, onToggleSave, onClick, index }) => {
  const diameter = asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0;
  const velocity = parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0);
  const missDistance = parseFloat(asteroid.close_approach_data?.[0]?.miss_distance?.kilometers || 0);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.05 } }
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
      <Card className="glass-effect p-4 border-purple-900/30 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{asteroid.name}</h3>
          <button onClick={(e) => { e.stopPropagation(); onToggleSave(asteroid); }} className="focus:outline-none">
            <Star className={`w-5 h-5 ${isSaved ? 'text-yellow-400' : 'text-purple-400'}`} />
          </button>
        </div>
        <div className="space-y-1 text-sm text-purple-200">
          <div>
            <strong>Diameter:</strong> {diameter.toFixed(2)} m
          </div>
          <div>
            <strong>Velocity:</strong> {velocity.toFixed(2)} km/s
          </div>
          <div>
            <strong>Miss Distance:</strong> {missDistance.toLocaleString()} km
          </div>
          {asteroid.is_potentially_hazardous_asteroid && (
            <div>
              <Badge variant="default">Potentially Hazardous</Badge>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default AsteroidCard;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Flame } from "lucide-react";
import { format } from "date-fns";

export default function SimulationHistory({ simulations, onSelect }) {
  return (
    <Card className="glass-effect border-purple-900/30 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <History className="w-5 h-5 text-purple-400" />
          Recent Simulations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {simulations.length === 0 ? (
          <p className="text-purple-400 text-sm text-center py-4">
            No simulations yet
          </p>
        ) : (
          simulations.map((sim) => (
            <div
              key={sim.id}
              onClick={() => onSelect(sim)}
              className="p-3 rounded-lg bg-slate-900/50 border border-purple-900/30 hover:border-purple-500/50 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white text-sm">{sim.name}</h4>
                <Badge variant="outline" className="text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  {sim.impact_energy.toFixed(1)} MT
                </Badge>
              </div>
              <div className="text-xs text-purple-400">
                {format(new Date(sim.created_date), "MMM d, yyyy")}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

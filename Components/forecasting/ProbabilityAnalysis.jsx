import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle } from "lucide-react";

export default function ProbabilityAnalysis() {
  const probabilities = [
    { size: "10-50m", probability: "1:500", risk: "low", impact: "Local damage" },
    { size: "50-100m", probability: "1:2,000", risk: "low", impact: "Regional devastation" },
    { size: "100-500m", probability: "1:10,000", risk: "medium", impact: "Continental effects" },
    { size: "500m-1km", probability: "1:50,000", risk: "medium", impact: "Global catastrophe" },
    { size: ">1km", probability: "1:500,000", risk: "high", impact: "Mass extinction" }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-effect border-purple-900/30 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Annual Impact Probabilities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {probabilities.map((prob) => (
          <div key={prob.size} className="p-4 rounded-lg bg-slate-900/50 border border-purple-900/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{prob.size}</h4>
              <Badge className={getRiskColor(prob.risk)}>
                {prob.risk === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                {prob.risk.toUpperCase()}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-300 mb-2">{prob.probability}</div>
            <div className="text-sm text-purple-400">{prob.impact}</div>
          </div>
        ))}

        <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30 mt-6">
          <p className="text-xs text-purple-300 leading-relaxed">
            * Probabilities are annual estimates based on current detection capabilities and historical data. Actual risk varies by location and detection improvements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

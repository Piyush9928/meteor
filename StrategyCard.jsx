import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StrategyCard({ strategy, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-effect border-purple-900/30 h-full">
        <CardHeader>
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4 shadow-lg`}>
            <strategy.icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-white">{strategy.title}</CardTitle>
          <p className="text-purple-300 text-sm">{strategy.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-purple-400 mb-1">Effectiveness</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${strategy.color}`}
                    style={{ width: `${strategy.effectiveness}%` }}
                  />
                </div>
                <span className="text-white text-sm font-medium">{strategy.effectiveness}%</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-purple-400 mb-1">Readiness</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${strategy.color}`}
                    style={{ width: `${strategy.readiness}%` }}
                  />
                </div>
                <span className="text-white text-sm font-medium">{strategy.readiness}%</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="text-purple-300 border-purple-500/30">
              Cost: {strategy.cost}
            </Badge>
            <Badge variant="outline" className="text-purple-300 border-purple-500/30">
              {strategy.leadTime}
            </Badge>
          </div>

          <Button
            variant="ghost"
            className="w-full text-purple-400 hover:text-purple-300"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" /> Learn More
              </>
            )}
          </Button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-purple-900/30"
              >
                <p className="text-purple-200 text-sm leading-relaxed">
                  {strategy.details}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
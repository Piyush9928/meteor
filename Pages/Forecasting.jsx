import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar, Target, AlertCircle } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { motion } from "framer-motion";
import ForecastingCharts from "../components/forecasting/ForecastingCharts";
import ProbabilityAnalysis from "../components/forecasting/ProbabilityAnalysis";

export default function ForecastingPage() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateForecast();
  }, []);

  const generateForecast = async () => {
    setLoading(true);
    try {
      const forecastData = await InvokeLLM({
        prompt: `As an asteroid impact forecasting expert, provide a comprehensive statistical analysis of asteroid impact probabilities for the next 100 years. Include:

1. Annual probability of impacts by size category (10m, 50m, 100m, 500m, 1km+)
2. Historical impact frequency data from the last 100 years
3. Projected trends based on current detection capabilities
4. Key factors affecting forecast accuracy
5. Notable upcoming close approaches in the next decade

Format your response with clear sections and specific numbers. Be scientifically accurate.`,
        add_context_from_internet: true
      });

      setForecast(forecastData);
    } catch (error) {
      console.error("Forecast error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Impact Forecasting</h1>
          <p className="text-purple-300">Statistical models and probability analysis of future asteroid impacts</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Next 10 Years", value: "~2000", subtitle: "Close Approaches", icon: Calendar, color: "from-blue-500 to-cyan-500" },
            { title: "Impact Risk", value: "1:3000", subtitle: "Annual (100m+)", icon: Target, color: "from-purple-500 to-pink-500" },
            { title: "Detection Rate", value: "95%+", subtitle: "Large Objects", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
            { title: "High Priority", value: "23", subtitle: "Tracked Objects", icon: AlertCircle, color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect p-6 border-purple-900/30">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-purple-300">{stat.title}</div>
                <div className="text-xs text-purple-400 mt-1">{stat.subtitle}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ForecastingCharts />
          </div>
          <div>
            <ProbabilityAnalysis />
          </div>
        </div>

        {loading ? (
          <Card className="glass-effect p-12 text-center border-purple-900/30">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-purple-300">Generating forecast analysis...</p>
          </Card>
        ) : (
          <Card className="glass-effect p-8 border-purple-900/30">
            <h2 className="text-2xl font-bold text-white mb-6">Expert Forecast Analysis</h2>
            <div className="text-purple-200 whitespace-pre-wrap leading-relaxed">
              {forecast}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

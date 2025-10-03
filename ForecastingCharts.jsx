import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ForecastingCharts() {
  const impactFrequency = [
    { year: 2020, small: 450, medium: 12, large: 1 },
    { year: 2025, small: 480, medium: 14, large: 1 },
    { year: 2030, small: 510, medium: 15, large: 2 },
    { year: 2035, small: 540, medium: 16, large: 2 },
    { year: 2040, small: 570, medium: 18, large: 2 },
    { year: 2045, small: 600, medium: 19, large: 3 },
    { year: 2050, small: 630, medium: 20, large: 3 }
  ];

  const detectionCapability = [
    { year: 2020, capability: 85 },
    { year: 2025, capability: 92 },
    { year: 2030, capability: 96 },
    { year: 2035, capability: 98 },
    { year: 2040, capability: 99 },
    { year: 2045, capability: 99.5 },
    { year: 2050, capability: 99.8 }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-purple-900/30">
        <CardHeader>
          <CardTitle className="text-white">Projected Close Approaches (by size)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={impactFrequency}>
              <defs>
                <linearGradient id="colorSmall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLarge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
              <XAxis dataKey="year" stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="small" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSmall)" name="Small (<100m)" />
              <Area type="monotone" dataKey="medium" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMedium)" name="Medium (100-1000m)" />
              <Area type="monotone" dataKey="large" stroke="#ec4899" fillOpacity={1} fill="url(#colorLarge)" name="Large (>1km)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-effect border-purple-900/30">
        <CardHeader>
          <CardTitle className="text-white">Detection Capability Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={detectionCapability}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
              <XAxis dataKey="year" stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="capability" stroke="#10b981" strokeWidth={3} name="Detection Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
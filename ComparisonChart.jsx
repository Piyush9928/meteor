import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export default function ComparisonChart({ strategies }) {
  const barData = strategies.map(s => ({
    name: s.title.split(' ')[0],
    effectiveness: s.effectiveness,
    readiness: s.readiness
  }));

  const radarData = strategies.map(s => ({
    subject: s.title.split(' ')[0],
    effectiveness: s.effectiveness,
    readiness: s.readiness
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="glass-effect border-purple-900/30">
        <CardHeader>
          <CardTitle className="text-white">Strategy Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
              <XAxis dataKey="name" stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="effectiveness" fill="#8b5cf6" name="Effectiveness %" />
              <Bar dataKey="readiness" fill="#ec4899" name="Readiness %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-effect border-purple-900/30">
        <CardHeader>
          <CardTitle className="text-white">Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#4c1d95" />
              <PolarAngleAxis dataKey="subject" stroke="#a78bfa" />
              <PolarRadiusAxis stroke="#a78bfa" />
              <Radar name="Effectiveness" dataKey="effectiveness" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Radar name="Readiness" dataKey="readiness" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
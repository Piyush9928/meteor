import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Satellite, Database, Github, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const resources = [
    {
      title: "NASA Center for Near-Earth Object Studies (CNEOS)",
      description: "Official source for NEO data and close approach information",
      url: "https://cneos.jpl.nasa.gov/",
      icon: Satellite
    },
    {
      title: "NASA NeoWs API",
      description: "Near-Earth Object Web Service providing asteroid data",
      url: "https://api.nasa.gov/",
      icon: Database
    },
    {
      title: "ESA Space Situational Awareness",
      description: "European Space Agency's NEO coordination center",
      url: "https://www.esa.int/Safety_Security/Space_Situational_Awareness",
      icon: Satellite
    },
    {
      title: "The Planetary Society",
      description: "Educational resources on planetary defense",
      url: "https://www.planetary.org/",
      icon: BookOpen
    }
  ];

  const technologies = [
    "React & Tailwind CSS for modern UI",
    "NASA Open APIs for real-time data",
    "Recharts for data visualization",
    "AI-powered impact analysis",
    "Real-time asteroid tracking",
    "Scientific computation models"
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">About Meteor Madness</h1>
          <p className="text-purple-300">Advanced asteroid impact visualization and mitigation portal</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect p-6 border-purple-900/30">
            <Award className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">NASA Space Apps 2025</h3>
            <p className="text-purple-300 text-sm">
              Built for the NASA Space Apps Challenge, addressing the Impactor-2025 challenge
            </p>
          </Card>

          <Card className="glass-effect p-6 border-purple-900/30">
            <Database className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real Data</h3>
            <p className="text-purple-300 text-sm">
              Powered by authentic NASA Near-Earth Object datasets and scientific models
            </p>
          </Card>

          <Card className="glass-effect p-6 border-purple-900/30">
            <Satellite className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Mission</h3>
            <p className="text-purple-300 text-sm">
              Educate and prepare humanity for asteroid threats through data-driven tools
            </p>
          </Card>
        </div>

        <Card className="glass-effect border-purple-900/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-purple-200 leading-relaxed">
            <p>
              Meteor Madness is an advanced web platform designed to help researchers, decision-makers, and the public understand 
              and prepare for asteroid threats. By combining real NASA data with sophisticated simulation tools, we provide 
              actionable insights into one of humanity's most critical challenges.
            </p>
            <p>
              The platform features multiple specialized modules for asteroid discovery, impact analysis, mitigation planning, 
              and emergency response coordination. Each tool is built on scientific principles and validated against 
              real-world data.
            </p>
            <p>
              Our mission is to democratize access to asteroid threat information and empower communities worldwide to 
              understand and prepare for potential impact events.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-effect border-purple-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="w-5 h-5 text-purple-400" />
                Technologies Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {technologies.map((tech, index) => (
                  <li key={index} className="flex items-center gap-3 text-purple-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {tech}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-effect border-purple-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Real-time NASA asteroid tracking",
                  "Advanced impact simulations",
                  "Mitigation strategy comparison",
                  "Statistical forecasting models",
                  "Emergency response planning",
                  "Educational resources"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-purple-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-effect border-purple-900/30">
          <CardHeader>
            <CardTitle className="text-white">Scientific Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-purple-900/30 hover:border-purple-500/50 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-purple-300">{resource.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
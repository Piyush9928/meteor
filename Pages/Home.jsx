import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Database, Zap, Shield, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const features = [
    {
      title: "Asteroid Database",
      description: "Explore real NASA data on near-Earth asteroids with advanced filtering",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      link: "AsteroidDatabase"
    },
    {
      title: "Impact Simulator",
      description: "Run realistic impact scenarios and analyze potential consequences",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      link: "ImpactSimulator"
    },
    {
      title: "Mitigation Strategies",
      description: "Discover cutting-edge defense technologies and protection methods",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      link: "MitigationStrategies"
    },
    {
      title: "Forecasting",
      description: "View statistical models and probability analysis of future impacts",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      link: "Forecasting"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">NASA Space Apps Challenge 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Meteor Madness
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced asteroid impact visualization and mitigation portal powered by real NASA datasets
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("AsteroidDatabase")}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 text-white group">
                Explore Asteroids
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("ImpactSimulator")}>
              <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-900/30">
                Run Simulation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <Link key={feature.title} to={createPageUrl(feature.link)}>
              <Card className="glass-effect p-6 hover:scale-105 transition-all duration-300 cursor-pointer group h-full border-purple-900/30">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-purple-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Known NEOs", value: "31,000+", icon: Database },
            { label: "Tracked Daily", value: "150+", icon: TrendingUp },
            { label: "Hazardous", value: "2,300+", icon: AlertTriangle },
            { label: "Close Approaches", value: "Daily", icon: Zap }
          ].map((stat) => (
            <Card key={stat.label} className="glass-effect p-6 text-center border-purple-900/30">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-purple-300">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

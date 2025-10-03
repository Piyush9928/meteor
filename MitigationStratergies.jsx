import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, Rocket, Atom, Users, Satellite, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StrategyCard from "../components/mitigation/StrategyCard";
import ComparisonChart from "../components/mitigation/ComparisonChart";

export default function MitigationStrategiesPage() {
  const strategies = [
    {
      title: "Kinetic Impactor",
      description: "Deflect asteroid by ramming a spacecraft into it at high velocity",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      effectiveness: 85,
      readiness: 90,
      cost: "Medium",
      leadTime: "5-10 years",
      details: "Demonstrated by NASA's DART mission in 2022. Most practical current option for small to medium asteroids detected with sufficient warning time."
    },
    {
      title: "Nuclear Deflection",
      description: "Use nuclear explosion to vaporize surface material and create thrust",
      icon: Atom,
      color: "from-orange-500 to-red-500",
      effectiveness: 95,
      readiness: 70,
      cost: "High",
      leadTime: "10-15 years",
      details: "Most powerful option for large asteroids or short warning times. Requires international cooperation and careful mission planning."
    },
    {
      title: "Gravity Tractor",
      description: "Use spacecraft's gravity to slowly pull asteroid off course",
      icon: Satellite,
      color: "from-purple-500 to-pink-500",
      effectiveness: 70,
      readiness: 75,
      cost: "Medium-High",
      leadTime: "15-20 years",
      details: "Gentle, predictable method requiring long warning time. Useful for precision deflection of smaller asteroids."
    },
    {
      title: "Laser Ablation",
      description: "Focus concentrated laser beam to vaporize asteroid surface",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      effectiveness: 75,
      readiness: 50,
      cost: "Very High",
      leadTime: "15-25 years",
      details: "Advanced technology still in development. Could provide continuous, adjustable thrust for precision deflection."
    },
    {
      title: "Mass Evacuation",
      description: "Emergency relocation of populations from impact zone",
      icon: Users,
      color: "from-yellow-500 to-orange-500",
      effectiveness: 60,
      readiness: 85,
      cost: "Variable",
      leadTime: "Months to years",
      details: "Last resort when deflection is impossible. Requires extensive planning, infrastructure, and international coordination."
    },
    {
      title: "Ion Beam Deflection",
      description: "Use ion thruster beam to gradually nudge asteroid trajectory",
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
      effectiveness: 80,
      readiness: 60,
      cost: "High",
      leadTime: "10-20 years",
      details: "Emerging technology combining benefits of kinetic and laser methods. Provides sustained, controlled thrust."
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Mitigation Strategies</h1>
          <p className="text-purple-300">Explore cutting-edge defense technologies to protect Earth from asteroid threats</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {strategies.map((strategy, index) => (
            <StrategyCard key={strategy.title} strategy={strategy} index={index} />
          ))}
        </div>

        <ComparisonChart strategies={strategies} />
      </div>
    </div>
  );
}
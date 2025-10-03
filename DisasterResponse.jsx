import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Radio, FileText, Heart, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function DisasterResponsePage() {
  const responsePhases = [
    {
      phase: "Detection & Warning",
      icon: Radio,
      color: "from-blue-500 to-cyan-500",
      timeline: "Years to months before impact",
      actions: [
        "NASA and ESA asteroid tracking systems activate",
        "International space agencies coordinate observations",
        "Impact probability calculations refined",
        "Government agencies briefed on threat assessment",
        "Public warning systems prepared"
      ]
    },
    {
      phase: "Emergency Planning",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      timeline: "Months to weeks before impact",
      actions: [
        "Evacuation routes and zones identified",
        "Emergency shelters prepared and stocked",
        "Medical facilities put on high alert",
        "Transportation networks coordinated",
        "International aid agreements activated"
      ]
    },
    {
      phase: "Evacuation",
      icon: Users,
      color: "from-orange-500 to-red-500",
      timeline: "Weeks to days before impact",
      actions: [
        "Mandatory evacuation orders issued",
        "Mass transportation mobilized",
        "Emergency supplies distributed",
        "Vulnerable populations prioritized",
        "Military and emergency services deployed"
      ]
    },
    {
      phase: "Impact Response",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
      timeline: "Hours to days after impact",
      actions: [
        "Search and rescue operations initiated",
        "Medical triage and treatment centers activated",
        "Essential services restoration begins",
        "Communication networks reestablished",
        "Damage assessment conducted"
      ]
    },
    {
      phase: "Recovery & Rehabilitation",
      icon: Heart,
      color: "from-green-500 to-emerald-500",
      timeline: "Weeks to years after impact",
      actions: [
        "Temporary housing provided",
        "Infrastructure reconstruction initiated",
        "Environmental cleanup operations",
        "Economic support programs established",
        "Long-term health monitoring"
      ]
    }
  ];

  const preparednessChecklist = [
    "Emergency supply kit (3-day minimum)",
    "Important documents in waterproof container",
    "Family communication plan",
    "Evacuation routes and meeting points",
    "Battery-powered radio and flashlights",
    "First aid kit and medications",
    "Non-perishable food and water",
    "Cash and credit cards",
    "Emergency contact list",
    "Copies of insurance policies"
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Disaster Response</h1>
          <p className="text-purple-300">Emergency preparedness and response guidelines for asteroid impact scenarios</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-effect p-6 border-purple-900/30">
            <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Be Prepared</h3>
            <p className="text-purple-300 text-sm">
              Understanding asteroid threat protocols can save lives. Knowledge is our first line of defense.
            </p>
          </Card>

          <Card className="glass-effect p-6 border-purple-900/30">
            <Radio className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Stay Informed</h3>
            <p className="text-purple-300 text-sm">
              Monitor official channels for updates. NASA and FEMA provide real-time threat assessments.
            </p>
          </Card>

          <Card className="glass-effect p-6 border-purple-900/30">
            <Users className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Community Action</h3>
            <p className="text-purple-300 text-sm">
              Work with local emergency management. Community preparedness increases survival rates.
            </p>
          </Card>
        </div>

        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Response Timeline</h2>
          {responsePhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect border-purple-900/30 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${phase.color}`} />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${phase.color} shadow-lg`}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-white">{phase.phase}</CardTitle>
                        <Badge variant="outline" className="text-purple-300 border-purple-500/30">
                          {phase.timeline}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-3 text-purple-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="glass-effect border-purple-900/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6 text-purple-400" />
              <CardTitle className="text-white">Personal Preparedness Checklist</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {preparednessChecklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-purple-900/30">
                  <div className="w-5 h-5 rounded border-2 border-purple-500" />
                  <span className="text-purple-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
              <p className="text-blue-300 text-sm">
                <strong>Remember:</strong> In the event of an impact warning, follow official evacuation orders immediately. 
                Your local emergency management agency will provide specific instructions for your area.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
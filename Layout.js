import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Database, Zap, Shield, TrendingUp, AlertTriangle, BookOpen, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Home },
  { title: "Asteroid Database", url: createPageUrl("AsteroidDatabase"), icon: Database },
  { title: "Impact Simulator", url: createPageUrl("ImpactSimulator"), icon: Zap },
  { title: "Mitigation Strategies", url: createPageUrl("MitigationStrategies"), icon: Shield },
  { title: "Forecasting", url: createPageUrl("Forecasting"), icon: TrendingUp },
  { title: "Disaster Response", url: createPageUrl("DisasterResponse"), icon: AlertTriangle },
  { title: "About & Resources", url: createPageUrl("About"), icon: BookOpen },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <style>{`
          :root {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --primary: 263 70% 50%;
            --primary-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
          }
          
          .glass-effect {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(139, 92, 246, 0.2);
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
        
        <Sidebar className="border-r border-purple-900/30 glass-effect">
          <SidebarHeader className="border-b border-purple-900/30 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Meteor Madness
                </h2>
                <p className="text-xs text-purple-300">Asteroid Impact Portal</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-purple-300 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`mb-1 rounded-lg transition-all duration-200 ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                              : 'text-purple-200 hover:bg-purple-900/30 hover:text-white'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-slate-950/40 backdrop-blur-sm border-b border-purple-900/30 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-purple-300 hover:text-white" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Meteor Madness
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
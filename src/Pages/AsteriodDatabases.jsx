import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, AlertTriangle, Loader2 } from "lucide-react";
import { SavedAsteroid } from "@/entities/SavedAsteroid";
import { motion, AnimatePresence } from "framer-motion";
import AsteroidCard from "../components/database/AsteroidCard";
import AsteroidFilters from "../components/database/AsteroidFilters";
import AsteroidDetails from "../components/database/AsteroidDetails";

export default function AsteroidDatabasePage() {
  const [asteroids, setAsteroids] = useState([]);
  const [filteredAsteroids, setFilteredAsteroids] = useState([]);
  const [savedAsteroids, setSavedAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [filters, setFilters] = useState({
    hazardous: "all",
    size: "all",
    velocity: "all"
  });

  useEffect(() => {
    fetchAsteroids();
    loadSavedAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
      
      const startStr = today.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];
      
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startStr}&end_date=${endStr}&api_key=DEMO_KEY`
      );
      const data = await response.json();
      
      const allAsteroids = [];
      Object.values(data.near_earth_objects).forEach(dayAsteroids => {
        allAsteroids.push(...dayAsteroids);
      });
      
      setAsteroids(allAsteroids);
    } catch (error) {
      console.error("Error fetching asteroids:", error);
    }
    setLoading(false);
  };

  const loadSavedAsteroids = async () => {
    const saved = await SavedAsteroid.list();
    setSavedAsteroids(saved);
  };

  const applyFilters = useCallback(() => {
    let filtered = [...asteroids];

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.hazardous !== "all") {
      const isHazardous = filters.hazardous === "yes";
      filtered = filtered.filter(a => a.is_potentially_hazardous_asteroid === isHazardous);
    }

    if (filters.size !== "all") {
      filtered = filtered.filter(a => {
        const diameter = a.estimated_diameter?.meters?.estimated_diameter_max || 0;
        if (filters.size === "small") return diameter < 100;
        if (filters.size === "medium") return diameter >= 100 && diameter < 1000;
        if (filters.size === "large") return diameter >= 1000;
        return true;
      });
    }

    if (filters.velocity !== "all") {
      filtered = filtered.filter(a => {
        const velocity = parseFloat(a.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0);
        if (filters.velocity === "slow") return velocity < 10;
        if (filters.velocity === "moderate") return velocity >= 10 && velocity < 20;
        if (filters.velocity === "fast") return velocity >= 20;
        return true;
      });
    }

    setFilteredAsteroids(filtered);
  }, [searchTerm, filters, asteroids]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const toggleSaveAsteroid = async (asteroid) => {
    const isSaved = savedAsteroids.some(s => s.nasa_id === asteroid.id);
    
    if (isSaved) {
      const saved = savedAsteroids.find(s => s.nasa_id === asteroid.id);
      await SavedAsteroid.delete(saved.id);
    } else {
      await SavedAsteroid.create({
        nasa_id: asteroid.id,
        name: asteroid.name,
        diameter_min: asteroid.estimated_diameter?.meters?.estimated_diameter_min || 0,
        diameter_max: asteroid.estimated_diameter?.meters?.estimated_diameter_max || 0,
        velocity: parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0),
        miss_distance: parseFloat(asteroid.close_approach_data?.[0]?.miss_distance?.kilometers || 0),
        is_hazardous: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date: asteroid.close_approach_data?.[0]?.close_approach_date || "",
        notes: ""
      });
    }
    
    loadSavedAsteroids();
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Asteroid Database</h1>
          <p className="text-purple-300">Real-time data from NASA's Near-Earth Object program</p>
        </div>

        {/* Search and Filters */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <Card className="glass-effect p-6 border-purple-900/30">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <Input
                    placeholder="Search asteroids by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-purple-900/50 text-white"
                  />
                </div>
                <Button 
                  onClick={fetchAsteroids}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Refresh Data
                </Button>
              </div>
              
              <AsteroidFilters filters={filters} setFilters={setFilters} />
            </Card>
          </div>

          <Card className="glass-effect p-6 border-purple-900/30">
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold text-white mb-1">{savedAsteroids.length}</div>
              <div className="text-sm text-purple-300">Saved Asteroids</div>
            </div>
          </Card>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAsteroids.map((asteroid, index) => (
                <AsteroidCard
                  key={asteroid.id}
                  asteroid={asteroid}
                  isSaved={savedAsteroids.some(s => s.nasa_id === asteroid.id)}
                  onToggleSave={toggleSaveAsteroid}
                  onClick={() => setSelectedAsteroid(asteroid)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredAsteroids.length === 0 && (
          <Card className="glass-effect p-12 text-center border-purple-900/30">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-bold text-white mb-2">No asteroids found</h3>
            <p className="text-purple-300">Try adjusting your filters or search term</p>
          </Card>
        )}
      </div>

      {selectedAsteroid && (
        <AsteroidDetails
          asteroid={selectedAsteroid}
          onClose={() => setSelectedAsteroid(null)}
        />
      )}
    </div>
  );
}

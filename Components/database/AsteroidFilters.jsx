import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function AsteroidFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-purple-400" />
        <Select
          value={filters.hazardous}
          onValueChange={(value) => setFilters({ ...filters, hazardous: value })}
        >
          <SelectTrigger className="w-36 bg-slate-900/50 border-purple-900/50 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="yes">Hazardous</SelectItem>
            <SelectItem value="no">Safe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select
        value={filters.size}
        onValueChange={(value) => setFilters({ ...filters, size: value })}
      >
        <SelectTrigger className="w-36 bg-slate-900/50 border-purple-900/50 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sizes</SelectItem>
          <SelectItem value="small">< 100m</SelectItem>
          <SelectItem value="medium">100-1000m</SelectItem>
          <SelectItem value="large">> 1000m</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.velocity}
        onValueChange={(value) => setFilters({ ...filters, velocity: value })}
      >
        <SelectTrigger className="w-36 bg-slate-900/50 border-purple-900/50 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Speeds</SelectItem>
          <SelectItem value="slow">< 10 km/s</SelectItem>
          <SelectItem value="moderate">10-20 km/s</SelectItem>
          <SelectItem value="fast">> 20 km/s</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

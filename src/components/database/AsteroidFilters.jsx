import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AsteroidFilters = ({ filters, setFilters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label className="text-purple-300 block mb-1 text-sm">Hazardous:</Label>
        <Select value={filters.hazardous} onValueChange={(value) => setFilters({ ...filters, hazardous: value })}>
          <SelectTrigger className="bg-slate-900/50 border-purple-900/50 text-white w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-purple-300 block mb-1 text-sm">Size:</Label>
        <Select value={filters.size} onValueChange={(value) => setFilters({ ...filters, size: value })}>
          <SelectTrigger className="bg-slate-900/50 border-purple-900/50 text-white w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="small">Small (<100m)</SelectItem>
            <SelectItem value="medium">Medium (100m-1km)</SelectItem>
            <SelectItem value="large">Large (>1km)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-purple-300 block mb-1 text-sm">Velocity:</Label>
        <Select value={filters.velocity} onValueChange={(value) => setFilters({ ...filters, velocity: value })}>
          <SelectTrigger className="bg-slate-900/50 border-purple-900/50 text-white w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="slow">Slow (<10 km/s)</SelectItem>
            <SelectItem value="moderate">Moderate (10-20 km/s)</SelectItem>
            <SelectItem value="fast">Fast (>20 km/s)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AsteroidFilters;

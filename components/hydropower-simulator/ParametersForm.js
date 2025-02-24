"use client";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useHydropowerStore from "@/lib/store";

export default function ParametersForm() {
  const {
    damHeight,
    setDamHeight,
    waterFlow,
    setWaterFlow,
    turbineType,
    setTurbineType,
    isCalculating,
    error,
    maxHeight,
  } = useHydropowerStore();

  const validateHeight = (value) => {
    if (value < 10 || value > maxHeight) {
      return `Wysokość musi być między 10 a ${maxHeight}m`;
    }
    return null;
  };

  const handleHeightChange = ([value]) => {
    const error = validateHeight(value);
    if (!error) {
      setDamHeight(value);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Wysokość zapory: {damHeight}m
        </label>
        <Slider
          value={[damHeight]}
          onValueChange={handleHeightChange}
          min={10}
          max={maxHeight}
          step={maxHeight <= 100 ? 1 : 5}
          disabled={isCalculating}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Przepływ wody: {waterFlow}m³/s
        </label>
        <Slider
          value={[waterFlow]}
          onValueChange={([value]) => setWaterFlow(value)}
          min={100}
          max={3000}
          step={50}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Typ turbiny</label>
        <Select value={turbineType} onValueChange={setTurbineType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Kaplan">Kaplan</SelectItem>
            <SelectItem value="Francis">Francis</SelectItem>
            <SelectItem value="Pelton">Pelton</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { powerPlants } from "@/lib/powerPlants";
import useHydropowerStore from "@/lib/store";
import Image from "next/image";

export default function PowerPlantSelector() {
  const { selectedPlant, setSelectedPlant } = useHydropowerStore();

  const handlePlantSelect = (plantId) => {
    setSelectedPlant(plantId);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Wybierz elektrownię</h2>
      <div className="space-y-4">
        <Select value={selectedPlant} onValueChange={handlePlantSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz elektrownię..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Własne parametry</SelectItem>
            {Object.entries(powerPlants).map(([id, plant]) => (
              <SelectItem key={id} value={id}>
                {plant.name} ({plant.country})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedPlant &&
          selectedPlant !== "custom" &&
          powerPlants[selectedPlant] && (
            <div className="space-y-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={powerPlants[selectedPlant].image}
                  alt={powerPlants[selectedPlant].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">
                  {powerPlants[selectedPlant].name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {powerPlants[selectedPlant].description}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Wysokość</dt>
                    <dd className="font-medium">
                      {powerPlants[selectedPlant].height} m
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Moc</dt>
                    <dd className="font-medium">
                      {(powerPlants[selectedPlant].power / 1000).toFixed(0)} MW
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Typ turbiny</dt>
                    <dd className="font-medium">
                      {powerPlants[selectedPlant].turbineType}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Kraj</dt>
                    <dd className="font-medium">
                      {powerPlants[selectedPlant].country}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
      </div>
    </Card>
  );
}

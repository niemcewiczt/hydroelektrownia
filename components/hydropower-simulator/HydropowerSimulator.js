"use client";

import { Card } from "@/components/ui/card";
import ParametersForm from "./ParametersForm";
import ResultsDisplay from "./ResultsDisplay";
import InteractiveChart from "./InteractiveChart";
import PowerPlantSelector from "./PowerPlantSelector";
import DidYouKnow from "./DidYouKnow";

export function HydropowerSimulator() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Wirtualny Projektant Elektrowni Wodnej
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PowerPlantSelector />

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Wyniki Symulacji</h2>
          <ResultsDisplay />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Parametry Elektrowni</h2>
          <ParametersForm />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Wykres Zależności</h2>
          <InteractiveChart />
        </Card>

        <Card className="p-6 md:col-span-2">
          <DidYouKnow />
        </Card>
      </div>
    </div>
  );
}

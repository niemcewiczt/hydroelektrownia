"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ParametersForm from "./ParametersForm";
import ResultsDisplay from "./ResultsDisplay";
import InteractiveChart from "./InteractiveChart";
import PowerPlantSelector from "./PowerPlantSelector";
import DidYouKnow from "./DidYouKnow";
import Quiz from "./Quiz";

export function HydropowerSimulator() {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <Button onClick={() => setShowQuiz(false)}>
            ← Powrót do symulatora
          </Button>
        </div>
        <Quiz />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Wirtualny Projektant Elektrowni Wodnej
        </h1>
        <Button onClick={() => setShowQuiz(true)}>Sprawdź swoją wiedzę</Button>
      </div>

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

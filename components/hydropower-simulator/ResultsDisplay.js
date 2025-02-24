"use client";

import useHydropowerStore from "@/lib/store";

function formatPower(power) {
  if (power >= 100000) {
    return `${(power / 1000).toFixed(0)} MW`;
  }
  return `${Math.round(power)} kW`;
}

export default function ResultsDisplay() {
  const { power, environmentalImpact, installationCost } = useHydropowerStore();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-100 rounded-lg">
        <h3 className="font-medium">Moc wyjściowa</h3>
        <p className="text-2xl font-bold">{formatPower(power)}</p>
      </div>

      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="font-medium">Wpływ na środowisko</h3>
        <p className="text-2xl font-bold">{environmentalImpact}/100</p>
        <p className="text-sm text-gray-600">
          {environmentalImpact < 30
            ? "Niski wpływ"
            : environmentalImpact < 70
            ? "Średni wpływ"
            : "Wysoki wpływ"}
        </p>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg">
        <h3 className="font-medium">Koszt instalacji</h3>
        <p className="text-2xl font-bold">{installationCost} mln PLN</p>
      </div>
    </div>
  );
}

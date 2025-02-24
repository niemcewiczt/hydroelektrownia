"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useHydropowerStore from "@/lib/store";
import { calculatePower } from "@/lib/calculations";

export default function InteractiveChart() {
  const { damHeight, waterFlow, turbineType, maxHeight } = useHydropowerStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateChartData = () => {
    const data = [];
    const step = maxHeight <= 100 ? 10 : 20;
    for (let height = 10; height <= maxHeight; height += step) {
      data.push({
        height,
        power: calculatePower(height, waterFlow, turbineType),
      });
    }
    // Dodaj ostatni punkt jeśli nie jest wielokrotnością kroku
    if (maxHeight % step !== 0) {
      data.push({
        height: maxHeight,
        power: calculatePower(maxHeight, waterFlow, turbineType),
      });
    }
    return data;
  };

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart
          data={generateChartData()}
          margin={{ top: 20, right: 30, left: 80, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="height"
            label={{
              value: "Wysokość zapory (m)",
              position: "bottom",
              offset: 40,
            }}
          />
          <YAxis
            label={{
              value: "Moc (kW)",
              angle: -90,
              position: "insideLeft",
              offset: -60,
            }}
            tickMargin={10}
          />
          <Tooltip
            formatter={(value) => [`${value} kW`, "Moc wyjściowa"]}
            labelFormatter={(value) => `Wysokość: ${value}m`}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="power"
            stroke="#2563eb"
            name="Moc wyjściowa"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

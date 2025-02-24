import { create } from "zustand";
import {
  calculatePower,
  calculateEnvironmentalImpact,
  calculateCost,
} from "./calculations";
import { powerPlants } from "./powerPlants";

// Znajdujemy maksymalne wartości z elektrowni
const getMaxValues = () => {
  return Object.values(powerPlants).reduce(
    (max, plant) => ({
      height: Math.max(max.height, plant.height),
      power: Math.max(max.power, plant.power),
    }),
    { height: 100, power: 0 } // Domyślne wartości
  );
};

const maxValues = getMaxValues();

const useHydropowerStore = create((set, get) => ({
  // Parameters
  damHeight: 10,
  waterFlow: 100,
  turbineType: "Kaplan",
  selectedPlant: "custom",

  // Maksymalne wartości
  maxHeight: 100, // Domyślna wartość

  // Results
  power: 0,
  environmentalImpact: 0,
  installationCost: 0,

  // Add loading and error states
  isCalculating: false,
  error: null,

  // Actions
  setDamHeight: async (height) => {
    try {
      set({ isCalculating: true, error: null });
      const newState = { ...get(), damHeight: height };
      const results = calculateResults(newState);
      set({ ...newState, ...results, isCalculating: false });
    } catch (err) {
      set({ error: "Błąd podczas obliczeń", isCalculating: false });
    }
  },

  setWaterFlow: (flow) =>
    set((state) => {
      const newState = { ...state, waterFlow: flow };
      return {
        ...newState,
        ...calculateResults(newState),
      };
    }),

  setTurbineType: (type) =>
    set((state) => {
      const newState = { ...state, turbineType: type };
      return {
        ...newState,
        ...calculateResults(newState),
      };
    }),

  setSelectedPlant: (plantId) => {
    if (plantId === "custom") {
      set({
        selectedPlant: "custom",
        maxHeight: 100, // Przywracamy domyślny zakres
      });
      return;
    }

    const plant = powerPlants[plantId];
    if (plant) {
      set((state) => ({
        selectedPlant: plantId,
        damHeight: plant.height,
        turbineType: plant.turbineType,
        maxHeight: Math.max(plant.height, maxValues.height), // Ustawiamy nowy zakres
        ...calculateResults({
          damHeight: plant.height,
          waterFlow: state.waterFlow,
          turbineType: plant.turbineType,
        }),
      }));
    }
  },
}));

function calculateResults(state) {
  const { damHeight, waterFlow, turbineType } = state;
  return {
    power: calculatePower(damHeight, waterFlow, turbineType),
    environmentalImpact: calculateEnvironmentalImpact(damHeight, waterFlow),
    installationCost: calculateCost(damHeight, waterFlow, turbineType),
  };
}

export default useHydropowerStore;

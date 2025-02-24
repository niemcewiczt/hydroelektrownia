// Stałe do obliczeń
const GRAVITY = 9.81; // m/s²
const WATER_DENSITY = 1000; // kg/m³

// Współczynniki sprawności turbin
const TURBINE_EFFICIENCY = {
  Kaplan: 0.93,
  Francis: 0.9,
  Pelton: 0.89,
};

// Obliczanie mocy wyjściowej w kilowatach
export function calculatePower(damHeight, waterFlow, turbineType) {
  const efficiency = TURBINE_EFFICIENCY[turbineType];
  const power =
    (WATER_DENSITY * GRAVITY * waterFlow * damHeight * efficiency) / 1000;
  return Math.round(power);
}

// Obliczanie wpływu na środowisko (skala 0-100)
export function calculateEnvironmentalImpact(damHeight, waterFlow) {
  // Uproszczony model wpływu na środowisko
  const heightImpact = (damHeight / 100) * 60; // Wysokość zapory ma 60% wpływu
  const flowImpact = (waterFlow / 1000) * 40; // Przepływ ma 40% wpływu
  return Math.round(heightImpact + flowImpact);
}

// Obliczanie przybliżonego kosztu instalacji (w milionach PLN)
export function calculateCost(damHeight, waterFlow, turbineType) {
  const baseCost = damHeight * waterFlow * 0.1; // Podstawowy koszt zależny od wielkości

  // Modyfikatory kosztu dla różnych typów turbin
  const turbineCostMultiplier = {
    Kaplan: 1.2,
    Francis: 1.0,
    Pelton: 1.4,
  };

  return Math.round(baseCost * turbineCostMultiplier[turbineType]);
}

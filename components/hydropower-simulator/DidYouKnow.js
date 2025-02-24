"use client";

export default function DidYouKnow() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Czy wiesz, że?</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium">Turbina Kaplana</h4>
          <p className="text-sm">
            Najlepiej sprawdza się przy niskich spadach i dużych przepływach.
            Idealna dla nizinnych rzek.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium">Turbina Francisa</h4>
          <p className="text-sm">
            Uniwersalna turbina, dobrze działa przy średnich spadach i
            przepływach. Najczęściej stosowana na świecie.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium">Turbina Peltona</h4>
          <p className="text-sm">
            Najefektywniejsza przy wysokich spadach i małych przepływach. Często
            używana w elektrowniach górskich.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium">Energia wodna</h4>
          <p className="text-sm">
            Jest jednym z najstarszych i najbardziej ekologicznych źródeł
            energii odnawialnej. Pierwsze koło wodne powstało ponad 2000 lat
            temu!
          </p>
        </div>
      </div>
    </div>
  );
}

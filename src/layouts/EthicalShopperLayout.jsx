export default function EthicalShopperLayout() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">
          Conscious Shopping
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🌱 Sustainability Impact
            </h2>
            <div className="space-y-4">
              <div className="bg-emerald-100 p-4 rounded-lg">
                <p className="text-emerald-800 font-semibold">
                  Carbon Footprint
                </p>
                <p className="text-gray-600">
                  Environmental impact and eco-friendly alternatives
                </p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-lg">
                <p className="text-emerald-800 font-semibold">
                  Fair Trade Certified
                </p>
                <p className="text-gray-600">
                  Ethically sourced and produced products
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Brand Values
            </h2>
            <div className="space-y-4">
              <div className="bg-emerald-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  🤝 Social responsibility initiatives
                </p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  ♻️ Recycling and packaging information
                </p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  🌍 Community impact and giving back
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

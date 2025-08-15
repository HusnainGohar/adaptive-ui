export default function PracticalShopperLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Smart Shopping
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Comparison
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Features</span>
                  <span className="font-medium">Price</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Side-by-side product specifications
                </p>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700">Value for money analysis</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Essential Information
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">✓ Warranty and return policy</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  ✓ Shipping costs and delivery time
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  ✓ Product specifications and dimensions
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function DealHunterLayout() {
  return (
    <div className="min-h-screen bg-red-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-900 mb-8">Deal Hunter Central</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔥 Hot Deals</h2>
            <div className="space-y-4">
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-800 font-semibold">Flash Sale - 70% OFF</p>
                <p className="text-gray-600">Limited time offers and lightning deals</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-800 font-semibold">Price Drop Alert</p>
                <p className="text-gray-600">Items on your wishlist now on sale</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Tracking</h2>
            <div className="space-y-4">
              <div className="bg-orange-100 p-4 rounded-lg">
                <p className="text-gray-700">Historical price charts and trend analysis</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <p className="text-gray-700">Price comparison across multiple retailers</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

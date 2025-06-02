export default function ImpulseShopperLayout() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-8">Quick Shop</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 border-2 border-yellow-400">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">⚡ One-Click Buys</h2>
            <div className="space-y-4">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg">
                Buy Now - $29.99
              </button>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg">
                Add to Cart - $19.99
              </button>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg">
                Quick Purchase - $39.99
              </button>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Trending Now</h2>
            <div className="space-y-4">
              <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-yellow-800 font-semibold">🔥 Bestseller</p>
                <p className="text-gray-600">Popular items flying off the shelves</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-yellow-800 font-semibold">⭐ Staff Pick</p>
                <p className="text-gray-600">Recommended by our team</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

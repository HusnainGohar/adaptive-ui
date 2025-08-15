export default function WindowShopperLayout() {
  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          Browse & Discover
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Visual Gallery
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 h-32 rounded-lg flex items-center justify-center">
                <p className="text-purple-700">Product Image</p>
              </div>
              <div className="bg-purple-100 h-32 rounded-lg flex items-center justify-center">
                <p className="text-purple-700">Product Image</p>
              </div>
              <div className="bg-purple-100 h-32 rounded-lg flex items-center justify-center">
                <p className="text-purple-700">Product Image</p>
              </div>
              <div className="bg-purple-100 h-32 rounded-lg flex items-center justify-center">
                <p className="text-purple-700">Product Image</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Inspiration Board
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Trending styles and seasonal collections
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Curated lookbooks and style guides
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  Similar items and style recommendations
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

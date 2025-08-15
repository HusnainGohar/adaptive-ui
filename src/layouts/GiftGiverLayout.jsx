export default function GiftGiverLayout() {
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-pink-900 mb-8">Perfect Gifts</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🎁 Gift Finder
            </h2>
            <div className="space-y-4">
              <div className="bg-pink-100 p-4 rounded-lg">
                <p className="text-pink-800 font-semibold">By Occasion</p>
                <p className="text-gray-600">
                  Birthday, Anniversary, Holiday gifts
                </p>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <p className="text-pink-800 font-semibold">By Recipient</p>
                <p className="text-gray-600">
                  For him, for her, for kids, for pets
                </p>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <p className="text-pink-800 font-semibold">By Budget</p>
                <p className="text-gray-600">
                  Under $25, $25-$50, $50-$100, Luxury
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Gift Services
            </h2>
            <div className="space-y-4">
              <div className="bg-pink-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  🎀 Gift wrapping and personalization
                </p>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <p className="text-gray-700">📦 Direct shipping to recipient</p>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  💌 Custom gift messages and cards
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

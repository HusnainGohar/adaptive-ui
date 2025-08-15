export default function ReviewReaderLayout() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Review Reader Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Latest Reviews
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600">
                  Detailed product reviews and ratings from verified buyers
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-600">
                  Expert opinions and comparison guides
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Review Analytics
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-100 p-4 rounded">
                <p className="text-gray-700">
                  Average rating trends and review sentiment analysis
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded">
                <p className="text-gray-700">
                  Most helpful reviews and reviewer credibility scores
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

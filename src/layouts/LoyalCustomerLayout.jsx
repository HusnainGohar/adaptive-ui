export default function LoyalCustomerLayout() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-900 mb-8">Welcome Back, Valued Customer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Rewards</h2>
            <div className="space-y-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 font-semibold">💎 VIP Status</p>
                <p className="text-gray-600">Exclusive access to member-only deals</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-800 font-semibold">🎁 Loyalty Points: 2,450</p>
                <p className="text-gray-600">Redeem for discounts and free shipping</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Recommendations</h2>
            <div className="space-y-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-gray-700">Based on your purchase history</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-gray-700">Reorder your favorite items</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-gray-700">Early access to new arrivals</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

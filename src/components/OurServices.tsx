

const OurServices = () => {
  return (
    <div className="py-10">
      {/* --- Service Description --- */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-primary text-4xl font-bold text-center mb-6">
          Our Services
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Send, track, and manage parcels with ease. Parcel Manager keeps your deliveries fast, secure, and always in sight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Fast and Reliable Delivery</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your parcels, always on the right path — with optimized routes and reliable tracking.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay fully informed with real-time parcel monitoring and instant notifications at every step.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2">Secure Handling</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We prioritize safety for every parcel, ensuring careful handling
              and accountability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
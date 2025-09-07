const Banner = () => {
  return (
    <div>
      <section className="lg:grid lg:h-screen lg:place-content-center bg-gray-700">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
          <div className="max-w-prose text-left">
            <h1 className="text-4xl font-bold text-white sm:text-5xl dark:text-white">
              Optimize Your
              <strong className="text-primary"> Parcel Delivery </strong>
              Experience
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
              Effortlessly manage, track, and update your parcels with our intuitive Parcel Delivery Management System. Stay organized and in control from dispatch to delivery.
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6 mb-3">
              <a
                className="inline-block rounded border border-indigo-600 bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                href="#"
              >
                Get Ready
              </a>

              <a
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700  dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>

          <div>
            <img src="/banner_img2.jpg" alt="Parcel Delivery Management System" loading="lazy" className="rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
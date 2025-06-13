import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative flex h-96 items-center justify-center text-white">
        <div
          className="absolute inset-0 rounded-xs bg-black bg-cover bg-center"
          style={{ backgroundImage: "url('/heroBanner.jpg')" }}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-5xl font-bold">Welcome to Cartsy!</h1>
          <p className="mb-8 text-xl">
            Your one-stop shop for everything you need.
          </p>
          <Link
            to="/shop"
            className="rounded-full bg-sky-600 px-8 py-3 text-lg font-semibold transition-colors duration-300 hover:bg-sky-700"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="container mx-auto py-12">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Men's Clothing */}
          <Link to="/shop/men" className="group block">
            <div className="overflow-hidden rounded-md bg-white shadow-lg transition-transform duration-150 group-hover:scale-101">
              <img
                src="/menShirts.jpg"
                alt="Men's Clothing"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Men's Clothing
                </h3>
              </div>
            </div>
          </Link>

          {/* Women's Clothing */}
          <Link to="/shop/women" className="group block">
            <div className="overflow-hidden rounded-md bg-white shadow-lg transition-transform duration-150 group-hover:scale-101">
              <img
                src="/womenClothing.jpg"
                alt="Women's Clothing"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Women's Clothing
                </h3>
              </div>
            </div>
          </Link>

          {/* jeweler */}
          <Link to="/shop/jewelery" className="group block">
            <div className="group-ho ver:scale-101 overflow-hidden rounded-md bg-white shadow-lg transition-transform duration-150">
              <img
                src="/jewelry.jpg"
                alt="jeweler"
                className="h-48 w-full bg-cover object-cover"
                style={{ objectPosition: "center -240px" }}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">jeweler</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

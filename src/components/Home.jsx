import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative flex h-96 items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483985988355-f705465ae1f0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-5xl font-bold">Welcome to Cartsy!</h1>
          <p className="mb-8 text-xl">Your one-stop shop for everything you need.</p>
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
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Men's Clothing */}
          <Link to="/shop/men's clothing" className="group block">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Men's Clothing"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Men's Clothing</h3>
              </div>
            </div>
          </Link>

          {/* Women's Clothing */}
          <Link to="/shop/women's clothing" className="group block">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Women's Clothing"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Women's Clothing</h3>
              </div>
            </div>
          </Link>

          {/* Jewelery */}
          <Link to="/shop/jewelery" className="group block">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1592098172276-952742052103?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Jewelery"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Jewelery</h3>
              </div>
            </div>
          </Link>

          {/* Electronics */}
          <Link to="/shop/electronics" className="group block">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1526738549149-8e07fa9011ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Electronics"
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Electronics</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Cartsy. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed with <span className="text-red-500">&#9829;</span> by Roo
          </p>
        </div>
      </footer>
    </div>
  );
}

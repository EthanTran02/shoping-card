import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart01Icon } from "hugeicons-react";
import useStore from "../stores/useStore";
import { GithubIcon } from "hugeicons-react";

export default function Root() {
  const getTotalItem = useStore((state) => state.getTotalItem(state));

  return (
    <div className="flex min-h-screen flex-col">
      {" "}
      <div className="flex-grow px-4 sm:px-10 md:px-20">
        {" "}
        <nav className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-4 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md sm:-mx-10 sm:px-10 md:-mx-20 md:px-20">
          {" "}
          <Link
            to={"/"}
            className="flex items-center justify-center gap-3 p-2 text-3xl font-semibold text-gray-800 transition-colors hover:text-gray-600 sm:text-4xl"
          >
            Glow
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            {" "}
            <Link
              to="/"
              className="rounded-md px-3 py-2 text-base text-gray-700 transition-colors hover:text-gray-500 sm:text-lg" // Softer hover, rounded
            >
              Home
            </Link>
            <Link
              to="shop"
              className="rounded-md px-3 py-2 text-base text-gray-700 transition-colors hover:text-gray-500 sm:text-lg" // Softer hover, rounded
            >
              Shop
            </Link>
            <Link
              to="cart"
              className="relative rounded-md px-3 py-2 text-gray-700 transition-colors hover:text-gray-500"
            >
              {getTotalItem > 0 && (
                <p
                  key={getTotalItem}
                  className="absolute -top-0 -right-0 flex h-5 min-w-[20px] animate-[bounce_0.6s_ease-out_1_forwards] items-center justify-center rounded-full bg-red-700 p-1 text-xs font-medium text-white shadow-md"
                >
                  {getTotalItem}
                </p>
              )}
              <ShoppingCart01Icon size={24} />
            </Link>
          </div>
        </nav>
        <main className="py-8">
          {" "}
          <Outlet />
        </main>
      </div>
      <footer className="flex h-12 items-center justify-center bg-gray-800">
        {" "}
        {/* Darker footer, lighter text */}
        <a
          href="https://github.com/EthanTran02/shopping-card"
          target="__blank"
          className="flex items-center justify-center text-sm opacity-70 transition-opacity duration-150 hover:opacity-85" // Smaller text, hover eff  ect
        >
          <GithubIcon className="text-white" size={18} />
          <p className="ml-2 text-white">GitHub</p>
        </a>
      </footer>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart01Icon } from "hugeicons-react";
import useStore from "../stores/useStore";

export default function Root() {
  const getTotalItem = useStore((state) => state.getTotalItem(state));

  return (
    <div className="px-20">
      <nav className="sticky top-0 z-10 -mx-20 flex justify-between gap-4 bg-white px-20 shadow-sm">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-4 p-4 pl-0 text-5xl font-semibold"
        >
          Glow
        </Link>

        <div className="flex gap-4 p-4 pr-0">
          <Link to="/" className="px-3 py-2 text-xl hover:text-gray-600">
            Home
          </Link>
          <Link to="shop" className="px-3 py-2 text-xl hover:text-gray-600">
            Shop
          </Link>
          <Link to="cart" className="px-3 py-2 text-xl hover:text-gray-600">
            <p
              key={getTotalItem}
              className="absolute top-4 right-21 flex h-[20px] min-w-[20px] animate-[bounce_1s_ease-in-out_forwards] items-center justify-center rounded-full bg-red-700 p-2 text-xs text-white"
            >
              {getTotalItem}
            </p>
            <ShoppingCart01Icon />
          </Link>
        </div>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

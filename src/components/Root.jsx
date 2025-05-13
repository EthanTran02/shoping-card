import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart01Icon } from "hugeicons-react";
import useStore from "../stores/useStore";

export default function Root() {
  const totalItem = useStore((state) => state.totalItem);

  return (
    <div div className="px-20">
      <nav className="flex justify-between gap-4 p-4">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-4 p-4 pl-0 text-5xl font-semibold"
        >
          Glow
        </Link>

        <div className="flex gap-4 p-4 pr-0">
          <Link to="/" className="px-3 py-2 text-xl">
            Home
          </Link>
          <Link to="shop" className="px-3 py-2 text-xl">
            Shop
          </Link>
          <Link to="cart" className="px-3 py-2 text-xl">
            <p className="absolute top-6 right-25 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-red-700 p-2 text-xs text-white">
              {totalItem}
            </p>
            <ShoppingCart01Icon />
          </Link>
        </div>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart01Icon } from "hugeicons-react";

export default function Root() {
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
            <ShoppingCart01Icon />
          </Link>
        </div>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

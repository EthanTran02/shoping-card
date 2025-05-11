import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart01Icon } from "hugeicons-react";

export default function Root() {
  return (
    <div className="px-15">
      <nav className="flex justify-end gap-4 p-4">
        <Link to="home" className="px-3 py-2 text-xl">
          Home
        </Link>
        <Link to="shop" className="px-3 py-2 text-xl">
          Shop
        </Link>
        <Link to="card" className="px-3 py-2 text-xl">
          <ShoppingCart01Icon />
        </Link>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

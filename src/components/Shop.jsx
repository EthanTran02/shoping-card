import { useEffect } from "react";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ShopLoading from "./loading skeleton/ShopLoading";

export default function Shop() {
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const items = useStore((state) => state.items);
  const fetchItems = useStore((state) => state.fetchItems);

  useEffect(() => {
    // Fetch only if items are not already loaded or if explicitly needed
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  if (loading && items.length === 0) return <ShopLoading />;
  if (error)
    return <h1 className="mt-10 text-center text-xl text-red-500">{error}</h1>;

  return (
    <>
      <nav className="mt-8 mb-12 flex flex-wrap items-center gap-x-4 gap-y-2">
        {" "}
        <Link to={"/shop"} className="text-lg hover:text-gray-700">
          {" "}
          All
        </Link>
        <div className="opacity-25">/</div>{" "}
        <Link to={"men"} className="text-lg hover:text-gray-700">
          Men
        </Link>
        <div className="opacity-25">/</div>
        <Link to={"women"} className="text-lg hover:text-gray-700">
          Women
        </Link>
        <div className="opacity-25">/</div>
        <Link to={"jewelery"} className="text-lg hover:text-gray-700">
          Jewelery
        </Link>
      </nav>

      <Outlet context={items}></Outlet>
    </>
  );
}

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
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  if (loading && items.length === 0) return <ShopLoading />;
  if (error)
    return (
      <h1 className="mt-10 px-4 text-center text-xl text-red-400">{error}</h1>
    );
  {
    /* Added px-4 for error message on small screens */
  }

  return (
    <>
      {/* Original: mt-8 mb-10 flex gap-4 */}
      {/* Responsive: flex-wrap for small screens, adjust gaps */}
      <nav className="mt-6 mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 px-2 sm:mt-8 sm:mb-10 sm:gap-x-4 sm:px-0">
        {" "}
        {/* Adjusted margins, added flex-wrap, responsive gaps, horizontal padding for small screens */}
        <Link to={"/shop"} className="px-1 text-lg sm:px-0">
          {" "}
          {/* Minimal horizontal padding for links if they wrap */}
          All
        </Link>
        <div className="opacity-20">/</div>
        <Link to={"men"} className="px-1 text-lg sm:px-0">
          Men
        </Link>
        <div className="opacity-20">/</div>
        <Link to={"women"} className="px-1 text-lg sm:px-0">
          Women
        </Link>
        <div className="opacity-20">/</div>
        <Link to={"jewelery"} className="px-1 text-lg sm:px-0">
          Jewelery
        </Link>
      </nav>

      <div className="px-2 sm:px-0">
        {" "}
        {/* Add padding for outlet content on small screens */}
        <Outlet context={items} />
      </div>
    </>
  );
}

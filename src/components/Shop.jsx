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
    fetchItems();
  }, [fetchItems]);

  if (loading) return <ShopLoading />;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <nav className="mt-8 mb-10 flex gap-4">
        <Link to={"/shop"} className="text-lg">
          Men
        </Link>
        <div className="opacity-20">/</div>
        <Link to={"women"} className="text-lg">
          Women
        </Link>
        <div className="opacity-20">/</div>
        <Link to={"jewelery"} className="text-lg">
          Jewelery
        </Link>
      </nav>

      <Outlet context={items}></Outlet>
    </>
  );
}

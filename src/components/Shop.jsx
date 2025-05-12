import { useEffect } from "react";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Shop() {
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const items = useStore((state) => state.items);

  const fetchItems = useStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading)
    return <h1 className="mt-16 text-center text-3xl">Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  console.log(items);

  return (
    <>
      <nav className="my-10 flex gap-4">
        <Link to={"men"}>Men</Link>
        <Link to={"women"}>Women</Link>
        <Link to={"jewelery"}>Jewelery</Link>
      </nav>

      <Outlet context={items}></Outlet>
    </>
  );
}

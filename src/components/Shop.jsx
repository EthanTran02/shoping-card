import { useEffect } from "react";
import useStore from "../stores/useStore";

export default function Shop() {
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const items = useStore((state) => state.items);

  const fetchItems = useStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  console.log(items);

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-10 gap-y-14">
      {items.map((item) => (
        <div className="flex w-50 flex-col items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            key={item.id}
            className="aspect-square w-50 object-contain"
          />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

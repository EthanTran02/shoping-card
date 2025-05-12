import { useOutletContext } from "react-router-dom";

export default function Women() {
  const items = useOutletContext();

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-30 gap-y-20">
      {items.map(
        (item) =>
          item.category === "women's clothing" && (
            <div className="flex w-50 flex-col items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                key={item.id}
                className="aspect-square w-50 object-contain"
              />
              <p>{item.title}</p>
            </div>
          ),
      )}
    </div>
  );
}

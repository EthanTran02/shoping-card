import { Link, useOutletContext } from "react-router-dom";

export default function Men() {
  const items = useOutletContext();

  return (
    <div className="mt-16 mb-20 flex flex-wrap justify-center gap-35 gap-y-20">
      {items.map(
        (item) =>
          item.category === "men's clothing" && (
            <Link
              to={`item/${item.id}`}
              className="flex w-55 flex-col items-start justify-center"
            >
              <img
                src={item.image}
                alt={item.title}
                key={item.id}
                className="aspect-square w-50 object-contain"
              />
              <p className="mt-4">
                {item.title.length > 42
                  ? item.title.substring(0, 42) + "..."
                  : item.title}
              </p>
              <p className="mt-4 font-semibold text-blue-900">${item.price}</p>
            </Link>
          ),
      )}
    </div>
  );
}

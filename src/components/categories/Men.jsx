import { Link, useOutletContext } from "react-router-dom";

export default function Men() {
  const items = useOutletContext();

  return (
    <div className="mt-10 mb-20 grid grid-cols-2 place-items-center gap-x-6 gap-y-12 sm:mt-16 sm:mb-32 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 2xl:grid-cols-4">
      {items.map(
        (item) =>
          item.category === "men's clothing" && (
            <Link
              to={`/shop/item/${item.id}`}
              className="flex w-full max-w-xs flex-col items-start justify-center rounded-lg bg-white p-4 transition-shadow md:w-55"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.title}
                className="mx-auto aspect-square w-full max-w-[200px] object-contain"
              />
              <p className="mt-4 text-base font-medium text-gray-800">
                {item.title.length > 42
                  ? item.title.substring(0, 42) + "..."
                  : item.title}
              </p>
              <p className="mt-4 text-lg font-semibold text-blue-900">
                ${item.price}
              </p>
            </Link>
          ),
      )}
    </div>
  );
}

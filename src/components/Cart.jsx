import { FunctionIcon } from "hugeicons-react";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const addedItem = useStore((state) => state.addedItem);
  const removeItem = useStore((state) => state.removeItem);
  const totalItem = useStore((state) => state.totalItem);
  const setTotalItem = useStore((state) => state.setTotalItem);

  function handleRemoveItem(id) {
    removeItem(id);
    setTotalItem();
  }
  // console.log(addedItem);
  console.log(totalItem);

  if (addedItem.length === 0)
    return (
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl">there is no item on the cart!</h1>
        <Link
          to={"/shop"}
          className="rounded-xl bg-blue-700 px-6 py-4 text-white"
        >
          Shopping now
        </Link>
      </div>
    );

  console.log(addedItem);

  return (
    <div className="mt-10">
      <h2 className="mb-15 text-2xl">Shoping cart</h2>

      {addedItem.map((item) => (
        <div className="mb-12 flex gap-12">
          <img
            src={item.image}
            alt=""
            key={item.id}
            className="aspect-square w-40 object-contain"
          />
          <p className="w-120 text-lg">
            {item.title.length > 51
              ? item.title.substring(0, 51) + "..."
              : item.title}
          </p>
          <input
            type="text"
            defaultValue={item.quantity}
            className="h-4 w-4 text-lg"
          />
          <p className="text-lg">${item.price}</p>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p2 cursor-pointer text-lg"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

import useStore from "../stores/useStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const addedItem = useStore((state) => state.addedItem);
  const removeItem = useStore((state) => state.removeItem);
  const setTotalItem = useStore((state) => state.setTotalItem);
  const addItem = useStore((state) => state.addItem);
  const decreaseItem = useStore((state) => state.decreaseItem);

  function handleRemoveItem(id) {
    removeItem(id);
    setTotalItem();
  }

  function handleIncreaseQuantity(item) {
    addItem(item);
  }

  function handleDecreateQuantity(item) {
    decreaseItem(item);
  }

  console.log("render");

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

  return (
    <div className="mt-10">
      <h2 className="mb-15 text-2xl">Shoping cart</h2>

      {addedItem.map((item) => (
        <div
          key={item.id}
          className="mb-12 flex h-fit gap-12 border-b border-gray-400 pb-4"
        >
          <img
            src={item.image}
            alt=""
            key={item.id}
            className="aspect-square w-35 object-contain"
          />
          <p className="w-120 text-lg">
            {item.title.length > 51
              ? item.title.substring(0, 51) + "..."
              : item.title}
          </p>
          <div className="mr-10 flex gap-4">
            <button
              className="flex h-[20px] min-w-[20px] cursor-pointer items-center justify-center rounded-full bg-gray-400 text-center text-2xl"
              onClick={() => handleDecreateQuantity(item)}
            >
              -
            </button>
            <input
              type="text"
              // defaultValue={item.quantity}
              value={item.quantity}
              className="mt-2 h-4 w-4 text-lg"
            />
            <button
              className="flex h-[20px] min-w-[20px] cursor-pointer items-center justify-center rounded-full bg-gray-400 text-center text-2xl"
              onClick={() => handleIncreaseQuantity(item)}
            >
              +
            </button>
          </div>
          <p className="text-lg">${item.price}</p>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p2 h-fit cursor-pointer text-lg"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

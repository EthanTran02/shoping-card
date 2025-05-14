import { Satellite01Icon } from "hugeicons-react";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const addedItem = useStore((state) => state.addedItem);
  const removeItem = useStore((state) => state.removeItem);
  const setTotalItem = useStore((state) => state.setTotalItem);
  const addItem = useStore((state) => state.addItem);
  const decreaseItem = useStore((state) => state.decreaseItem);
  const updateItemQuantity = useStore((state) => state.updateItemQuantity);
  const getTotalPrice = useStore((state) => state.getTotalPrice(state));

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

  function handleUpdateQuantity(itemId, newQuantity) {
    const number = parseInt(newQuantity || 1);
    updateItemQuantity(itemId, number);
  }

  function handleItemTotal(item) {
    return (item.price * item.quantity).toFixed(2);
  }

  if (addedItem.length === 0)
    return (
      <div className="mt-12 flex flex-col items-center gap-8">
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
    <div className="mt-10 mb-20">
      <h2 className="mb-15 text-2xl">Shoping cart</h2>

      {addedItem.map((item) => (
        <div
          key={item.id}
          className="mt-15 flex h-fit gap-8 border-b border-gray-400 pb-4"
        >
          <img
            src={item.image}
            alt=""
            key={item.id}
            className="aspect-square w-30 object-contain"
          />
          <p className="w-120 text-lg">
            {item.title.length > 51
              ? item.title.substring(0, 51) + "..."
              : item.title}
          </p>
          <div className="mr-10 flex gap-5">
            <button
              onClick={() => handleDecreateQuantity(item)}
              className="flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full text-center text-2xl hover:bg-gray-200"
            >
              <p className="mb-1.5 cursor-pointer text-4xl font-light">-</p>
            </button>
            <input
              type="text"
              min={0}
              value={item.quantity}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow positive numbers
                if (value === "" || /^\d+$/.test(value)) {
                  handleUpdateQuantity(item.id, value);
                }
              }}
              className="h-fit w-[4ch] p-2 text-center text-lg"
            />
            {/* make the input cannot type anything beside of number */}
            <button
              onClick={() => handleIncreaseQuantity(item)}
              className="flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full text-center text-2xl hover:bg-gray-200"
            >
              <p className="mb-1.5 cursor-pointer text-4xl font-light">+</p>
            </button>
          </div>
          <p className="mr-8 ml-auto text-lg">${handleItemTotal(item)}</p>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p2 h-fit cursor-pointer text-lg"
          >
            X
          </button>
        </div>
      ))}

      <div className="mt-8 ml-auto flex w-100 items-center justify-between">
        <p className="text-xl">Total</p>
        <p className="text-3xl">{getTotalPrice}</p>
      </div>
      <div className="ml-auto w-100">
        <Link
          to={"/checkout"}
          className="mt-6 block rounded-sm bg-gray-700 py-2 text-center text-2xl text-white hover:bg-gray-600"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

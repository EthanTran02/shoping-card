import { Satellite01Icon } from "hugeicons-react";
import useStore from "../stores/useStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const addedItem = useStore((state) => state.addedItem);
  const removeItem = useStore((state) => state.removeItem);
  const getTotalItem = useStore((state) => state.getTotalItem);
  const addItem = useStore((state) => state.addItem);
  const decreaseItem = useStore((state) => state.decreaseItem);
  const updateItemQuantity = useStore((state) => state.updateItemQuantity);
  const getTotalPrice = useStore((state) => state.getTotalPrice(state));
  const emptyCart = useStore((state) => state.emptyCart);

  function handleRemoveItem(id) {
    removeItem(id);
    getTotalItem();
  }

  function handleIncreaseQuantity(item) {
    addItem(item);
  }

  function handleDecreateQuantity(item) {
    if (item.quantity === 1) removeItem(item.id);

    decreaseItem(item);
  }

  function handleUpdateQuantity(itemId, newQuantity) {
    const number = parseInt(newQuantity || 1);
    updateItemQuantity(itemId, number);
  }

  function handleItemTotal(item) {
    return (item.price * item.quantity).toFixed(2);
  }

  function handleEmpty() {
    const isConfirm = confirm("are you sure to empty the Cart?");
    if (isConfirm) emptyCart();
  }

  if (addedItem.length === 0)
    return (
      <div className="mt-12 flex flex-col items-center gap-8">
        <h1 className="text-3xl">there is no item on the cart!</h1>
        <Link
          to={"/shop"}
          className="rounded-sm bg-gray-700 px-6 py-2 text-white"
        >
          Shopping now
        </Link>
      </div>
    );

  return (
    <div className="mt-10 mb-300 flex flex-col gap-8 px-2 sm:mt-16 sm:mb-32">
      <h2 className="mb-8 text-2xl sm:text-3xl">Shoping cart</h2>

      {addedItem.map((item) => (
        <div
          key={item.id}
          className="mt-8 flex flex-col items-center gap-6 border-b border-gray-400 pb-4 sm:flex-row sm:items-start sm:gap-8 md:gap-12"
        >
          <img
            src={item.image}
            alt={item.title}
            className="aspect-square w-32 max-w-full object-contain sm:w-28 md:w-32"
          />
          <p className="w-full text-lg sm:w-72 md:w-96">
            {item.title.length > 51
              ? item.title.substring(0, 51) + "..."
              : item.title}
          </p>
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => handleDecreateQuantity(item)}
              className="flex h-10 min-w-10 items-center justify-center rounded-full text-center text-2xl hover:bg-gray-200"
            >
              <p className="mb-1.5 text-4xl font-light">-</p>
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
              className="h-fit w-12 p-2 text-center text-lg sm:w-16"
            />
            <button
              onClick={() => handleIncreaseQuantity(item)}
              className="flex h-10 min-w-10 items-center justify-center rounded-full text-center text-2xl hover:bg-gray-200"
            >
              <p className="mb-1.5 text-4xl font-light">+</p>
            </button>
          </div>
          <p className="mr-0 ml-0 text-lg sm:mr-8 sm:ml-auto">
            ${handleItemTotal(item)}
          </p>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p2 h-fit cursor-pointer text-lg"
          >
            X
          </button>
        </div>
      ))}

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-0">
        <p
          onClick={handleEmpty}
          className="w-fit cursor-pointer rounded-sm px-4 py-2 text-sm font-semibold opacity-60 hover:bg-gray-200"
        >
          Empty cart
        </p>

        <div className="ml-0 flex w-full items-center justify-between sm:ml-auto sm:w-100">
          <p className="text-xl">Total</p>
          <p className="text-3xl">${getTotalPrice}</p>
        </div>
      </div>
      <div className="ml-0 w-full sm:ml-auto sm:w-100">
        <Link
          to={"/checkout"}
          className="mt-6 block rounded-sm bg-gray-700 py-3 text-center text-xl text-white hover:bg-gray-900"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

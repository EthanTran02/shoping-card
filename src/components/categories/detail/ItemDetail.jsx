import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import useStore from "../../../stores/useStore";
import { useState } from "react";
import { CheckmarkCircle02Icon } from "hugeicons-react";

export default function ItemDetail() {
  const { id } = useParams();
  const items = useOutletContext();
  const item = items.find((item) => item.id === parseInt(id));

  // const setTotalItem = useStore((state) => state.setTotalItem);
  const addItem = useStore((state) => state.addItem);
  // state of item quantity
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add to cart");
  const [isDisable, setDisable] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    // setTotalItem();
    setButtonText("Added");
    setDisable(true);
    setTimeout(() => {
      setButtonText("Add item");
      setDisable(false);
    }, 2000);
  };

  if (!item) return null;

  return (
    <div className="mt-10 mb-20 flex flex-col justify-center gap-10 px-4 sm:mt-20 sm:mb-32 sm:flex-row sm:gap-20 md:gap-40">
      <img
        className="mx-auto w-60 max-w-full object-contain sm:mx-0 sm:w-80 md:w-80"
        src={item.image}
        alt=""
      />
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 sm:mx-0">
        <h1 className="text-xl sm:text-2xl">{item.title}</h1>
        <p className="text-xl font-semibold text-blue-900 sm:text-2xl">
          ${item.price}
        </p>
        <p className="text-base sm:text-lg">{item.description}</p>

        <form
          className="flex flex-col gap-4 sm:flex-col sm:items-start sm:gap-4"
          onSubmit={handleAddToCart}
        >
          <div>
            <p className="mb-2 sm:mb-4">Quantity:</p>
            <input
              type="number"
              className="w-24 rounded-md border-gray-300 px-3 py-2.5 text-lg transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-28"
              value={quantity}
              min={1}
              onChange={(e) => {
                let value = e.target.value;
                if (value === "") {
                  setQuantity(1);
                  return;
                }
                // Convert to number and ensure it's not less than 1
                const number = Math.max(1, parseInt(value) || 1);
                setQuantity(number);
              }}
              onKeyPress={(e) => {
                // Prevent non-numeric input
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <button
            disabled={isDisable}
            type="submit"
            className={`relative mt-4 w-full rounded-md border-2 border-gray-700 px-5 py-3 transition-all duration-150 ${buttonText === "Added" ? "bg-white-600 text-gray-600" : "cursor-pointer bg-gray-700 text-white hover:bg-gray-600"}`}
          >
            {buttonText === "Added" && (
              <CheckmarkCircle02Icon className="absolute" color="gray-700" />
            )}
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

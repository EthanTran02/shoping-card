import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import useStore from "../../../stores/useStore";
import { useState } from "react";

export default function ItemDetail() {
  const { id } = useParams();
  const items = useOutletContext();
  const item = items.find((item) => item.id === parseInt(id));

  const setTotalItem = useStore((state) => state.setTotalItem);
  const addItem = useStore((state) => state.addItem);
  // state of item quantity
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (event) => {
    event.preventDefault();
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    setTotalItem();
  };

  if (!item) return null;

  return (
    <div className="mt-20 mb-50 flex gap-40">
      <img className="w-90 object-contain" src={item.image} alt="" />
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl">{item.title}</h1>
        <p className="text-2xl font-semibold text-blue-900">${item.price}</p>
        <p>{item.description}</p>

        <form className="flex flex-col" onSubmit={handleAddToCart}>
          <p className="mb-4">Quantity:</p>
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

          <button
            type="submit"
            className="mt-8 w-full rounded-xs bg-gray-700 px-4 py-4 text-white hover:bg-gray-900"
          >
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
}

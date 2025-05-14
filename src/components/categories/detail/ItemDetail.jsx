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
    <div className="mt-20 mb-15 flex gap-40">
      <img className="w-90 object-contain" src={item.image} alt="" />
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">{item.title}</h1>
        <p className="text-lg font-semibold text-blue-900">${item.price}</p>
        <p>{item.description}</p>

        <form className="flex flex-col" onSubmit={handleAddToCart}>
          <input
            type="number"
            className="w-30 rounded-xs border px-2 py-4 text-xl"
            defaultValue={1}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            type="submit"
            className="mt-8 w-40 rounded-xs bg-gray-700 px-4 py-4 text-white"
          >
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
}

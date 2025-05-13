import useStore from "../stores/useStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const addedItem = useStore((state) => state.addedItem);

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
      <h2 className="mb-10 text-2xl">Shoping cart</h2>

      {addedItem.map((item) => (
        <div className="mb-12 flex">
          <img
            src={item.image}
            alt=""
            key={item.id}
            className="aspect-square w-40 object-contain"
          />
          <p className="w-100">{item.title}</p>
          <input type="text" defaultValue={item.quantity} className="h-4 w-4" />
          <p>${item.price}</p>
          <p className="ml-8">X</p>
        </div>
      ))}
    </div>
  );
}

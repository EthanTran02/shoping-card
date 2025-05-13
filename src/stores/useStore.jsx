import { create } from "zustand";
import fetchItemsSlice from "./slices/fetchItemsSlice";
import cartSlice from "./slices/cartSlice";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      ...fetchItemsSlice(set),
      ...cartSlice(set),
    }),
    {
      name: "shoping-card",
    },
  ),
);

export default useStore;

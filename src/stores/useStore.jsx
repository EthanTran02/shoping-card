import { create } from "zustand";
import fetchItemsSlice from "./slices/fetchItemsSlice";
import cartSlice from "./slices/cartSlice";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      ...fetchItemsSlice(set, get),
      ...cartSlice(set, get),
    }),
    {
      name: "shoping-card",
    },
  ),
);

export default useStore;

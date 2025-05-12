import { create } from "zustand";
import fetchItemsSlice from "./slices/fetchItemsSlice";
import cartSlice from "./slices/cartSlice";

const useStore = create((set) => ({
  ...fetchItemsSlice(set),
  ...cartSlice(set),
}));

export default useStore;

import { create } from "zustand";
import fetchItems from "./slices/fetchItemsSlice";

const useStore = create((set) => ({
  ...fetchItems(set),
}));

export default useStore;

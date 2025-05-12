import { create } from "zustand";
import fetchItems from "./fetchItemsSlice";

const useStore = create((set) => ({
  ...fetchItems(set),
}));

export default useStore;

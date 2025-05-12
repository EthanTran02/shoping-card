import { Satellite01Icon } from "hugeicons-react";

const cartSlice = (set) => ({
  addedItem: [],
  addItem: (itemToAdd) =>
    set((state) => ({
      addedItem: [...state.addedItem, { item: itemToAdd, count: 1 }],
    })),
});

export default cartSlice;

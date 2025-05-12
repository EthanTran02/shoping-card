const cartSlice = (set) => ({
  addedItem: [],
  addItem: (itemToAdd) => set(() => ({ addedItem: itemToAdd, count: 0 })),
});

export default cartSlice;

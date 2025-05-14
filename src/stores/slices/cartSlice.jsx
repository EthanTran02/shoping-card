const cartSlice = (set) => ({
  addedItem: [],
  totalItem: 0,

  // ---------- Action ----------

  // Add item
  addItem: (itemToAdd) =>
    set((state) => {
      const existingItemIndex = state.addedItem.findIndex(
        (item) => item.id === itemToAdd.id,
      );

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedCart = state.addedItem.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 } // Increment quantity
            : item,
        );
        return { addedItem: updatedCart };
      } else {
        // Item is new, add it with quantity 1
        return {
          addedItem: [...state.addedItem, { ...itemToAdd, quantity: 1 }],
        };
      }
    }),

  // Decrease Item
  decreaseItem: (itemToDecrease) =>
    set((state) => {
      const existingItemIndex = state.addedItem.findIndex(
        (item) => item.id === itemToDecrease.id,
      );

      if (
        existingItemIndex > -1 &&
        state.addedItem[existingItemIndex].quantity > 1
      ) {
        // Item already exists, update quantity
        const updatedCart = state.addedItem.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
        return { addedItem: updatedCart };
      } else {
        return {
          state,
        };
      }
    }),

  // Remove
  removeItem: (itemId) =>
    set((state) => {
      const afterRemoveItem = state.addedItem.filter(
        (item) => item.id !== itemId,
      );
      return { addedItem: [...afterRemoveItem] };
    }),

  // get the total of item
  setTotalItem: () =>
    set((state) => {
      return { totalItem: state.addedItem.length };
    }),
});

export default cartSlice;

// keep working on the store for added Item

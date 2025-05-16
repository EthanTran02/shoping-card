const cartSlice = (set) => ({
  addedItem: [],

  // ---------- Action ----------

  // Add item & increase quantity
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
        return {};
      }
    }),

  // Update item's quantity (for input)
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      addedItem: state.addedItem.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    })),

  // Remove Item
  removeItem: (itemId) =>
    set((state) => {
      const afterRemoveItem = state.addedItem.filter(
        (item) => item.id !== itemId,
      );
      return { addedItem: [...afterRemoveItem] };
    }),

  // get the total number of item
  getTotalItem: (state) => state.addedItem.length,

  // get the total price of all item
  getTotalPrice: (state) => {
    let total = 0;

    state.addedItem.map((item) => {
      total += item.price * item.quantity;
    });

    return total.toFixed(2);
  },

  // clear all item
  emptyCart: () => set({ addedItem: [] }),
});

export default cartSlice;

// keep working on the store for added Item

const fetchItems = (set) => ({
  items: [],
  loading: null,
  error: null,
  fetchItems: async () => {
    set({ loading: true });
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      set({ items: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
});

export default fetchItems;

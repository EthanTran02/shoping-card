import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Shop uses <Link> and <Outlet>
import Shop from "../components/Shop";
import useStore from "../stores/useStore"; // This will be mocked

// 1. Mock the ShopLoading component
vi.mock("../components/loading skeleton/ShopLoading", () => ({
  default: () => <div>Mocked ShopLoading...</div>,
}));

// 2. Mock react-router-dom's Outlet (and other parts if necessary)
// Shop component renders <Outlet />, so we need a mock for it.
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual to preserve Link, etc.
  return {
    ...actual,
    Outlet: () => <div data-testid="mocked-outlet">Mocked Outlet Content</div>,
  };
});

// 3. Mock the useStore hook from Zustand
vi.mock("../stores/useStore");

describe("Shop Component", () => {
  let mockFetchItems; // Declare here to be accessible in all tests

  beforeEach(() => {
    // Create a fresh mock for fetchItems before each test
    mockFetchItems = vi.fn();

    // Default mock implementation for useStore, can be overridden in specific tests
    useStore.mockImplementation((selector) =>
      selector({
        items: [],
        loading: true, // Default to loading true, items empty
        error: null,
        fetchItems: mockFetchItems,
      }),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Helper to render the component within MemoryRouter
  const renderShop = () => {
    return render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>,
    );
  };

  it("displays loading state and calls fetchItems when loading is true and items are empty", () => {
    // This test relies on the default beforeEach mock: items: [], loading: true
    renderShop();

    // Check for loading component
    expect(screen.getByText("Mocked ShopLoading...")).toBeInTheDocument();
    // fetchItems should be called because items are empty (items.length === 0)
    expect(mockFetchItems).toHaveBeenCalledTimes(1);

    // Ensure main content is not shown
    expect(screen.queryByRole("link", { name: "All" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("mocked-outlet")).not.toBeInTheDocument();
  });

  it("displays category navigation and outlet when data is loaded successfully (and does not fetch if items exist)", () => {
    // mockFetchItems is already a vi.fn() from beforeEach
    const mockItemsData = [
      { id: 1, category: "men's clothing", title: "Test Item Men" },
    ];
    // Override useStore mock for this specific test case (successful load with items)
    useStore.mockImplementation((selector) =>
      selector({
        items: mockItemsData, // Items are already present
        loading: false,
        error: null,
        fetchItems: mockFetchItems,
      }),
    );

    renderShop();

    // fetchItems should NOT be called because items are already present (items.length > 0)
    expect(mockFetchItems).not.toHaveBeenCalled();

    expect(screen.queryByText("Mocked ShopLoading...")).not.toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByRole("link", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Men" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Women" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Jewelery" })).toBeInTheDocument();

    // Check for the mocked Outlet
    expect(screen.getByTestId("mocked-outlet")).toBeInTheDocument();
  });

  it("displays error message if fetching items results in an error state", () => {
    const errorMessage = "Failed to fetch items";
    // Override useStore mock for this specific test case (error state)
    // fetchItems mock is from beforeEach
    useStore.mockImplementation((selector) =>
      selector({
        items: [], // Items are empty
        loading: false, // Loading is done
        error: errorMessage,
        fetchItems: mockFetchItems,
      }),
    );

    renderShop();

    // fetchItems should have been called because items were initially empty
    expect(mockFetchItems).toHaveBeenCalledTimes(1);

    expect(screen.queryByText("Mocked ShopLoading...")).not.toBeInTheDocument();

    // Check for the error message
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    expect(screen.queryByRole("link", { name: "All" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("mocked-outlet")).not.toBeInTheDocument();
  });
});

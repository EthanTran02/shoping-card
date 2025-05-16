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
  let mockFetchItems;

  beforeEach(() => {
    // Create a fresh mock for fetchItems before each test
    mockFetchItems = vi.fn();

    useStore.mockImplementation((selector) =>
      selector({
        items: [],
        loading: true,
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

  it("displays loading state and calls fetchItems when loading is true", () => {
    renderShop();

    // Check for loading component
    expect(screen.getByText("Mocked ShopLoading...")).toBeInTheDocument();
    expect(mockFetchItems).toHaveBeenCalledTimes(1);

    // Ensure main content is not shown
    expect(screen.queryByRole("link", { name: "All" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("mocked-outlet")).not.toBeInTheDocument();
  });

  it("displays category navigation and outlet when data is loaded successfully", () => {
    const mockItemsData = [
      { id: 1, category: "men's clothing", title: "Test Item Men" },
    ];
    // Override useStore mock for this specific test case (successful load)
    useStore.mockImplementation((selector) =>
      selector({
        items: mockItemsData,
        loading: false,
        error: null,
        fetchItems: mockFetchItems,
      }),
    );

    renderShop();

    expect(mockFetchItems).toHaveBeenCalledTimes(1);

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
    useStore.mockImplementation((selector) =>
      selector({
        items: [],
        loading: false, // Loading is done
        error: errorMessage,
        fetchItems: mockFetchItems,
      }),
    );

    renderShop();

    expect(mockFetchItems).toHaveBeenCalledTimes(1);

    expect(screen.queryByText("Mocked ShopLoading...")).not.toBeInTheDocument();

    // Check for the error message
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    expect(screen.queryByRole("link", { name: "All" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("mocked-outlet")).not.toBeInTheDocument();
  });
});

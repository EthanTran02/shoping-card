import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react"; // Import act for state updates outside userEvent/render
import { describe, expect, it, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Root from "../components/Root";
import useStore from "../stores/useStore"; // Import your Zustand store

describe("Root Component", () => {
  // Helper function to render Root with MemoryRouter
  const renderRoot = () => {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
      </MemoryRouter>,
    );
  };

  // Reset the store's state before each test to ensure isolation
  const originalState = useStore.getState();
  beforeEach(() => {
    useStore.setState(
      {
        ...originalState, // keep other parts of state like items, loading, error
        addedItem: [], // reset cart
      },
      true,
    );
  });

  it("Nav bar shows up with logo, navigation links, and initial cart count", () => {
    renderRoot();
    expect(screen.getByText("Glow")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    // Initial cart count is 0
    expect(
      screen.getByText("0", { selector: "p.absolute" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "0" })).toBeInTheDocument();
  });

  it("Footer shows up with GitHub link", () => {
    renderRoot();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  });

  it("updates cart item count in navbar when an item is added to the store", async () => {
    renderRoot();

    // 1. Check initial count
    expect(
      screen.getByText("0", { selector: "p.absolute" }),
    ).toBeInTheDocument();

    // 2. Adding item
    act(() => {
      useStore
        .getState()
        .addItem({ id: 1, title: "Test Item", price: 10, image: "test.jpg" });
    });

    // 3. After add item
    await waitFor(() => {
      expect(
        screen.getByText("1", { selector: "p.absolute" }),
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();

    // add another item
    act(() => {
      useStore.getState().addItem({
        id: 2,
        title: "Another Test Item",
        price: 20,
        image: "test2.jpg",
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("2", { selector: "p.absolute" }),
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
  });
});

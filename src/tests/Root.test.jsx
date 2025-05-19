import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Root from "../components/Root";
import useStore from "../stores/useStore";

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
    act(() => {
      // Ensure state updates are wrapped in act if they cause re-renders
      useStore.setState(
        {
          ...originalState, // keep other parts of state like items, loading, error
          addedItem: [], // reset cart
        },
        true,
      );
    });
  });

  it("Nav bar shows up with logo, navigation links, and initial cart count", () => {
    renderRoot();
    expect(screen.getByText("Glow")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();

    expect(
      screen.queryByText(/\d+/, { selector: "p.absolute" }),
    ).not.toBeInTheDocument();

    // Check that the cart link itself exists (e.g., by finding the link that navigates to /cart)
    const cartLinks = screen.getAllByRole("link");
    const cartPageLink = cartLinks.find(
      (link) => link.getAttribute("href") === "/cart",
    );
    expect(cartPageLink).toBeInTheDocument();

    // Check for an SVG element within the cart link, assuming ShoppingCart01Icon renders an <svg>.
    const svgIcon = cartPageLink.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });

  it("Footer shows up with GitHub link", () => {
    renderRoot();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  });

  it("updates cart item count in navbar when an item is added to the store", async () => {
    renderRoot();

    // 1. Check initial count (bubble should not be present)
    expect(
      screen.queryByText(/\d+/, { selector: "p.absolute" }),
    ).not.toBeInTheDocument();

    // 2. Adding item
    act(() => {
      useStore
        .getState()
        .addItem({ id: 1, title: "Test Item", price: 10, image: "test.jpg" });
    });

    // 3. After add item (count should be 1)
    await waitFor(() => {
      expect(
        screen.getByText("1", { selector: "p.absolute" }),
      ).toBeInTheDocument();
    });
    // The link's accessible name should now be "1" because "1" is rendered inside it
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

    // Count should be 2
    await waitFor(() => {
      expect(
        screen.getByText("2", { selector: "p.absolute" }),
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
  });
});

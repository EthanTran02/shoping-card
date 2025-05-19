import { render, screen, act, within } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Cart from "../components/Cart";
import useStore from "../stores/useStore";

// A mock item for testing
const mockItem = {
  id: 1,
  title: "Test Product",
  price: 25.5,
  image: "test.jpg",
  quantity: 1,
};

describe("Cart Component", () => {
  const originalState = useStore.getState();

  beforeEach(() => {
    act(() => {
      useStore.setState(
        {
          ...originalState,
          addedItem: [],
        },
        true,
      );
    });
  });

  it("shows an empty cart message when no items are present", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("there is no item on the cart!"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /shopping now/i }),
    ).toBeInTheDocument();
  });

  it("displays an item correctly when it's in the cart", () => {
    act(() => {
      // When adding item, cartSlice will ensure it has quantity: 1 if new
      useStore.getState().addItem({
        id: mockItem.id,
        title: mockItem.title,
        price: mockItem.price,
        image: mockItem.image,
      });
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const itemTitleElement = screen.getByText(mockItem.title);
    // The parentElement of the title <p> tag is the item row <div>
    const itemRow = itemTitleElement.parentElement;
    expect(itemRow).toBeInTheDocument();

    // Check for item title within the row
    expect(within(itemRow).getByText(mockItem.title)).toBeInTheDocument();
    // Check for item image within the row
    expect(within(itemRow).getByRole("img")).toHaveAttribute(
      "src",
      mockItem.image,
    );
    // Check for quantity input within the row (cartSlice adds with quantity 1)
    expect(
      within(itemRow).getByDisplayValue("1"), // Initial quantity from store is 1
    ).toBeInTheDocument();
    // Check for item total price *within the row* (price * quantity 1)
    expect(
      within(itemRow).getByText(`$${mockItem.price.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("calculates and displays the cart's total price correctly for one item", () => {
    act(() => {
      useStore.getState().addItem({
        id: mockItem.id,
        title: mockItem.title,
        price: mockItem.price,
        image: mockItem.image,
      }); // Will be added with quantity 1
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const expectedTotalPrice = mockItem.price.toFixed(2);
    // This is the specific check for the *cart's total price*
    const totalLabel = screen.getByText("Total");
    expect(totalLabel.nextElementSibling.textContent).toBe(
      `$${expectedTotalPrice}`,
    );
  });

  it("calculates and displays the cart's total price correctly for multiple items", () => {
    const item1 = {
      id: 1,
      title: "Test Product 1",
      price: 25.5,
      image: "test1.jpg",
    };
    const item2 = {
      id: 2,
      title: "Another Product 2",
      price: 10.0,
      image: "test2.jpg",
    };
    act(() => {
      useStore.getState().addItem(item1); // price 25.50, quantity 1
      useStore.getState().addItem(item2); // price 10.00, quantity 1
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const expectedTotalPrice = (item1.price + item2.price).toFixed(2); // 25.50 + 10.00 = 35.50
    const totalLabel = screen.getByText("Total");
    expect(totalLabel.nextElementSibling.textContent).toBe(
      `$${expectedTotalPrice}`,
    );
  });
});

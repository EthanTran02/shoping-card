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
          setTotalItem: () => {},
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
      useStore.getState().addItem(mockItem);
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const itemTitleElement = screen.getByText(mockItem.title);
    const itemRow = itemTitleElement.closest("div.flex.h-fit.gap-8");
    expect(itemRow).toBeInTheDocument();

    // Check for item title within the row
    expect(within(itemRow).getByText(mockItem.title)).toBeInTheDocument();
    // Check for item image within the row
    expect(within(itemRow).getByRole("img")).toHaveAttribute(
      "src",
      mockItem.image,
    );
    // Check for quantity input within the row
    expect(
      within(itemRow).getByDisplayValue(mockItem.quantity.toString()),
    ).toBeInTheDocument();
    // Check for item total price *within the row*
    expect(
      within(itemRow).getByText(`$${mockItem.price.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("calculates and displays the cart's total price correctly for one item", () => {
    act(() => {
      useStore.getState().addItem(mockItem);
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
    const mockItem2 = {
      id: 2,
      title: "Another Product",
      price: 10.0,
      image: "test2.jpg",
    };
    act(() => {
      useStore.getState().addItem(mockItem); // price 25.50
      useStore.getState().addItem(mockItem2); // price 10.00
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const expectedTotalPrice = (mockItem.price + mockItem2.price).toFixed(2); // 25.50 + 10.00 = 35.50
    const totalLabel = screen.getByText("Total");
    expect(totalLabel.nextElementSibling.textContent).toBe(
      `$${expectedTotalPrice}`,
    );
  });
});

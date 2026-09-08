"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "../src/app/redux/store";
import { hydrateCart } from "../src/app/redux/cart-slice";

function CartPersistence() {
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("evinn-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          store.dispatch(hydrateCart(parsedCart));
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }

    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();

        localStorage.setItem(
          "evinn-cart",
          JSON.stringify(state.cart.items),
        );
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  );
}
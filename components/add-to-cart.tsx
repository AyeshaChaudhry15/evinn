
"use client";

import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cart-slice";
import type { AppDispatch } from "@/app/redux/store";

interface AddToCartButtonProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    image: string;
  };
  children?: ReactNode;
  className?: string;
}

export default function AddToCartButton({
  product,
  children = "Add to Cart",
  className = "",
}: AddToCartButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart(product));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}


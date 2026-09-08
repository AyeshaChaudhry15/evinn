
"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../src/app/redux/cart-slice";

interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );

    alert(`${product.name} added to cart`);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="rounded-lg bg-[#8FDF0D] px-5 py-3 font-semibold text-black transition hover:opacity-90"
    >
      Add to Cart
    </button>
  );
};

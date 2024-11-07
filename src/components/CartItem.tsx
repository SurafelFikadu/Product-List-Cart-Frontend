import { CartContextProps, ProductItem } from "../libs/types";
import IconRemove from "../assets/images/icon-remove-item.svg";
import { useContext } from "react";
import CartContext from "../CartContext";

interface CartItemProps {
  product: ProductItem;
}

const CartItem = ({ product }: CartItemProps) => {
  const totalPricePerProduct = product.price * product.quantity!;
  const { removeFromCart } = useContext(CartContext) as CartContextProps;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="mb-2 font-500">{product.name}</h4>

        <div className="flex items-center gap-4">
          <span className="font-500 text-primary-red">{product.quantity}x</span>

          <div className="flex gap-2">
            @{" "}
            <p className="text-rose-400">
              {product.price.toLocaleString("en-us", {
                style: "currency",
                currency: "usd",
              })}
            </p>
            <p className="font-500 text-rose-500">
              {totalPricePerProduct.toLocaleString("en-us", {
                style: "currency",
                currency: "usd",
              })}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(product.id)}
        className="flex size-[20px] items-center justify-center rounded-full border border-rose-400 text-center"
      >
        <img className="size-[10px]" src={IconRemove} alt="Remove Icon" />
      </button>
    </div>
  );
};

export default CartItem;

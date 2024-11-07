import { CartContextProps, ProductItem } from "../libs/types";
import CartIcon from "../assets/images/icon-add-to-cart.svg";
import IconDecrement from "../assets/images/icon-decrement-quantity.svg";
import IconIncrement from "../assets/images/icon-increment-quantity.svg";
import { useContext, useEffect, useState } from "react";
import CartContext from "../CartContext";

interface ProductListingProps {
  product: ProductItem;
}

const ProductListing = ({ product }: ProductListingProps) => {
  const { id, name, category, price, image } = product;
  const {
    products,
    addToCart,
    reduceCartQuantity,
    isItemInCart,
    removeFromCart,
  } = useContext(CartContext) as CartContextProps;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartProduct = products.find((product) => product.id === id);
    if (cartProduct) {
      setQuantity(cartProduct.quantity!);
    }
  }, [products, id]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    addToCart(id, name, price, image);
  };

  const reduceQuantity = () => {
    if (quantity > 1) {
      reduceCartQuantity(id);
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      removeFromCart(id);
      setQuantity(0);
    }
  };

  return (
    <div className="[&:not(:last-child)]:mb-8">
      <div className="relative mb-4">
        <img
          className={`rounded-md ${isItemInCart(id) ? "border-2 border-primary-red" : ""}`}
          src={image}
          alt={name}
        />

        {!isItemInCart(id) ? (
          <button
            onClick={() => addToCart(id, name, price, image)}
            className="border-text-rose-500 group absolute bottom-[-1rem] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-rose-50 px-4 py-2 transition-colors duration-300 hover:border-primary-red lg:w-[150px]"
          >
            <img src={CartIcon} alt="Add to cart" />
            <span className="font-500 text-rose-900 transition-colors duration-300 group-hover:text-primary-red">
              Add to cart
            </span>
          </button>
        ) : (
          <div className="absolute bottom-[-1rem] left-1/2 flex w-1/2 -translate-x-1/2 items-center justify-between gap-2 rounded-full bg-primary-red px-4 py-2 text-white lg:w-[170px]">
            <button
              onClick={reduceQuantity}
              className="flex size-[20px] items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white"
            >
              <img src={IconDecrement} alt="icon-decrement" />
            </button>

            <p>{quantity}</p>

            <button
              onClick={increaseQuantity}
              className="flex size-[20px] items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white"
            >
              <img src={IconIncrement} alt="icon-increment" />
            </button>
          </div>
        )}
      </div>

      <div className="lg:mt-8">
        <p className="text-rose-500">{category}</p>
        <h3 className="text-200 font-700 text-rose-900">{name}</h3>
        <p className="font-500 text-primary-red">
          {price.toLocaleString("en-us", {
            style: "currency",
            currency: "usd",
          })}
        </p>
      </div>
    </div>
  );
};

export default ProductListing;

import CartItem from "./CartItem";
import EmptyCartImage from "../assets/images/illustration-empty-cart.svg";
import CarbonNeutral from "../assets/images/icon-carbon-neutral.svg";
import PayButton from "./PayButton";
import { useContext } from "react";
import CartContext from "../CartContext";
import { CartContextProps } from "../libs/types";

const CartList = () => {
  const { products } = useContext(CartContext) as CartContextProps;
  const cartNotEmpty = products.length !== 0;

  const calculateSubTotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      subtotal += product.price * product.quantity!;
    });

    return subtotal;
  };

  const quantityCalculate = () => {
    let subTotal = 0;

    products.forEach((product) => {
      subTotal += product.quantity!;
    });

    return subTotal;
  };

  return (
    <div className="mt-12 rounded-lg bg-white p-4 lg:h-fit">
      <h4 className="mb-6 text-400 font-700 text-primary-red">
        Your Cart is ({quantityCalculate()})
      </h4>

      {cartNotEmpty ? (
        products.map((product) => (
          <div
            key={product.id}
            className="border-b border-b-rose-300 py-4 first-of-type:pt-0"
          >
            <CartItem product={product} />
          </div>
        ))
      ) : (
        <div>
          <img className="mx-auto" src={EmptyCartImage} alt="Empty Cart" />
          <p className="mt-6 text-center font-500 text-rose-500">
            Your added items will appear here
          </p>
        </div>
      )}

      {cartNotEmpty && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p>Order Total</p>
            <span className="lg:text-500S text-300 font-700 text-rose-900">
              {calculateSubTotal().toLocaleString("en-us", {
                style: "currency",
                currency: "usd",
              })}
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-rose-50 py-4">
            <img src={CarbonNeutral} alt="Carbon neutral" />
            <p>
              This is a{" "}
              <span className="font-500 text-rose-900">carbon neutral</span>{" "}
              delivery
            </p>
          </div>
          <PayButton products={products} />
        </div>
      )}
    </div>
  );
};

export default CartList;

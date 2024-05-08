import { useContext } from "react";
import useHttp from "../hooks/useHTTP";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/cartContext";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCheckout() {
    userProgressCtx.hideCheckOut();
  }
  function handleFinish(){
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    return actions = <span>Sending Order Data...</span>;
  }
  if (data && !error) {
    return (<Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <h2>Success</h2>
      <p>Your Order was Submitted Successfully</p>
      <p>
        You will Receive a mail with your Order Details and Tracking Details
      </p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
    )
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total Amount: {cartTotal}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title={"failed to send Data"} message={error}></Error>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

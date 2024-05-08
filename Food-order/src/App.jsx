import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { CartContextProvider } from "./store/cartContext";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

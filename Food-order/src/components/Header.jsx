import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import UserProgressContext from '../store/UserProgressContext';
import CartContext from '../store/cartContext';
import Button from './UI/Button';

export default function Header(){

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item ) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleShowCart(){
        userProgressCtx.showCart();
    }
    return(
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt='restaurant' />
                <h1>Fancy Restaurant</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
            </nav>
        </header>
    )
}
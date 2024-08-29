import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const { token } = useContext(UserContext);
    const [cartItems, setCartItems] = useState(0);
    const [cartOwner, setCartOwner] = useState(null);

    // Function to get user cart
    async function getUserCart() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: token,
                },
            });
            return response.data;
        } catch (err) {

            return { status: "error" };
        }
    }

    // Function to add item to cart
    async function addItemToCart(id) {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                { productId: id },
                { headers: { token } }
            );
            await getCart();
            return response.data;
        } catch (err) {

            return { status: "error" };
        }
    }

    // Function to update item count
    async function updateItemCount(id, count) {
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count },
                { headers: { token } }
            );
            await getCart();
            return response.data;
        } catch (err) {

            return { status: "error" };
        }
    }

    // Function to remove item from cart
    async function removeItem(id) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { headers: { token } }
            );
            await getCart();
            return response.data;
        } catch (err) {

            return { status: "error" };
        }
    }

    // Function to create checkout session
    async function checkOutSession(cartId, shippingAddress) {
        const baseUrl = 'http://localhost:5173';
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
                { shippingAddress },
                { headers: { token } }
            );
            return response.data;
        } catch (err) {

            return { status: "error" };
        }
    }

    // Function to get user orders
    async function getUserOrders() {
        if (!cartOwner) return { status: "error", message: "No cart owner" };

        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner.id}`, {
                headers: { token }
            });
            return response.data;
        } catch (err) {

            return { status: "error" };
        }
    }

    // Fetch cart and set cart owner
    async function getCart() {
        const response = await getUserCart();
        if (response.status === "success") {
            setCartItems(response.numOfCartItems);
        }
    }

    // Update cart owner and cart when token changes
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                setCartOwner(decodedToken);
                getCart();
            } catch (error) {

                setCartOwner(null);
            }
        } else {
            setCartOwner(null);
            setCartItems(0);
        }
    }, [token]);

    return (
        <CartContext.Provider value={{
            getUserOrders,
            cartItems,
            setCartItems,
            getUserCart,
            addItemToCart,
            updateItemCount,
            removeItem,
            checkOutSession
        }}>
            {children}
        </CartContext.Provider>
    );
}

// src/components/AddToCartButton/AddToCartButton.jsx
import React, { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CartContext } from '../Components/Context/CartContext';
import toast from 'react-hot-toast';

const AddToCartButton = ({ itemId, withTransition = true, customClassName = '' }) => {
    const { addItemToCart } = useContext(CartContext);

    // Function to handle adding item to cart
    const addToCart = async (id) => {
        try {
            const response = await addItemToCart(id);
            return response;
        } catch (error) {
            throw new Error('Failed to add item to cart');
        }
    };

    const mutation = useMutation({
        mutationFn: addToCart, // API call to add item to cart
        onSuccess: () => {
            toast.success("Item Added Successfully to Cart ", {
                duration: 5000,
                style : {
                    backgroundColor: 'green',
                    color: 'white',
                },
                position: 'top-right'
            })
        },
        onError: (error) => {
            console.error('Failed to add item to cart.', error);
        },
    });

    return (
        <button
            className={`w-full   ${withTransition ? 'transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full' : ''} bg-green-500 text-white py-2 rounded-md ${mutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${customClassName}`}
            onClick={(e) => {
                e.stopPropagation();
                if (!mutation.isLoading) {
                    mutation.mutate(itemId); // Trigger the mutation
                }
            }}
        >
            {mutation.isLoading ? 'Adding...' : 'Add To Cart'}
        </button>
    );
};

// Exporting three versions of the button
export const AddToCartButtonWithTransition = (props) => (
    <AddToCartButton {...props} withTransition={true} />
);

export const AddToCartButtonWithoutTransition = (props) => (
    <AddToCartButton {...props} withTransition={false} />
);

export const AddToCartButtonStyled = (props) => (
    <AddToCartButton {...props} withTransition={false} customClassName="w-1/4 ml-5 py-2 px-4 border border-green-500 text-green-500 rounded" />
);

import React, { useContext, useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaSpinner } from "react-icons/fa6";
import axios from 'axios';
import { UserContext } from '../Components/Context/UserContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Function to fetch the entire wishlist
const fetchWishlist = async (token) => {
    try {
        const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers: {
                    token: token,
                },
            }
        );
        return response.data.data || [];
    } catch (error) {
        return [];
    }
};

function WishlistButton({ productId }) {
    const { token } = useContext(UserContext);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Query to fetch the entire wishlist
    const { data: wishlist = [], error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => fetchWishlist(token),
        staleTime: 300000,
        cacheTime: 600000,
        enabled: !!token,
        onSuccess: (data) => {
            setIsInWishlist(data.some(item => item._id === productId));
        },
        onError: (error) => {
            alert('Error fetching wishlist:', error);
        }
    });

    useEffect(() => {
        setIsInWishlist(wishlist.some(item => item._id === productId));
    }, [wishlist, productId]);

    // Mutation to add/remove product from the wishlist
    const mutation = useMutation({
        mutationFn: async () => {
            setIsLoading(true); // Start the loading spinner
            const url = `https://ecommerce.routemisr.com/api/v1/wishlist`;
            try {
                let response;
                if (isInWishlist) {
                    const deleteUrl = `${url}/${productId}`;
                    response = await axios.delete(deleteUrl, {
                        headers: { token },
                    });
                    toast.success("Item Removed Successfully from WhishList ", {
                        duration: 5000,
                        style : {
                            backgroundColor: green,
                            color: white,
                        },
                        position: 'top-right'
                    })
                } else {
                    response = await axios.post(url, { productId }, {
                        headers: { token },
                    });
                    toast.success("Item Added Successfully to Whishlist ", {
                        duration: 5000,
                        style : {
                            backgroundColor: 'green',
                            color: 'white',
                        },
                        position: 'top-right'
                    })
                }
                setIsInWishlist(!isInWishlist);

                return response.data.data;
            } catch (error) {
                alert(`Failed to update wishlist: ${error.response?.data?.message || error.message}`);
            } finally {
                setIsLoading(false); // Stop the loading spinner
            }
        }
    });

    if (error) return <p>Error: {error.message}</p>;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                mutation.mutate();
            }}
            className="ms-5 text-2xl"
            disabled={isLoading} // Disable the button during loading
        >
            {isLoading ? (
                <FaSpinner className='animate-spin' />
            ) : (
                <FaHeart color={isInWishlist ? 'red' : 'gray'} />
            )}
        </button>
    );
}


export default WishlistButton;

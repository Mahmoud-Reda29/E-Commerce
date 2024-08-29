import React, { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { UserContext } from '../Context/UserContext';
import { FaTrash } from "react-icons/fa6";
import { AddToCartButtonStyled, AddToCartButtonWithoutTransition } from '../../utilities/AddToCartButton';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { data: wishlistItems, isLoading, isError, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token },
      });

      return response.data.data;
    },
    staleTime: 20 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center font-bold">
        Error loading wishlist: {error.message}
      </div>
    );
  }

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token },
      });
      queryClient.invalidateQueries(['wishlist']);
      toast.success("Item Removed Successfully ", {
        duration: 4000,
        style : {
            backgroundColor: 'green',
            color: 'white',
        },
        position: 'top-right'
    })
    } catch (err) {
      alert('Failed to remove item:', err);
    }
  };

  return (
    <div className='py-16'>
      <div className="container mx-auto my-10 py-10 bg-gray-100 dark:bg-gray-700">
        <h2 className="text-3xl font-bold mb-5 text-green-500">My Wish List</h2>
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div
              key={item._id} // Use _id to match the remove function
              className="flex items-center justify-between py-5 border-b border-gray-200"
            >
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-28 h-28 object-cover"
              />
              <div className="ml-5 flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-green-500">{item.price} EGP</p>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 mt-2"
                >
                  <FaTrash className="inline-block align-middle" /> Remove
                </button>
              </div>
              {/* <button
                className="ml-5 py-2 px-4 border border-green-500 text-green-500 rounded"
              >
                Add To Cart
              </button> */}
              {/* <AddToCartButton itemId= {product._id}/> */}
              <AddToCartButtonStyled itemId={item._id} />
            </div>
          ))
        ) : (
          null
        )}
      </div>
    </div>

  );
};

export default Wishlist;

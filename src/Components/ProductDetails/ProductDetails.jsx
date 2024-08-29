import React, { useEffect } from 'react';
import styles from './ProductDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { FaStar } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import WishlistButton from '../../utilities/WishlistButton';
import { AddToCartButtonWithoutTransition } from '../../utilities/AddToCartButton';

function ProductDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Query to fetch product details
  const { data: product, isLoading, error, isError } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      return response.data.data;
    },
    staleTime: 20 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Invalidate wishlist query on mount
  useEffect(() => {
    const invalidateWishlist = () => {
      queryClient.invalidateQueries('wishlist');
    };

    invalidateWishlist(); // Invalidate on component mount

    return () => {
      // Optional: Invalidate on component unmount or when navigating away
      invalidateWishlist();
    };
  }, [queryClient]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className='grid sm:grid-cols-12 py-28'>
      <div className='col-span-4'>
        <img className='w-full' src={product.imageCover} alt={product.title} />
      </div>
      <div className='col-span-8 self-center px-10'>
        <p className='text-sm text-green-500 my-2'>{product.category?.name}</p>
        <h3 className="text-green-500 my-3">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
        <p className="line-clamp-3 mb-3">{product.description}</p>
        <div className='flex justify-between pt-1 mb-5'>
          <p>{product.price} Egy</p>
          <p className='flex align-middle'>
            <span className='mt-1 me-2'>{product.ratingsAverage}</span>
            <FaStar className='text-yellow-400 self-center mt-1' />
          </p>
        </div>
        <div className='flex justify-between mb-3'>
          {/* <button className="w-full bg-green-500 text-white py-2 rounded-md">
            Add To Cart
          </button> */}
          {/* <AddToCartButton itemId= {product._id}/> */}
          <AddToCartButtonWithoutTransition itemId={product._id} />
          <WishlistButton productId={product._id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

import React, { useEffect } from 'react';
import styles from './Products.module.css';
import Loading from '../Loading/Loading';
import useProducts from '../../Hooks/useProducts';
import ProductItem from '../ProductItem/ProductItem';
import { useQueryClient } from '@tanstack/react-query';

function Products() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, error, isError } = useProducts();
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
    return <div className="text-red-500 text-center font-bold">Error loading products: {error.message}</div>;
  }



  return (
    <div className="grid my-10 pt-5 gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductItem product={p} key={p._id} />
      ))}
    </div>
  );
}

export default Products;

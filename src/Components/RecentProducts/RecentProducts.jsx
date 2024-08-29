import React, { useEffect } from 'react';
import Products from '../Products/Products';
import { useQueryClient } from '@tanstack/react-query';

function RecentProducts() {

  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate wishlist query on component mount
    queryClient.invalidateQueries('wishlist');

    // Optional cleanup: Invalidate on component unmount or when navigating away
    return () => {
      queryClient.invalidateQueries('wishlist');
    };
  }, [queryClient]);

  return (
    <Products />
  );
}

export default RecentProducts;

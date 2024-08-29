import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function useProducts() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      return response.data.data;
    },
    staleTime: 20 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return query;
}

export default useProducts;

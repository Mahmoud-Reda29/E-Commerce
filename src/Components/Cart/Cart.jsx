import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import CartItem from '../CartItem/CartItem';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Cart() {
  const { getUserCart, updateItemCount, removeItem, cartItems  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getUserLoggedCart() {
    setLoading(true); // Start loading spinner when fetching cart
    try {
      const response = await getUserCart();
      if (response.status === "success") {
        setCartDetails(response.data);
      } else {
        setError('Failed to fetch cart details.');
      }
    } catch (err) {
      setError('An error occurred while fetching cart details.');
    } finally {
      setLoading(false); // Stop loading spinner once done
    }
  }

  async function updateQuantity(id, count) {
    setLoading(true); // Start loading spinner when updating quantity
    try {
      const response = await updateItemCount(id, count);
      if (response.status === "success") {
        setCartDetails(response.data);
        toast.success("Quantity Updated Successfully", {
          duration: 2000,
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
          position: 'top-right'
        });
      } else {
        setError('Failed to update item quantity.');
      }
    } catch (err) {
      setError('An error occurred while updating item quantity.');
    } finally {
      setLoading(false); // Stop loading spinner once done
    }
  }

  async function deleteItem(id) {
    setLoading(true); // Start loading spinner when deleting item
    try {
      const response = await removeItem(id);
      if (response.status === "success") {
        setCartDetails(response.data);
        toast.success("Item Removed Successfully", {
          duration: 2000,
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
          position: 'top-right'
        });
      } else {
        setError('Failed to remove item.');
      }
    } catch (err) {
      setError('An error occurred while removing the item.');
    } finally {
      setLoading(false); // Stop loading spinner once done
    }
  }

  useEffect(() => {
    getUserLoggedCart(); // Fetch cart details on component mount
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <div className='py-24'>
        <h2 className="text-3xl text-center text-green-500 font-bold mb-5">Cart Shop</h2>
        <div className='flex justify-between items-center mb-5'>
          <p className='text-2xl text-green-500'>Total Price: ${cartDetails?.totalCartPrice}</p>
          <button className='bg-green-500 rounded-lg py-2 px-4 text-white'>
            <FaTrash className='inline-block' /> Clear Cart
          </button>
        </div>
        <div className="relative overflow-x-auto mb-10 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.products?.map((product) => (
                <CartItem
                  key={product.product._id} // Ensure each item has a unique key
                  item={product.product}
                  count={product.count}
                  price={product.price}
                  updateQuantity={updateQuantity}
                  deleteItem={deleteItem}
                />
              ))}
            </tbody>
          </table>
        </div>
        {cartItems && cartItems > 0 ? (
          <Link to={`/checkout/${cartDetails?._id}`} className='bg-green-500 rounded-lg py-2 px-4 text-white'>CheckOut</Link>
        ) : (
          <button className='bg-gray-400 rounded-lg py-2 px-4 text-white cursor-not-allowed' disabled>CheckOut</button>
        )}
      </div>
    </>
  );
}

export default Cart;

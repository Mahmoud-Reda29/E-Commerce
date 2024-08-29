import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Loading from '../Loading/Loading';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal'; // Assuming you have this modal component

function AllOrders() {
  const { getUserOrders, cartOwner } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // For tracking the selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility

  async function getUserLoggedOrders() {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserOrders();
      setOrders(response); // Ensure orders is an array
    } catch (err) {
      setError('An error occurred while fetching order details.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserLoggedOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500">No orders found.</p>; // Handle case when no orders are available
  }

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My Orders</h2>
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6">
                  {/* Render order details here */}
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="hover:underline">#{order.id}</a>
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Total Price:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.totalOrderPrice} EGY</dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={order.isPaid ? 'M5 11.917 9.724 16.5 19 7.5' : 'M6 18 17.94 6M18 18 6.06 6'} />
                      </svg>
                      {order.isPaid ? 'Paid' : 'Cancelled'}
                    </dd>
                  </dl>
                  <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for displaying order details */}
      {isModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          closeModal={closeModal}
        />
      )}
    </section>
  );
}

export default AllOrders;

import React from 'react';

function OrderDetailsModal({ order, closeModal }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-lg font-bold mb-4">Order #{order.id} Details</h3>

        <div className="mb-4">
          <h4 className="font-semibold">Shipping Address:</h4>
          <p>{order.shippingAddress.details}</p>
          <p>{order.shippingAddress.city}</p>
          <p>{order.shippingAddress.phone}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Cart Items:</h4>
          <ul>
            {order.cartItems.map(item => (
              <li key={item._id}>
                {item.product.title} - {item.count} x {item.price} EGY
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={closeModal}
          className="mt-4 inline-flex justify-center rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsModal;

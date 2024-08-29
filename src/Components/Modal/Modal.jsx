import React from 'react';
import { IoClose } from 'react-icons/io5';

function Modal({ isOpen, onClose, brand }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>
        <div className="p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-500 mb-2">{brand.name.toUpperCase()}</h2>
          <img className="w-1/2 h-auto object-contain mb-4" src={brand.image} alt={brand.name} />
          <p className="text-gray-700 text-lg">{brand.name.toLowerCase()}</p>
        </div>
        <div className="p-4 bg-gray-100 text-right rounded-b-lg">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

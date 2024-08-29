import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error,setError]=useState('')

  const getAllBrands = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      setError(error)
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const openModal = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  if (brands.length === 0) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10">
      <h3 className="text-green-500 text-center text-2xl font-bold col-span-full">All Brands</h3>
      {brands.map((brand) => (
        <div
          key={brand._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-500 hover:border-green-500 hover:shadow-[0px_0px_15px_2px_rgba(0,128,0,0.4)] dark:hover:border-green-500 dark:hover:shadow-[0px_0px_15px_2px_rgba(0,128,0,0.4)]"
          onClick={() => openModal(brand)}
        >
          <img className="rounded-t-lg h-[300px] w-full object-contain" src={brand.image} alt={brand.name} />
          <div className="p-5 text-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{brand.name}</h5>
          </div>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} brand={selectedBrand} />
    </div>
  );
}

export default Brands;

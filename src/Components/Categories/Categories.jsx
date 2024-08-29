import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [SubCatofCat, setSubcatofcat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('')

  // Scroll when loading is false and SubCatofCat is updated
  useEffect(() => {
    if (!loading && SubCatofCat.length > 0) {
      document.getElementById('subcategories').scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, SubCatofCat]);

  const getSubCatofCat = async (id, name) => {
    setLoading(true);
    setCategoryName(name);
    setTimeout(async () => {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
        setSubcatofcat(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || error.message || error);
      }
    }, 2000);
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data?.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message || error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (categories.length === 0) {
    return <Loading />;
  }

  return (
    <>
      {loading && <Loading />}
      <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 ${loading ? 'opacity-50' : ''}`}>
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => getSubCatofCat(cat._id, cat.name)}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-500 hover:border-green-500 hover:shadow-[0px_0px_15px_2px_rgba(0,128,0,0.4)] dark:bg-gray-800 dark:border-gray-700 dark:hover:border-green-500 dark:hover:shadow-[0px_0px_15px_2px_rgba(0,128,0,0.4)]"
          >
            <a href="#">
              <img className="rounded-t-lg h-[300px] w-full object-cover" src={cat.image} alt={cat.name} />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cat.name}</h5>
            </div>
          </div>
        ))}
      </div>
      {SubCatofCat.length > 0 && (
        <>
          <div className='py-10'>
            <h4 id="subcategories" className="text-3xl font-bold mt-5 text-center text-green-500">
              {categoryName} Subcategories
            </h4>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
              {SubCatofCat.map((subCat) => (
                <div
                  key={subCat._id}
                  className="p-5 text-center border border-gray-200 rounded-lg shadow-lg transition-all duration-500 hover:border-green-500 hover:shadow-[0px_0px_15px_2px_rgba(0,128,0,0.4)] dark:border-gray-700 dark:hover:border-green-500 dark:hover:shadow-[0px_0px_15px_2px_rgba(0,128,0,0.4)] dark:bg-gray-800"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{subCat.name}</h5>
                </div>

              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Categories;

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  async function Submit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      if (data.token !== null) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrMessage(error.response.data.message || 'An error occurred during the request.');
      } else {
        setErrMessage('Network error or server is unreachable.');
      }
    } finally {
      setIsLoading(false);
    }
  }
  const Schema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is not valid'),
    newPassword: Yup.string()
      .required('Password is required')
      .matches(
        /^[A-Z].{5,}/,
        'Password must be at least 5 characters long'
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: (values) => Submit(values),
    validationSchema: Schema,
  });
  return (
    <>
      <div className='py-32'>
        <h2 className="text-green-600">Set New Password</h2>
        {errMessage && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errMessage}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...formik.getFieldProps('email')}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium mb-3 absolute text-sm text-gray-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              {...formik.getFieldProps('newPassword')}
              type={showPassword ? 'text' : 'password'} // Toggle input type based on state
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium mb-3 absolute text-sm text-gray-500 dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            <button
              type="button"
              className="absolute top-3 right-0 dark:text-slate-200 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-300 disabled:text-blue-950 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  )
}

export default ResetPassword

import React, { useEffect } from 'react'
import styles from './LayOut.module.css'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
function LayOut() {
  return (
    <>
      <div className='dark:bg-gray-950 dark:text-white'>
        <Navbar />
        <div className="container mx-auto max-w-screen-xl ">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LayOut

import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

import styles from './CategorySlider.module.css'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { NextArrow, PrevArrow } from '../../utilities/Arrows';
function CategorySlider() {
  const [error, setError] = useState('')
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [categories, setCategories] = useState([])
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data?.data)
    } catch (error) {
      setError(error)
    }
  }
  useEffect(() => {

    getAllCategories()
  }, [])
  if(categories.length == 0){
    return <Loading />
  }
  return (
    <Slider {...settings} className='my-5'>
      {categories.map(cat=><>
      <div className='slider-container' key={cat.id}>
        <img className='h-[200px] w-full object-cover' src={cat.image} alt="" />
        <h3 className='text-sm text-green-500'>{cat.name}</h3>
      </div>
      </>)}
    </Slider>
  );
}

export default CategorySlider

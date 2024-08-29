import React, { useEffect } from 'react';
import { MainNextArrow, MainPrevArrow } from '../../utilities/Arrows';
import Slider from 'react-slick';

function MainSlider() {
  const staticimgs = Object.values(
    import.meta.glob('../../assets/images/staticimgs/*.{png,jpg,jpeg,PNG,JPEG}', {
      eager: true,
      as: 'url',
    })
  );
  const sliderimgs = Object.values(
    import.meta.glob('../../assets/images/slider/*.{png,jpg,jpeg,PNG,JPEG}', {
      eager: true,
      as: 'url',
    })
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <MainNextArrow />,
    prevArrow: <MainPrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Large tablets and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // Medium tablets and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          autoplay: true, // Autoplay on small screens
          autoplaySpeed: 3000, // 3 seconds per slide
        },
      },
      {
        breakpoint: 480, // Small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true, // Show arrows on very small screens
          autoplay: true, // Autoplay on small screens
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-10">
      <div className="sm:col-span-8 md:col-span-8">
        <Slider {...settings} className="my-5">
          {sliderimgs.map((img, index) => (
            <div key={index} className="slider-container">
              <img
                className="h-[350px] w-full object-contain md:h-[300px] sm:h-[250px]"
                src={img}
                alt={`slider-img-${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5 sm:col-span-4 md:col-span-4">
        {staticimgs.map((img, index) => (
          <img
            key={index}
            className="w-full h-auto object-cover"
            src={img}
            alt={`static-img-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MainSlider;

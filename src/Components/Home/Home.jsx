import React, { useContext, useEffect } from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import { useQueryClient } from '@tanstack/react-query';
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

function Home() {

  const {token} = useContext(UserContext)
  const {getUserCart} = useContext(CartContext)

  useEffect(() => {
    getUserCart();
}, [token]);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}

export default Home;

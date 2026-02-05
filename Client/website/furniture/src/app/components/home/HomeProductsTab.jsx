"use client";
import { useState } from "react";
import { getProductsByType} from "@/app/apiServices/homeServices";
import ProductCard from "@/app/common/ProductCard";
import { useSelector } from "react-redux";


export default function HomeProductsTab({ productsData}) {

//  let cart = useSelector((myStore)=>myStore.myCart.cartItems)

 

  const [products, setProducts] = useState(productsData.datas || []);
  const imgPath =productsData.imgPath;

  const handleCategory = async (category) => {
    let data = await getProductsByType(category);
    setProducts(data.datas || []);
  };

  


  return (
    <div className="pt-[50px]">
      <div className="">
        <div className="flex justify-center">
          <button className="btn p-3 border-1 border-[#EBEBEB] font-bold hover:border-[#C09578]  hover:text-[#C09578]"

            onClick={() => handleCategory("Featured")}

          >Featured</button>

          <button className="btn p-3 border-1 border-[#EBEBEB] font-bold hover:border-[#C09578] hover:text-[#C09578]"

            onClick={() => handleCategory("New Arrivals")}

          >New Arrivals</button>

          <button className="btn p-3 border-1 border-[#EBEBEB] font-bold hover:border-[#C09578] hover:text-[#C09578] "
            onClick={() => handleCategory("Onsale")}

          >Onsale</button>

        </div>
      </div>

      <div className="max-w-[1120px] mx-auto grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-7 py-[30px] shadow-lg">
        {products.map((item, index) => (
          <ProductCard data={item} key={index} imgPath={imgPath}/>
        ))}
      </div>
    </div>
  )
}



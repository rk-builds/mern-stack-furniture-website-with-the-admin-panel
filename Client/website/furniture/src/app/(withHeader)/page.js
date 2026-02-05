import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBanner from "../components/home/HomeBanner";
import HomeCollection from "../components/home/HomeCollection";
import HomeProductsTab from "../components/home/HomeProductsTab";
import { bannerApi, getProductsByType, BestSellingProductData, getTestimonials } from "../apiServices/homeServices";
import HomeNewTrendBanner from "../components/home/HomeNewTrendBanner";
import HomeBestSelling from "../components/home/HomeBestSelling";
import HomeStoreFeatures from "../components/home/HomeStoreFeatures";
import HomeCustomerReview from "../components/home/HomeCustomerReview";
import HomeNewsLetter from "../components/home/HomeNewsLetter";

export default async function Home() {
   
  
  // let productsData = await homeFeaturedProduct()
  // console.log(productsData)
  
  let BestSellingData = await BestSellingProductData()
  // console.log(BestSellingData);

  let sliderImages = await bannerApi()
  // console.log(sliderImages);

   let productByType = await getProductsByType('Featured')

   let Reviews = await getTestimonials()
  
  console.log("REVIEWS API RESULT 👉", Reviews);
  
  return (
    <>
    <HomeBanner sliderData={sliderImages}/>
    <HomeCollection/>
    <HomeProductsTab productsData={productByType}/> 
    <HomeNewTrendBanner />
    <HomeBestSelling BestSellingData={BestSellingData}/> 
    <HomeStoreFeatures />
    <HomeCustomerReview cust_review={Reviews}/>
    <HomeNewsLetter/>

    </>
  );
}

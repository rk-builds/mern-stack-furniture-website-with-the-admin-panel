import axios  from "axios"
let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

// let homeFeaturedProduct=(catName='smartphones')=>{
//       return axios.get(`https://dummyjson.com/products/category/${catName}`)
//      .then(res => res.data)
//      .then((finalRes)=>finalRes.products); //Promise

// }

// let homeBestSellingProduct=( catName='home-decoration')=>{
//       return axios.get(`https://dummyjson.com/products/category/${catName}`)
//      .then(res => res.data)
//      .then((finalRes)=>finalRes.products); //Promise
      
      
// }



let bannerApi = async () => {
    let res = await fetch(`${apiBaseUrl}home/slider`, { cache: "no-store" })
    return await res.json()
}

// product type [featured , new arrivals , onsale]

export const getProductsByType = async (type) => {
  const res = await fetch(
    `${apiBaseUrl}home/homepage-product?type=${type}`,
    { cache: "no-store" }
  );
  return res.json();
};

//best selling products
export const BestSellingProductData = async()=>{
  const res = await fetch(`${apiBaseUrl}home/homepage-product`,
 { cache: "no-store" });
 return res.json();
}

// testimonial 

export const getTestimonials = async()=>{
  const res = await fetch(`${apiBaseUrl}home/reviews`,
 { cache: "no-store" });
 return res.json();
}








export {homeFeaturedProduct,BestSellingProductData,bannerApi,getProductsByType}



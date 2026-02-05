import axios from "axios";

let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

export const getProducts = async (filters = {}) => {
  const res = await axios.post(
    'http://localhost:8000/admin/product/user-product-view',
    {
      subCat: filters.subCat,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      page: filters.page || 1
    }
  );

  console.log('all products =>', res.data);
  return res.data;
};



let getSingleProduct=(slug)=>{
  return axios.get(`${apiBaseUrl}product/product-details/${slug}`)
  .then((res)=> res.data)
  .then((finalRes)=>finalRes)

}

// Parent categories
  const fetchParents = async () => {
    const res = await axios.get(`http://localhost:8000/admin/product/parent-category`)
    .then((res)=> res.data)
    .then((finalRes)=>finalRes.CatParentRes)
    // console.log(res)
    return res;
  };

  // Sub categories
  // const fetchSubs = async (parentId) => {
  //   const res = await axios.get(`http://localhost:8000/admin/product/sub-category/${parentId}`);
  //   setSubs(res.data.subCatParentRes);
  //   setSubSubs([]);
  // };

  




export {getProducts,getSingleProduct,fetchParents};
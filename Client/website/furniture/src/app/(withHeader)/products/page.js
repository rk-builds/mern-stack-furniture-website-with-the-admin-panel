import { fetchParents } from '@/app/apiServices/productServices'
import Breadcrumb from '@/app/common/Breadcrumb'
import ProductWrapper from './ProductWrapper'

export const metadata = {
  title: "Products",
  description: "About our products",
};

export const dynamic = "force-dynamic";

export default async function Product() {
  let parent = await fetchParents();

  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="max-w-[1320px] mt-[50px] mx-auto">
        <ProductWrapper parents={parent} />
      </div>
    </>
  );
}

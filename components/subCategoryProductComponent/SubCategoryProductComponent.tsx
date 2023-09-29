"use client"
import React,{useState,useEffect} from 'react'
import { fetchCategoryProducts } from "../../utils/databaseService";
import { useQuery } from "@tanstack/react-query";
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import FlatIcon from '../flatIcon/flatIcon';

const SubCategoryProductComponent = ({params}) => {
  const [hoveredProduct, setHoveredProduct] = useState("");

    const { data: categoryProducts } = useQuery({
        queryKey: ["category-product", params?.slug],
        queryFn: () => fetchCategoryProducts(params?.slug,"category"),
      });
      // console.log(params,"SubCategoryProductComponent ");
      console.log(categoryProducts,"category ");
      console.log(params?.slug,"category");
      
      
  return (
    <div className='px-body'>
          <div className="w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid gap-y-6 gap-x-6  my-5">

      { categoryProducts&& categoryProducts.length>0&& categoryProducts.map((item:any,idx:number)=>{
        //  <Link href={`/categry/${product?.slug?.name}`}>
        return <Link href={`/category/${params?.slug}/sub-category-product/${item?.slug?.name} `} key={idx}>
      <div
        className={`flex flex-col  relative   bordered-shape overflow-hidden `}
        // key={product?.id || idx || Math.random().toString()}
        // onMouseEnter={() => {
        //   setHoveredProduct(product?.id);
        // }}
        // onMouseLeave={() => {
        //   setHoveredProduct("");
        // }}
      >
        {/* <div className=" white-triangle flex justify-center items-center">
          <div
            className={` green-triangle  border  ${
              hoveredProduct === product?.id
                ? "border-secondary"
                : "border-primary"
            }  ${
              hoveredProduct === product?.id ? "bg-secondary" : "bg-primary"
            }`}
          ></div>
        </div> */}
        <div className="border-[1px] border-secondary p-2 product-card ">
          <div className=" relative  mb-2">
            <div className="h-[250px] relative ">
              <Image
                src={item?.image?.url}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-fit"
              />
              <div className="bg-primary absolute top-[8px] left-[8px]">
                <div className="flex gap-1 text-[10px] text-white px-2.5 py-1">
                  {" "}
                  <p>15%</p>
                  <p>OFF</p>
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 w-full h-[45px] bg-primary flex items-center `}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 w-full">
                  <h2>Add To Bag</h2>
                  <div>
                    <FlatIcon className="flaticon-bag-fill text-xl" />
                  </div>
                </div>
              </div>
              {/* <div
                className={`absolute right-[15px] top-[20px] ${
                  hoveredProduct === product?.id ? "visible" : "invisible"
                } flex flex-col gap-y-2 items-center`}
              >
                <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                  <FlatIcon
                    icon={
                      "flaticon-heart text-secondary font-normal text-base rounded-full text-secondary "
                    }
                  />
                </div>
                <div className=" w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                  <FlatIcon
                    className={"flaticon-search  text-lg text-secondary"}
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex  overflow-hidden truncate w-full text-sm font-medium text-primary capitalize mb-3">
            <h2 className="">{item.name}</h2>
          </div>
          {/* <div className="flex    w-full text-sm font-semibold mb-3 ">
            <h2 className="">Calcium Magnesium Zinc </h2>
          </div> */}
          {/* <div className="flex items-center gap-4">
            <div className="text-ellipsis overflow-hidden ... truncate text-center ">
              <p className="text-ellipsis overflow-hidden ... truncate text-center  text-primary font-bold text-lg">
                {constant?.currency} {product?.discountedPrice?.toFixed(2)}
              </p>
            </div>
            {checkIfPriceDiscounted({
              discountedPrice: product?.discountedPrice,
              price: product?.prodPrice,
            }) && (
              <div className="text-ellipsis overflow-hidden ... truncate text-center ">
                <p className="text-ellipsis overflow-hidden ... truncate text-center  line-through text-sm text-gray-500 font-semibold">
                  {constant.currency} {product?.prodPrice}
                </p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </Link>




        // old 
      //   <Link href={`/category/${params?.slug}/sub-category-product/${item?.slug?.name} `} key={idx}>
      //   <div className=' text-center border-[1px] border-[#D2D2D2]  rounded-br-3xl '>
      //     {/* <div><Image src={item.image.url} alt=''/></div> */}
      //     <div className="h-[100px] lg:h-[200px]    rounded-br-3xl  ">
      //   <Image
      //     src={item?.image?.url}
      //     alt=""
      //     width={1000}
      //     height={1000}
      //     className="w-full h-full object-fit  rounded-br-3xl "
      //   />
      // </div>
      //     <p className='my-2 text-ellipsis overflow-hidden ... truncate text-center   text-base font-bold '>{item.name}</p>
      //   </div>
      //    </Link>



      

      })}
      </div>
    </div>
  )
}

export default SubCategoryProductComponent

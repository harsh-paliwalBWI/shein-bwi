export const checkIfPriceDiscounted = ({ discountedPrice, price }) => {
    if (discountedPrice < price) {
        return true
    }
    return false
}

export const getDiscountedPercentage = ({ price, discountedPrice }: any) => {
    return `${Math.ceil(((price - discountedPrice) / price) * 100)}%`
};


export const initialAddress = {
    address: "",
    city: "",
    lat: 0,
    lng: 0,
    name: "",
    phoneNo: "",
    pincode: "",
    state: "",
    stateCode: "",
    defaultAddress: true,
    country: "",
};

export const paymentMethods = [
    {
        name: "Cash on Delivery", value: "cod"
    },
];


export function getProductPriceDetails({ isDiscounted = false, product, currRate = 1, index }) {
    if (product?.isPriceList) {
        if (isDiscounted) {
            return (product?.priceList[index]?.discountedPrice * currRate)?.toFixed(2)
        } else {
            return (product?.priceList[index]?.price * currRate)?.toFixed(2)
        }
    } else {
        if (isDiscounted) {
            return (product?.discountedPrice * currRate)?.toFixed(2)
        } else {
            return (product?.prodPrice * currRate)?.toFixed(2)
        }
    }
}

export const tabs = ["Shipping", "Payment", "Review"];

export function checkIfItemExistInCart(cart, product, index = 0) {
    if (product?.isPriceList) {
        return cart?.filter((item) => item?.productId === product?.id && item?.description === product.priceList[index].weight)
            .length !== 0;
    } else {

        return cart?.filter((item) => item?.productId === product?.id)
            .length !== 0;
    }
}

export function getProductIndexFromCart(cart, product) {
    return cart.findIndex((item) => item?.productId === product?.id);
}

export function getProductFromCart(cart, product) {
    return cart?.filter((item) => item?.productId === product?.id)
        .length !== 0 ? cart?.filter((item) => item?.productId === product?.id)[0] : null;
}

export function getFilteredProducts({ filters, products }) {
    // console.log("filters",filters);
    
    let newArr = products || []
    if (filters.price !== null && products && products?.length !== 0) {
        // console.log("inside if");
        
        newArr = products.filter((e) => e?.discountedPrice >= filters.price[0] && e?.discountedPrice <= filters?.price[1])
    }
// console.log("newArr",newArr);

    return newArr
}


export const getOtherFilteredProducts = async ({ filters, products, otherFilters }: { filters: any, products: any, otherFilters: any }) => {
    let newProducts = getFilteredProducts({ filters, products });
    console.log("products from getOtherFilteredProducts", newProducts);
    console.log("otherFilters getOtherFilteredProducts", otherFilters);
    // for (const [filterName, values] of Object.entries(otherFilters)) {
    //     console.log(filterName,values);
    //     let tempFilterProds: any = {};
    //     if (values && (values as any[]).length) {
    //         console.log("inside if values");
    //         console.log("newProducts",newProducts);
    //         (values as any[]).forEach((value: any) => {
    //             console.log("inside for each");
    //             console.log("tempFilterProds",tempFilterProds);
    //             console.log("newProducts",newProducts);
    //             Object.assign(tempFilterProds, newProducts.reduce((tempProdObj, prodData) => {
    //                 console.log("inside reduce");
    //                 const { filters, id } = prodData;
    //                 if (id && filters && filters[filterName] && filters[filterName].length && filters[filterName].includes(value)) {
    //                     console.log("filter name",filters[filterName]);
                        
    //                     tempProdObj[id] = prodData;
    //                 }else{
    //                     console.log("inside else");
                        
    //                 }
    //                 return tempProdObj;
    //             }, {}));
    //         });
    //     newProducts = Object.values(tempFilterProds);

    //     }
    //     // newProducts = Object.values(tempFilterProds);
    // }
    // for (const [filterName, values] of Object.entries(otherFilters)) {
    //     if (values && (values as any[]).length) {
    //         newProducts = newProducts.filter((prodData) => {
    //             const { filters }: { filters?: Record<string, string[]> } = prodData;
    //             return filters && filters[filterName] && filters[filterName].some((filterValue:any) => values.includes(filterValue));
    //         });
    //     }
    // }
    for (const [filterName, values] of Object.entries(otherFilters)) {
        if (values && Array.isArray(values) &&values.length&& values.every((val) => typeof val === 'string')) {
            newProducts = newProducts.filter((prodData) => {
                const { filters }: { filters?: Record<string, string[]> } = prodData;
// if(!filters[filterName]){
//     return true
// }
                return filters && filters[filterName] && (filters[filterName] as string[]).some((filterValue) => values.includes(filterValue));
            });
        }
        // console.log("newProducts",newProducts);
    }
    // console.log("newProducts",newProducts);
    
    return await newProducts;
}

// export const getOtherFilteredProducts = async ({ filters, products, otherFilters }: { filters: any, products: any, otherFilters: any }) => {
//     let newProducts = getFilteredProducts({ filters, products });
//     console.log("products from getOtherFilteredProducts", products);
//     console.log("otherFilters getOtherFilteredProducts", otherFilters);

//     for (const [filterName, values] of Object.entries(otherFilters)) {
//         console.log("filterName:", filterName, "values:", values);

//         let tempFilterProds: any = {};
//         if (values && Array.isArray(values)) {
//             console.log("inside if values");

//             values.forEach((value: any) => {
//                 console.log("inside forEach, value:", value);

//                 Object.assign(tempFilterProds, newProducts.reduce((tempProdObj, prodData) => {
//                     console.log("inside reduce");
                    
//                     const { filters, id } = prodData;
//                     if (id && filters && filters[filterName] && Array.isArray(filters[filterName]) && filters[filterName].includes(value)) {
//                         console.log("filter name", filters[filterName]);
//                         tempProdObj[id] = prodData;
//                     } else {
//                         console.log("inside else");
//                     }
//                     return tempProdObj;
//                 }, {}));
//             });
//         }
//         newProducts = Object.values(tempFilterProds);
//     }
//     console.log("newProducts", newProducts);

//     return newProducts;
// }


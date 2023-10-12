export const checkIfPriceDiscounted = ({ discountedPrice, price }) => {
    if (discountedPrice < price) {
        return true
    }
    return false
}

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

export const tabs = ["Shipping", "Payment", "Review"];

export function checkIfItemExistInCart(cart, product) {
    return cart?.filter((item) => item?.productId === product?.id)
        .length !== 0;
}

export function getProductIndexFromCart(cart, product) {
    return cart.findIndex((item) => item?.productId === product?.id);
}

export function getProductFromCart(cart, product) {
    return cart?.filter((item) => item?.productId === product?.id)
        .length !== 0 ? cart?.filter((item) => item?.productId === product?.id)[0] : null;
}
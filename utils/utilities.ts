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


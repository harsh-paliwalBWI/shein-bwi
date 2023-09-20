import { doc, getDoc } from "firebase/firestore";
import { encodeURL } from "../parseUrl";
import { auth, db } from "../../config/firebase-config";

async function bannerLink(bannerData: any) {
    console.log('bannerData', bannerData);
    if (bannerData.hasOwnProperty('link')) {
        const userId = auth.currentUser?.uid;
        const linkType = bannerData.link.type;
        const id = 'ids' in bannerData.link ? bannerData.link.ids : (typeof bannerData.link.id === 'string' ? [bannerData.link.id] : bannerData.link.id);
        const name = bannerData.link.name || '';
        const idLength = id.length;

        if (linkType === "Product") {
            if (idLength > 1) {
                return { isMultiple: true, path: `/taggedItems`, ids: id, type: linkType }
            } else {
                return { isMultiple: false, path: `/product/${bannerData?.link?.id}`, ids: id }
            }
        }

        if (linkType === "Category") {
            if (idLength > 1) {
                return { isMultiple: true, path: `/taggedItems`, ids: id, type: linkType }
            } else {
                const categoryData = (await getDoc(doc(db, "categories", bannerData?.link?.id))).data();
                if (categoryData) {
                    return { isMultiple: false, path: `/category-product/${categoryData?.slug?.name}`, ids: id }
                }
                return null;
            }
        }
    }
}


export { bannerLink }
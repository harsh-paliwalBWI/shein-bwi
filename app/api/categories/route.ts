import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { NextResponse } from "next/server";

export const GET = async (request) => {

    const fetchCategories = async () => {
        const querySnapshot = await getDocs(query(collection(db, "categories"), where('status', '==', true), orderBy('sortedAt', 'desc')));
        let categories: any = [];


        for (const doc of querySnapshot.docs) {
            let value = doc.data();
            let subcategories = null;
            if (value?.isSubcategories) {
                subcategories = await fetchSubCategories(doc.id)
            }
            categories?.push({
                category: { ...value, id: doc.id },
                subcategories
            })
        }
        return JSON.parse(JSON.stringify(categories));

    }

    async function fetchSubCategories(catId) {
        return new Promise(async (resolve) => {

            const querySnapshot = query(collection(db, `categories/${catId}/subcategories`), where('status', '==', true));
            const res = await getDocs(querySnapshot);
            if (res.docs) {
                let arr = [];
                for (const sub of res.docs) {
                    arr.push({ ...sub?.data(), id: sub?.id })
                }

                resolve(arr);
            }
            return resolve(null);
        })
    }



    const response = await fetchCategories();
    return NextResponse.json(response);
} 
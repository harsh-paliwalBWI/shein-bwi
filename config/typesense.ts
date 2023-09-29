
// const typesenseCred = {
//     apiKey: `${process.env.NEXT_PUBLIC_TYPESENSE_API}`,
//     searchOnlyKey: "CONM3gS3uAJTm8XBg1wzjjfKZGv7tVOd",
//     host: "xtz3coih7u9w0qejp-1.a1.typesense.net",
//     port: 443,
//     protocol: "https"
// }

// old code start
// import { doc, getDoc } from "firebase/firestore";
// import { app, db, firebaseConfig } from "./firebase-config";


// export function typesense_initClient() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const env = (await getDoc(doc(db, 'settings', 'environment'))).data();
//             const Typesense = require('typesense');
//             let typesenseClient = new Typesense.Client({
//                 'nodes': [{
//                     'host': env?.typesense?.host,
//                     'port': env?.typesense?.port,
//                     'protocol': env?.typesense?.protocol
//                 }],
//                 'apiKey': env?.typesense?.searchOnlyKey,
//                 'connectionTimeoutSeconds': 2
//             });
//             resolve(typesenseClient);
//         } catch (error) {
//             console.log('error in initialising typesense client');
//             resolve(null);
//         }
//     })
// }

// export async function handleTypesenseSearch(query) {
//     const client: any = await typesense_initClient();
//     if (client) {
//         const searchParameters = {
//             q: query,
//             query_by: 'prodName, searchKeywords',
//         };
//         let projectId = firebaseConfig?.projectId;
//         try {
//             const data = await client
//                 .collections(`${projectId}-products`)
//                 .documents()
//                 .search(searchParameters);

//             if (data && data?.hits) {                
//                 let arr = [];
//                 for (const prod of data?.hits) {
//                     arr.push(prod?.document)
//                 }
//                 return arr;
//             }
//             return data;
//         } catch (error) {
//             console.log(error, "error ISIDE CATCH");
//             return [];
//         }
//     }

// }

// old code end 


// new code start 
// const typesenseCred = {
//     apiKey: `${process.env.NEXT_PUBLIC_TYPESENSE_API}`,
//     searchOnlyKey: "CONM3gS3uAJTm8XBg1wzjjfKZGv7tVOd",
//     host: "xtz3coih7u9w0qejp-1.a1.typesense.net",
//     port: 443,
//     protocol: "https"
// }

import { doc, getDoc } from "firebase/firestore";
import { app, db, firebaseConfig } from "./firebase-config";

export function typesense_initClient() {
    return new Promise(async (resolve, reject) => {
        try {
            const env = (await getDoc(doc(db, 'settings', 'environment'))).data();
            // console.log(env?.typesense,"env");
            
            const Typesense = require('typesense');
            let typesenseClient = new Typesense.Client({
                'nodes': [{
                    'host': env?.typesense?.host,
                    'port': env?.typesense?.port,
                    'protocol': env?.typesense?.protocol
                }],
                'apiKey': env?.typesense?.searchOnlyKey,
                'connectionTimeoutSeconds': 2
            });
            resolve(typesenseClient);
        } catch (error) {
            console.log('error in initialising typesense client');
            resolve(null);
        }
    })
}

export async function handleTypesenseSearch(query) {
    console.log(query,"quert");
    
    const client: any = await typesense_initClient();
    if (client) {
        console.log("if");
        const searchParameters = {
            q: query,
            query_by: 'prodName, searchKeywords',
        };
        let projectId = firebaseConfig?.projectId;
        try {
            console.log("inside try");
            
            const data = await client
                .collections(`${projectId}-products`)
                .documents()
                .search(searchParameters);

                console.log(data,"from data var --------->");
                
            if (data && data?.hits) {
                console.log( "inside if");
                let arr = [];
                for (const prod of data?.hits) {
                    console.log("hii");
                    console.log(prod , "inside for of  loop");
                    
                    arr.push(prod?.document)
                }
            console.log(arr,"arrr");

                return arr;
            }
            
            return data;
        } catch (error) {
            console.log(error, "error ISIDE CATCH");
            return [];
        }
    }

}

function parseArrayOfObjects(object) {
    for (const key in object) {
        try {
            const value = JSON.parse(object[key]);
            if ((Array.isArray(value) && value.length && typeof value[0] == 'object') || (Array.isArray(value) && !value.length)) {
                object[key] = value;
            }
        } catch (error) {

        }
    }
    return object;
}


export async function fetchSimilarProductsForCart({ cart = null, searchKeywords = null }) {
    let keyWords = [];

    if (searchKeywords === null) {
        if (cart && cart.length > 0) {
            console.log('CHECK');

            for (const cartItem of cart) {
                console.log(cartItem);

                if (cartItem?.keywords) {
                    cartItem.keywords.forEach((keyword) => {
                        if (!keyWords.includes(keyword)) {

                            keyWords.push(keyword)
                        }
                    });
                }
            }
        }
    } else {
        keyWords = searchKeywords;
        // console.log(keyWords,"keyWords");
        
    }
    const client: any = await typesense_initClient();
    if (client) {
        const searchParameters = {
            q: '*',
            query_by: 'prodName, searchKeywords',
            filter_by: `searchKeywords:=[${keyWords}]`
        };
        let projectId = firebaseConfig?.projectId;
        try {
            const data = await client
                .collections(`${projectId}-products`)
                .documents()
                .search(searchParameters);
            if (data && data?.hits) {
                let arr = [];
                for (const prod of data?.hits) {
                    let priceList = [];
                    if (prod?.document?.priceList && prod?.document?.priceList?.length > 2) {
                        priceList = JSON.parse(prod?.document?.priceList)
                    }
                    arr.push({ ...prod?.document, priceList })
                }
                return arr;
            }
            return data;
        } catch (error) {
            console.log(error, "error ISIDE CATCH");
            return [];
        }
    }
    return []
}


// new code end 


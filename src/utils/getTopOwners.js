import {firestore} from "./firebase.js";
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";

async function getTopOwners(number) {

    // establish the collection to query
    const owners = collection(firestore, "owners");

    // establish what we are querying and how we are querying it.
    const que = query(owners, orderBy("total_violated_seconds", "desc"), limit(number));

    // run query

    const snap = await getDocs(que);

    const top = snap.docs.map(doc => ({
        docid: doc.id,
        ...doc.data()
    }))

    console.log(top)
    return top;

}

export {getTopOwners}
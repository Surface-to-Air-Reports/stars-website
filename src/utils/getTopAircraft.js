import {firestore} from "./firebase.js";
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";

async function getTopAircraft(number) {

    // establish the collection to query
    const aircraft = collection(firestore, "aircraft");

    // establish what we are querying and how we are querying it.
    const que = query(aircraft, orderBy("total_violated_seconds", "desc"), limit(number));

    // run query

    const snap = await getDocs(que);

    const top = snap.docs.map(doc => ({
        docid: doc.id,
        ...doc.data()
    }))

    console.log(top)
    return top;

}

export {getTopAircraft}
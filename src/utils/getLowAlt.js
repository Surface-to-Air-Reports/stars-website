import {firestore} from "./firebase.js";
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";

async function getLowAlt(number) {

    // establish the collection to query
    const sessions = collection(firestore, "low_sessions");

    // establish what we are querying and how we are querying it.
    const que = query(sessions, orderBy("ssrt", "desc"), limit(number));

    // run query

    const snap = await getDocs(que);

    const top = snap.docs.map(doc => ({
        docid: doc.id,
        ...doc.data()
    }))

    console.log(top)
    return top;

}

export {getLowAlt}
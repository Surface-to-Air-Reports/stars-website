import {firestore} from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

async function getGenStats() {
    const docRef = doc(firestore, "stats", "general");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return(docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return {lowtime: 0};
    }
}


export {getGenStats};
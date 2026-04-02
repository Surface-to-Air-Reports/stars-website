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

async function getFrequencyStats() {
    const docRef = doc(firestore, "stats", "times");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return(docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return {};
    }
}

async function getAltitudeStats() {
    const docRef = doc(firestore, "stats", "alts");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return(docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return {};
    }
}

export {getGenStats, getFrequencyStats, getAltitudeStats};
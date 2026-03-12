import {firestore} from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

async function getOwners() {
    const docRef = doc(firestore, "assists", "owners_searchable");
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data().owners);
    return(docSnap.data().owners);
}

async function getTails() {
    const docRef = doc(firestore, "assists", "aircraft_searchable");
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data().aircraft);
    return(docSnap.data().aircraft);
}

async function getTypes() {
    const docRef = doc(firestore, "assists", "type_searchable");
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data().types);
    return(docSnap.data().types);
}

export {getOwners, getTypes, getTails}
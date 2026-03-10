import {firestore} from "./firebase.js";
import { getDocs, collection, orderBy, limit, query, where, Timestamp } from "firebase/firestore";

const sort_fields = Object.freeze({
    TIME: "ssrt",
    TAIL: "cs",
    LOW_ALT: "lalt",
    DURATION: "sdur",
    OWNER: "own",
    TYPE: "at"
})

const sort_directions = Object.freeze({
    ASCENDING: "asc",
    DESCENDING: "desc"
})

async function powerSearchLowSessions(maxReturn, sort_by, start_from, time_from, time_to, tail_filter, alt_to, alt_from, dur_from, dur_to, own_filter, type_filter) {
    // x,sort by, start from, none,none,none,none,none,none......
    // establish the collection to query
    const sessions = collection(firestore, "low_sessions");

    console.log(sort_fields, sort_directions)

    let callOperator = "==";
    let ownerOperator = "==";
    let typeOperator = "==";

    if (!tail_filter || tail_filter === "") {
        callOperator = "<";
        tail_filter = "";
    }

    if (!own_filter || own_filter === "") {
        ownerOperator = "<";
        own_filter = "";
    }

    if (!type_filter || type_filter === "") {
        typeOperator = "<";
        type_filter = "";
    }

    if (!time_from) {
        time_from = new Timestamp(1, 0);
    }

    if (!time_to) {
        time_to = new Timestamp(95617661122, 0);
    }

    if (!alt_to || alt_to === 0) {
        alt_to = 1000000000;
    }

    if (!alt_from || alt_from === 0) {
        alt_from = -1000;
    }

    if (!dur_from || dur_from === 0) {
        dur_from = -1000;
    }

    if (!dur_to || dur_to === 0) {
        dur_to = 1000000000;
    }
    console.log({
        "CALL OPERATOR": callOperator,
        "TYPE OPERATOR": typeOperator,
        "OWNER OPERATOR": ownerOperator,
        "CALL FILTER": tail_filter,
        "OWNER FILTER": own_filter,
        "TYPE FILTER": type_filter,
        "TIME FROM": time_from,
        "TIME TO": time_to,
        "ALT FROM": alt_from,
        "ALT TO": alt_to,
        "DURATION FROM": dur_from,
        "DURATION TO": dur_to,

    })

    // establish what we are querying and how we are querying it.
    const que = query(sessions, orderBy("ssrt", "desc"),
        where("lalt", ">", alt_from ),
        where("lalt", "<", alt_to),
        where("ssrt", ">", time_from),
        where("ssrt", "<", time_to),
        where("sdur", ">", dur_from),
        where("sdur", "<", dur_to),
        where("cs", callOperator, tail_filter),
        where("own", ownerOperator, own_filter),
        where("at", typeOperator, type_filter),
        limit(maxReturn)
    );

    // run query

    const snap = await getDocs(que);

    const top = snap.docs.map(doc => ({
        docid: doc.id,
        ...doc.data()
    }))

    console.log(top)
    return top;
    // console.log(snap.data().count);

}

export {powerSearchLowSessions}
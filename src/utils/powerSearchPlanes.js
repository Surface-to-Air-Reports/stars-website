import { API_BASE_URL } from "./api.js";

async function powerSearchPlanes(maxReturn, sort, page, owner) {
    const params = new URLSearchParams();
    params.set("page_size", maxReturn);
    params.set("order", "desc");

    if (sort && sort !== "") {
        params.set("sort_by", sort);
        if (sort === "total_violated_seconds") {
            params.set("order", "desc");
        }
        if (sort === "lowest_altitude") {
            params.set("order", "asc");
        }
    }

    if (page && page !== 0) {
        params.set("page", page);
    }

    if (owner && owner !== "") {
        params.set("owner", owner);
    }

    console.log("powerSearch params:", Object.fromEntries(params));

    const res = await fetch(`${API_BASE_URL}/aircraft?${params.toString()}`);
    const json = await res.json();

    const top = json.data.map((row) => ({
        callsign: row.callsign,
        owner: row.owner,
        aircraft_type: row.aircraft_type,
        total_violated_seconds: row.total_violated_seconds,
        lowest_altitude: row.lowest_altitude,
        session_count: row.session_count,
    }));

    console.log(json);
    return {"top": top, "total": json["total_pages"], "totalSessions": json["total_results"]};
}

export { powerSearchPlanes };

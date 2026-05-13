import { API_BASE_URL } from "./api.js";

async function powerSearchOwners(maxReturn, page) {
    const params = new URLSearchParams();
    params.set("page_size", maxReturn);
    params.set("order", "desc");

    if (page && page !== 0) {
        params.set("page", page);
    }

    console.log("powerSearch params:", Object.fromEntries(params));

    const res = await fetch(`${API_BASE_URL}/owners?${params.toString()}`);
    const json = await res.json();

    const top = json.data.map((row) => ({
        callsigns: row.callsigns,
        name: row.name,
        total_violated_seconds: row.total_violated_seconds,
    }));

    console.log(json);
    return {"top": top, "total": json["total_pages"], "totalSessions": json["total_results"]};
}

export { powerSearchOwners };

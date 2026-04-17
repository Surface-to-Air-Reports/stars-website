import { API_BASE_URL } from "./api.js";

async function powerSearchLowSessions(maxReturn, tail_filter, alt_to, alt_from, dur_from, dur_to, date_start, date_end, sort, page) {
    const params = new URLSearchParams();
    params.set("page_size", maxReturn);
    params.set("sort_by", "session_start");
    params.set("order", "desc");

    if (tail_filter && tail_filter !== "") {
        params.set("callsign", tail_filter);
    }
    if (alt_from && alt_from !== 0) {
        params.set("min_altitude", alt_from);
    }
    if (alt_to && alt_to !== 0) {
        params.set("max_altitude", alt_to);
    }
    if (dur_from && dur_from !== 0) {
        params.set("min_duration", dur_from);
    }
    if (dur_to && dur_to !== 0) {
        params.set("max_duration", dur_to);
    }
    if (sort && sort !== "") {
        params.set("sort_by", sort);
        if (sort === "violating_duration_seconds") {
            params.set("order", "desc");
        }
        if (sort === "lowest_altitude") {
            params.set("order", "asc");
        }
        if (sort === "session_start") {
            params.set("order", "desc");
        }
    }

    if (page && page !== 0) {
        params.set("page", page);
    }

    params.set("time_start", date_start);
    params.set("time_end", date_end);

    console.log("powerSearch params:", Object.fromEntries(params));

    const res = await fetch(`${API_BASE_URL}/sessions?${params.toString()}`);
    const json = await res.json();

    const top = json.data.map((row) => ({
        callsign: row.callsign,
        session_start: new Date(row.session_start),
        lowest_altitude: row.lowest_altitude,
        violating_duration: row.violating_duration_seconds,
        owner: row.owner,
        aircraft_type: row.aircraft_type,
        pings: row.pings,
    }));

    console.log(json);
    return {"top": top, "total": json["total_pages"], "totalSessions": json["total_results"]};
}

export { powerSearchLowSessions };

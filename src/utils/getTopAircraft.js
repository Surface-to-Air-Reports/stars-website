import { API_BASE_URL } from "./api.js";
import { cachedFetch } from "./cachedFetch.js";

async function getTopAircraft(number) {
    const json = await cachedFetch(
        `${API_BASE_URL}/aircraft?sort_by=total_violated_seconds&order=desc&page_size=${number}`
    );

    const top = json.data.map((row) => ({
        callsign: row.callsign,
        lowest_altitude: row.lowest_altitude,
        total_violated_seconds: row.total_violated_seconds,
        owner_name: row.owner,
        type: row.aircraft_type,
        session_count: row.session_count,
    }));

    console.log(top);
    return top;
}

export { getTopAircraft };

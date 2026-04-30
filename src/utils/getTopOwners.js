import { API_BASE_URL } from "./api.js";
import { cachedFetch } from "./cachedFetch.js";

async function getTopOwners(number) {
    const json = await cachedFetch(
        `${API_BASE_URL}/owners?sort_by=total_violated_seconds&order=desc&page_size=${number}`
    );

    const top = json.data.map((row) => ({
        name: row.name,
        total_violated_seconds: row.total_violated_seconds,
        callsigns: row.callsigns,
        callsign_count: row.callsign_count,
    }));

    console.log(top);
    return top;
}

export { getTopOwners };

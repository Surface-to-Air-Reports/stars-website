import { API_BASE_URL } from "./api.js";
import { cachedFetch } from "./cachedFetch.js";

async function fetchStats(field) {
    const data = await cachedFetch(`${API_BASE_URL}/stats?fields=${field}`);
    console.log(data);
    return data[field];
}

async function getGenStats() {
    const data = await cachedFetch(`${API_BASE_URL}/stats?fields=total_violated_seconds&fields=last_updated`);
    return { lowtime: data["total_violated_seconds"], lastUpdated: data["last_updated"] };
}

async function getFrequencyStats() {
    return fetchStats("hourly_violations");
}

async function getAltitudeStats() {
    return fetchStats("altitude_violations");
}

async function getTopAircraft(number) {
    const json = await cachedFetch(
        `${API_BASE_URL}/aircraft?sort_by=total_violated_seconds&order=desc&page_size=${number}`
    );

    const top = json.data.map((row) => ({
        callsign: row.callsign,
        total_violated_seconds: row.total_violated_seconds
    }));

    console.log(top);
    return top;
}

export { getGenStats, getFrequencyStats, getAltitudeStats, getTopAircraft };

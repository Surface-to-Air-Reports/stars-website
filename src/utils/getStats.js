import { API_BASE_URL } from "./api.js";

async function fetchStats(field) {
    const res = await fetch(`${API_BASE_URL}/stats?fields=${field}`);
    const data = await res.json();
    console.log(data);
    return data[field];
}

async function getGenStats() {
    const res = await fetch(`${API_BASE_URL}/stats?fields=total_violated_seconds&fields=last_updated`);
    const data = await res.json();
    return { lowtime: data["total_violated_seconds"], lastUpdated: data["last_updated"] };
}

async function getFrequencyStats() {
    return fetchStats("hourly_violations");
}

async function getAltitudeStats() {
    return fetchStats("altitude_violations");
}

async function getTopAircraft(number) {
    const res = await fetch(
        `${API_BASE_URL}/aircraft?sort_by=total_violated_seconds&order=desc&page_size=${number}`
    );
    const json = await res.json();

    const top = json.data.map((row) => ({
        callsign: row.callsign,
        total_violated_seconds: row.total_violated_seconds
    }));

    console.log(top);
    return top;
}

export { getGenStats, getFrequencyStats, getAltitudeStats, getTopAircraft };

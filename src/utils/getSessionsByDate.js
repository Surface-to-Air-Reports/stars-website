import { API_BASE_URL } from "./api.js";
import { cachedFetch, DEFAULT_TTL_MS, THIRTY_DAYS_MS } from "./cachedFetch.js";

const PAGE_SIZE = 50;

function isPastDate(date) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return date < todayStr;
}

async function getSessionsByDate(date) {
    const startIso = `${date}T00:00:00`;
    const endIso = `${date}T23:59:59`;

    const params = new URLSearchParams();
    params.set("time_start", startIso);
    params.set("time_end", endIso);
    params.set("page_size", PAGE_SIZE);
    params.set("sort_by", "session_start");
    params.set("order", "asc");

    const ttl = isPastDate(date) ? THIRTY_DAYS_MS : DEFAULT_TTL_MS;

    let all = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        params.set("page", page);
        const json = await cachedFetch(
            `${API_BASE_URL}/sessions?${params.toString()}`,
            { ttl, fetchOptions: { headers: { accept: "application/json" } } }
        );
        const pageData = json.data || [];
        all = [...all, ...pageData];

        if (pageData.length < PAGE_SIZE || (json.total && all.length >= json.total)) {
            hasMore = false;
        } else {
            page++;
        }
    }

    return {
        sessions: all,
        startTs: new Date(startIso).getTime() / 1000,
        endTs: new Date(endIso).getTime() / 1000,
    };
}

export { getSessionsByDate };

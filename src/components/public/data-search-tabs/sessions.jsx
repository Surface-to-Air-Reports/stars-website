import {
    Chip,
    FormLabel,
    Table,
    Input,
    Select,
    Option,
    CircularProgress,
    Sheet,
    Stack,
    Typography,
    Box,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { secToDurationShort } from "../../../utils/secToDurationShort";
import { colorScaleInverse, colorScale } from "../../../utils/colorScale";
import { powerSearchLowSessions } from "../../../utils/powerSearchLowSessions";
import { Pagination } from "../../reusable/Pagination";

const toUnix = (value) => {
    if (!value) return undefined;
    const d = dayjs(value);
    return d.isValid() ? d.unix() : undefined;
};

const Sessions = ({ typ, id }) => {
    const [sessions, setSessions] = useState([]);

    const [callFilter, setCallFilter] = useState("");

    const [altLowFilter, setAltLowFilter] = useState("");
    const [altHighFilter, setAltHighFilter] = useState("");

    const [durationLowFilter, setDurationLowFilter] = useState("");
    const [durationHighFilter, setDurationHighFilter] = useState("");

    const [sort, setSort] = useState("session_start");

    // native datetime-local strings
    const [dateFrom, setDateFrom] = useState(
        dayjs().subtract(7, "day").format("YYYY-MM-DDTHH:mm")
    );
    const [dateTo, setDateTo] = useState(dayjs().format("YYYY-MM-DDTHH:mm"));

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typ === "t" && id) setCallFilter(id);
    }, [typ, id]);

    useEffect(() => {
        let active = true;

        const altLow = parseInt(altLowFilter);
        const altHigh = parseInt(altHighFilter);
        const durLow = parseInt(durationLowFilter);
        const durHigh = parseInt(durationHighFilter);

        setLoading(true);

        powerSearchLowSessions(
            pageSize,
            callFilter,
            Number.isFinite(altHigh) ? altHigh : undefined,
            Number.isFinite(altLow) ? altLow : undefined,
            Number.isFinite(durLow) ? durLow : undefined,
            Number.isFinite(durHigh) ? durHigh : undefined,
            toUnix(dateFrom),
            toUnix(dateTo),
            sort,
            page
        ).then((result) => {
            if (!active) return;
            setSessions(result.top || []);
            setTotalPages(result.total || 1);
            setLoading(false);
        });

        return () => {
            active = false;
        };
    }, [
        callFilter,
        altLowFilter,
        altHighFilter,
        durationLowFilter,
        durationHighFilter,
        dateFrom,
        dateTo,
        sort,
        page,
        pageSize,
    ]);

    return (
        <Sheet
            variant="soft"
            sx={{
                p: 2,
                borderRadius: "md",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Filters */}
            <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md" }}>
                <Stack spacing={2}>
                    {/* Top row */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <FormLabel>Callsign</FormLabel>
                            <Input
                                value={callFilter}
                                onChange={(e) => {
                                    setPage(1);
                                    setCallFilter(e.target.value);
                                }}
                            />
                        </Box>

                        <Box sx={{ minWidth: 200 }}>
                            <FormLabel>Sort</FormLabel>
                            <Select
                                value={sort}
                                onChange={(_, t) => {
                                    setPage(1);
                                    setSort(t);
                                }}
                            >
                                <Option value="session_start">Start Time</Option>
                                <Option value="lowest_altitude">Lowest Altitude</Option>
                                <Option value="violating_duration_seconds">Duration</Option>
                            </Select>
                        </Box>
                    </Stack>

                    {/* Numeric filters */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Input
                            placeholder="Altitude From"
                            value={altLowFilter}
                            onChange={(e) => setAltLowFilter(e.target.value)}
                        />
                        <Input
                            placeholder="Altitude To"
                            value={altHighFilter}
                            onChange={(e) => setAltHighFilter(e.target.value)}
                        />
                        <Input
                            placeholder="Duration From"
                            value={durationLowFilter}
                            onChange={(e) => setDurationLowFilter(e.target.value)}
                        />
                        <Input
                            placeholder="Duration To"
                            value={durationHighFilter}
                            onChange={(e) => setDurationHighFilter(e.target.value)}
                        />
                    </Stack>

                    {/* DATE RANGE (no MUI X, no theme issues) */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box sx={{ flex: 1 }}>
                            <FormLabel>From</FormLabel>
                            <Input
                                type="datetime-local"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <FormLabel>To</FormLabel>
                            <Input
                                type="datetime-local"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Sheet>

            {/* Table */}
            <Sheet variant="outlined" sx={{ borderRadius: "md", overflow: "hidden" }}>
                <Table hoverRow stickyHeader>
                    <thead>
                    <tr>
                        <th>Tail</th>
                        <th>Start</th>
                        <th>Lowest Alt</th>
                        <th>Duration</th>
                        <th>Owner</th>
                        <th>Aircraft</th>
                    </tr>
                    </thead>

                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6}>
                                <Stack sx={{ py: 4 }} alignItems="center">
                                    <CircularProgress />
                                    <Typography level="body-sm" sx={{ mt: 1 }}>
                                        Loading sessions
                                    </Typography>
                                </Stack>
                            </td>
                        </tr>
                    ) : (
                        sessions.map((session, idx) => (
                            <tr key={session.callsign + idx}>
                                <td>{session.callsign}</td>
                                <td>
                                    {dayjs
                                        .unix(session.session_start)
                                        .format("YYYY-MM-DD HH:mm")}
                                </td>
                                <td>
                                    <Chip
                                        variant="soft"
                                        color={colorScaleInverse(
                                            session.lowest_altitude,
                                            6100,
                                            6000
                                        )}
                                    >
                                        {session.lowest_altitude} ft
                                    </Chip>
                                </td>
                                <td>
                                    <Chip
                                        variant="soft"
                                        color={colorScale(
                                            session.violating_duration,
                                            30,
                                            60
                                        )}
                                    >
                                        {secToDurationShort(session.violating_duration)}
                                    </Chip>
                                </td>
                                <td>{session.owner || "—"}</td>
                                <td>{session.aircraft_type || "—"}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </Sheet>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                handleChangePage={(v) => setPage(v)}
                handleChangeCount={(e, t) => {
                    setPageSize(t);
                    setPage(1);
                }}
                count={pageSize}
            />
        </Sheet>
    );
};

export default Sessions;
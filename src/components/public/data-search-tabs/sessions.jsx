import {Chip, FormLabel, Table, Input, Select, Option, CircularProgress} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {secToDurationShort} from "../../../utils/secToDurationShort";
import {colorScaleInverse, colorScale} from "../../../utils/colorScale";
import {powerSearchLowSessions} from "../../../utils/powerSearchLowSessions";
import {Pagination} from "../../reusable/Pagination";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../utils/muitheme";

const Sessions = ({typ, id}) => {
    const [sessions, setSessions] = useState([]);

    const [callFilter, setCallFilter] = useState("");

    const [altLowFilter, setAltLowFilter] = useState("");
    const [altHighFilter, setAltHighFilter] = useState("");

    const [durationLowFilter, setDurationLowFilter] = useState("");
    const [durationHighFilter, setDurationHighFilter] = useState("");

    const [sort, setSort] = useState("session_start");

    const [dateFrom, setDateFrom] = React.useState(dayjs('2025-11-11T01:00'));
    const [dateTo, setDateTo] = React.useState(dayjs());

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typ === "t" && id) {
            setCallFilter(id);
        }
    }, [typ, id]);

    useEffect(() => {
        let active = true;

        setLoading(true);
        powerSearchLowSessions(
            pageSize,
            callFilter,
            parseInt(altHighFilter),
            parseInt(altLowFilter),
            parseInt(durationLowFilter),
            parseInt(durationHighFilter),
            dateFrom.unix(),
            dateTo.unix(),
            sort,
            page,
        ).then((result) => {
            if (!active) return;

            setSessions(result.top);
            setTotalPages(result.total);
            setLoading(false);
        });

        return () => {
            active = false;
        };
    }, [callFilter, altLowFilter, altHighFilter, durationLowFilter, durationHighFilter, dateTo, dateFrom, sort, page, pageSize]);

    return (
        <>

            <FormLabel>Callsign</FormLabel>
            <Input placeholder={"Callsign"} value={callFilter} onChange={(e) => setCallFilter(e.target.value)}></Input>
            <br/>
            <FormLabel>Altitude From</FormLabel>
            <Input placeholder={"Altitude From"} value={altLowFilter} onChange={(e) => setAltLowFilter((e.target.value))}></Input>
            <FormLabel>Altitude To</FormLabel>
            <Input placeholder={"Altitude To"} value={altHighFilter} onChange={(e) => setAltHighFilter((e.target.value))}></Input>
            <br/>
            <FormLabel>Duration From</FormLabel>
            <Input placeholder={"Duration From"} value={durationLowFilter} onChange={(e) => setDurationLowFilter((e.target.value))}></Input>
            <FormLabel>Duration To</FormLabel>
            <Input placeholder={"Duration To"} value={durationHighFilter} onChange={(e) => setDurationHighFilter((e.target.value))}></Input>
            <Select value={sort} onChange={(e, t) => setSort(t)}>
                <Option value="session_start">Start Time</Option>
                <Option value="lowest_altitude">Lowest Altitude</Option>
                <Option value="violating_duration_seconds">Duration</Option>
            </Select>
            <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="From" value={dateFrom} onChange={(e) => setDateFrom(e)}/>
            <DateTimePicker label="To" value={dateTo} onChange={(e) => setDateTo(e)}/>
            </LocalizationProvider>
            </ThemeProvider>

                <Table>
                    <thead>
                    <tr>
                        <th>Tail Number</th>
                        <th>Start Time</th>
                        <th>Lowest Session Altitude</th>
                        <th>Session Duration</th>
                        <th>Registered Owner</th>
                        <th>Aircraft Type</th>
                    </tr>
                    </thead>
                    {loading ? (
                        <CircularProgress sx={{margin:"1rem"}} />
                    ) : (

                        sessions.map((session) => (
                            <tr>
                                <td>{session.callsign}</td>
                                <td>{session.session_start.toLocaleString({timeZone: "MST"})}</td>
                                <td><Chip color={colorScaleInverse(session.lowest_altitude, 6100, 6000)}>{session.lowest_altitude}ft</Chip></td>
                                <td><Chip color={colorScale(session.violating_duration, 30, 60)}>{secToDurationShort(session.violating_duration)}</Chip></td>
                                <td>{session.owner}</td>
                                <td>{session.aircraft_type}</td>
                            </tr>
                        ))
                    )}
                </Table>
            <Pagination currentPage={page} totalPages={totalPages} handleChangePage={(v) => setPage(v)} handleChangeCount={(e, t) => setPageSize(t)} count={pageSize} />
            </>
    )
}

export default Sessions;
import {Chip, FormLabel, Table, Input} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {secToDurationShort} from "../../../utils/secToDurationShort";
import {colorScaleInverse, colorScale} from "../../../utils/colorScale";
import {powerSearchLowSessions} from "../../../utils/powerSearchLowSessions";

const Sessions = () => {
    const [sessions, setSessions] = useState([]);

    const [callFilter, setCallFilter] = useState("");

    const [altLowFilter, setAltLowFilter] = useState("");
    const [altHighFilter, setAltHighFilter] = useState("");

    const [durationLowFilter, setDurationLowFilter] = useState("");
    const [durationHighFilter, setDurationHighFilter] = useState("");

    //sort by

    //date from
    //date to

    //pagination needed

    useEffect(() => {
        powerSearchLowSessions(10, "ssrt", 0, null, null, callFilter, parseInt(altHighFilter), parseInt(altLowFilter), parseInt(durationLowFilter), parseInt(durationHighFilter)).then(result => {setSessions(result)});
    }, [callFilter, altLowFilter, altHighFilter, durationLowFilter, durationHighFilter]);

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
            {sessions.map((session) => (
                <tr>
                    <td>{session.cs}</td>
                    <td>{session.ssrt.toDate().toLocaleString({timeZone: "MST"})}</td>
                    <td><Chip color={colorScaleInverse(session.lalt, 6100, 6000)}>{session.lalt}ft</Chip></td>
                    <td><Chip color={colorScale(session.sdur, 30, 60)}>{secToDurationShort(session.sdur)}</Chip></td>
                    <td>{session.own}</td>
                    <td>{session.at}</td>
                </tr>

            ))}
        </Table>
            </>
    )
}

export default Sessions;
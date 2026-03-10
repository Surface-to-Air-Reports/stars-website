import {Button, Chip, Table, Input, FormLabel, Autocomplete, CircularProgress} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {getLowAlt} from "../../../utils/getLowAlt";
import {secToDurationShort} from "../../../utils/secToDurationShort";
import {colorScaleInverse, colorScale} from "../../../utils/colorScale";
import {getReadableTime} from "../../../utils/getReadableTime";
import {powerSearchLowSessions} from "../../../utils/powerSearchLowSessions";

import {Timestamp} from "firebase/firestore";
import {getOwners, getTails, getTypes} from "../../../utils/getAssists";

const Sessions = () => {
    const [sessions, setSessions] = useState([]);

    const [callFilter, setCallFilter] = useState("");
    const [ownerFilter, setOwnerFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const [altLowFilter, setAltLowFilter] = useState(0);
    const [altHighFilter, setAltHighFilter] = useState(0);

    const [durationLowFilter, setDurationLowFilter] = useState(0);
    const [durationHighFilter, setDurationHighFilter] = useState(0);

    const [ownersAssist, setOwnersAssists] = useState([]);
    const [ownersAssistLoading, setOwnersAssistLoading] = useState(false);

    const [tailAssist, setTailAssists] = useState([]);
    const [tailAssistLoading, setTailAssistLoading] = useState(false);

    const [typeAssist, setTypeAssists] = useState([]);
    const [typeAssistLoading, setTypeAssistLoading] = useState(false);


    useEffect(() => {
        powerSearchLowSessions(10, "ssrt", 0, null, null, callFilter, altHighFilter, altLowFilter, durationLowFilter, durationHighFilter, ownerFilter, typeFilter).then(result => {setSessions(result)});
    }, [callFilter, altLowFilter, altHighFilter, durationLowFilter, durationHighFilter, ownerFilter, typeFilter]);

    return (
        <>
            <Autocomplete
                options={ownersAssist}
                onOpen={() => {
                    if (ownersAssist.length === 0) {
                        getOwners().then(setOwnersAssists)
                        setOwnersAssistLoading(true);

                    }
                }}

                endDecorator= {
                    (ownersAssist.length === 0 && ownersAssistLoading)? (
                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                }
                value={ownerFilter}
                onChange={(e, n) => {setOwnerFilter(n)}}

            />

            <Autocomplete
                options={tailAssist}
                onOpen={() => {
                    if (tailAssist.length === 0) {
                        getTails().then(setTailAssists)
                        setTailAssistLoading(true);

                    }
                }}

                endDecorator={
                    (tailAssist.length === 0 && tailAssistLoading)? (
                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                }
                value={callFilter}
                onChange={(e, n) => {setCallFilter(n)}}

            />

            <Autocomplete
                options={typeAssist}
                onOpen={() => {
                    if (typeAssist.length === 0) {
                        getTypes().then(setTypeAssists)
                        setTypeAssistLoading(true);

                    }
                }}

                endDecorator={
                    (typeAssist.length === 0 && typeAssistLoading)? (
                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                    ) : null
                }
                value={typeFilter}
                onChange={(e, n) => {setTypeFilter(n)}}

            />

            <Button onClick={() => getOwners().then(setOwnersAssists)}>debug</Button>

            <FormLabel>Callsign</FormLabel>
            <Input placeholder={"Callsign"} value={callFilter} onChange={(e) => setCallFilter(e.target.value)}></Input>
            <FormLabel>Aircraft Type</FormLabel>
            <Input placeholder={"Type"} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}></Input>
            <FormLabel>Owner</FormLabel>
            <Input placeholder={"Owner"} value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)}></Input>
            <br/>
            <FormLabel>Altitude From</FormLabel>
            <Input placeholder={"Altitude From"} value={altLowFilter} onChange={(e) => setAltLowFilter(parseInt(e.target.value))}></Input>
            <FormLabel>Altitude To</FormLabel>
            <Input placeholder={"Altitude To"} value={altHighFilter} onChange={(e) => setAltHighFilter(parseInt(e.target.value))}></Input>
            <br/>
            <FormLabel>Duration From</FormLabel>
            <Input placeholder={"Duration From"} value={durationLowFilter} onChange={(e) => setDurationLowFilter(parseInt(e.target.value))}></Input>
            <FormLabel>Duration To</FormLabel>
            <Input placeholder={"Duration To"} value={durationHighFilter} onChange={(e) => setDurationHighFilter(parseInt(e.target.value))}></Input>


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
import {Chip, Table} from "@mui/joy";
import React from "react";


const Sessions = () => {
    return (
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
            <tr>
                <td>ABC123</td>
                <td>05:23 AM, 02/24/26</td>
                <td><Chip color={"danger"}>324ft</Chip></td>
                <td><Chip color={"danger"}>05:43</Chip></td>
                <td>Jeff</td>
                <td>Cesena 123</td>
            </tr>
        </Table>
    )
}

export default Sessions;
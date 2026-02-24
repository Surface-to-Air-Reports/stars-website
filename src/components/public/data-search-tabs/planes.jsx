import {Chip, Table} from "@mui/joy";
import React from "react";


const Planes = () => {
    return (
        <Table>
            <thead>
            <tr>
                <th>Tail Number</th>
                <th>Low Flight Time</th>
                <th>Lowest Lifetime Altitude</th>
                <th>Registered Owner</th>
                <th>Aircraft Type</th>
            </tr>
            </thead>
            <tr>
                <td>ABC123</td>
                <td><Chip color={"danger"}>0:05:43</Chip></td>
                <td><Chip color={"danger"}>223ft</Chip></td>
                <td>Jeff</td>
                <td>Cesena 123</td>
            </tr>
        </Table>
    )
}

export default Planes;
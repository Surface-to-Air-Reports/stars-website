import {Chip, Table} from "@mui/joy";
import React from "react";


const Owners = () => {
    return (
        <Table>
            <thead>
            <tr>
                <th>Registered Owner</th>
                <th>Low Flight Time</th>
                <th>Tail Numbers</th>
            </tr>
            </thead>
            <tr>
                <td>Jeff</td>
                <td><Chip color={"danger"}>0:05:43</Chip></td>
                <td><Chip>ABC12</Chip><Chip>ABC12</Chip></td>
            </tr>
        </Table>
    )
}

export default Owners;
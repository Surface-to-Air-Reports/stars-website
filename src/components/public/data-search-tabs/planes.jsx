import {Chip, Table} from "@mui/joy";
import React, {useEffect} from "react";
import {getTopAircraft} from "../../../utils/getTopAircraft";
import {colorScale, colorScaleInverse} from "../../../utils/colorScale";
import {secToDurationShort} from "../../../utils/secToDurationShort";


const Planes = () => {
    const [planes, setPlanes] = React.useState([]);

    useEffect(() => {
        getTopAircraft(25).then((data) => {setPlanes(data)});
    }, [])

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
            {planes.map((plane)=> (
                <tr>
                    <td>{plane.docid}</td>
                    <td><Chip color={colorScaleInverse(plane.lowest_altitude, 6100, 6000)}>{plane.lowest_altitude}ft</Chip></td>
                    <td><Chip color={colorScale(plane.total_violated_seconds, 10000, 14000)}>{secToDurationShort(plane.total_violated_seconds)}</Chip></td>
                    <td>{plane.owner_name}</td>
                    <td>{plane.type}</td>
                </tr>

            ))}
        </Table>
    )
}

export default Planes;
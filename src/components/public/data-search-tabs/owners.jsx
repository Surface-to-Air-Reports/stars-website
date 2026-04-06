import {Chip, Table} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {getTopOwners} from "../../../utils/getTopOwners";
import {colorScale} from "../../../utils/colorScale";
import {secToDurationShort} from "../../../utils/secToDurationShort";


const Owners = () => {
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        getTopOwners(25).then(result => {setOwners(result)});
    }, [])

    return (
        <Table>
            <thead>
            <tr>
                <th>Registered Owner</th>
                <th>Low Flight Time</th>
                <th>Tail Numbers</th>
            </tr>
            </thead>
            {owners.map((owner) => (
                <tr>
                    <td>{owner.name}</td>
                    <td><Chip color={colorScale(owner.total_violated_seconds, 60000, 72000)}>{secToDurationShort(owner.total_violated_seconds)}</Chip></td>
                    <td>
                        {owner.callsigns.map((cs) => (
                            <Chip>{cs}</Chip>
                        ))}
                    </td>
                </tr>
            ))}
        </Table>
    )
}

export default Owners;
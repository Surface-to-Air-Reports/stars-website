import {Button, Chip, CircularProgress, FormLabel, Input, Option, Select, Table} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {colorScale, colorScaleInverse} from "../../../utils/colorScale";
import {secToDurationShort} from "../../../utils/secToDurationShort";
import {Pagination} from "../../reusable/Pagination";
import {powerSearchPlanes} from "../../../utils/powerSearchPlanes";
import {useNavigate} from "react-router-dom";


const Planes = () => {
    const navigate = useNavigate();
    const [planes, setPlanes] = React.useState([]);

    const [ownerFilter, setOwnerFilter] = useState("");


    const [sort, setSort] = useState("total_violated_seconds");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        powerSearchPlanes(pageSize, sort, page, ownerFilter).then((data) => {
            setPlanes(data.top)
            setTotalPages(data.total);
            setLoading(false);
        });
    }, [sort, page, pageSize, ownerFilter])

    return (
        <>
            <FormLabel>Owner</FormLabel>
            <Input placeholder={"Callsign"} value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)}></Input>

            <Select value={sort} onChange={(e, t) => setSort(t)}>
                <Option value="lowest_altitude">Lowest Altitude</Option>
                <Option value="total_violated_seconds">Duration</Option>
            </Select>

            <Table>
            <thead>
            <tr>
                <th>Tail Number</th>
                <th>Lowest Lifetime Altitude</th>
                <th>Low Flight Time</th>
                <th>Registered Owner</th>
                <th>Aircraft Type</th>
                <th/>
            </tr>
            </thead>
            {loading ? (
                <CircularProgress sx={{margin:"1rem"}} />
            ) : (


                planes.map((plane)=> (
                <tr>
                    <td>{plane.callsign}</td>
                    <td><Chip color={colorScaleInverse(plane.lowest_altitude, 6100, 6000)}>{plane.lowest_altitude}ft</Chip></td>
                    <td><Chip color={colorScale(plane.total_violated_seconds, 10000, 14000)}>{secToDurationShort(plane.total_violated_seconds)}</Chip></td>
                    <td>{plane.owner}</td>
                    <td>{plane.aircraft_type}</td>
                    <td><Button onClick={() => navigate("/data-search/sessions/t/"+plane.callsign)}>View Sessions</Button></td>
                </tr>

            )))}
        </Table>
    <Pagination currentPage={page} totalPages={totalPages} handleChangePage={(v) => setPage(v)} handleChangeCount={(e, t) => setPageSize(t)} count={pageSize} />
        </>
)
}

export default Planes;
import {
    Button,
    Chip,
    CircularProgress,
    FormLabel,
    Input,
    Option,
    Select,
    Table,
    Sheet,
    Stack,
    Typography,
    Box,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { colorScale, colorScaleInverse } from "../../../utils/colorScale";
import { secToDurationShort } from "../../../utils/secToDurationShort";
import { Pagination } from "../../reusable/Pagination";
import { powerSearchPlanes } from "../../../utils/powerSearchPlanes";
import { useNavigate } from "react-router-dom";

const Planes = () => {
    const navigate = useNavigate();
    const [planes, setPlanes] = useState([]);

    const [ownerFilter, setOwnerFilter] = useState("");
    const [sort, setSort] = useState("total_violated_seconds");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        powerSearchPlanes(pageSize, sort, page, ownerFilter).then((data) => {
            setPlanes(data.top || []);
            setTotalPages(data.total || 1);
            setLoading(false);
        });
    }, [sort, page, pageSize, ownerFilter]);

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
            {/* Controls */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "flex-end" }}
                justifyContent="space-between"
            >
                <Box sx={{ flex: 1 }}>
                    <FormLabel>Owner / Callsign</FormLabel>
                    <Input
                        placeholder="Filter by callsign or owner"
                        value={ownerFilter}
                        onChange={(e) => {
                            setPage(1);
                            setOwnerFilter(e.target.value);
                        }}
                    />
                </Box>

                <Box sx={{ minWidth: 220 }}>
                    <FormLabel>Sort</FormLabel>
                    <Select
                        value={sort}
                        onChange={(_, t) => {
                            setPage(1);
                            setSort(t);
                        }}
                    >
                        <Option value="lowest_altitude">Lowest Altitude</Option>
                        <Option value="total_violated_seconds">Duration</Option>
                    </Select>
                </Box>
            </Stack>

            {/* Table */}
            <Sheet variant="outlined" sx={{ borderRadius: "md", overflow: "hidden" }}>
                <Table hoverRow stickyHeader>
                    <thead>
                    <tr>
                        <th>Tail Number</th>
                        <th>Lowest Altitude</th>
                        <th>Low Flight Time</th>
                        <th>Owner</th>
                        <th>Aircraft</th>
                        <th style={{ width: 140 }} />
                    </tr>
                    </thead>

                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6}>
                                <Stack
                                    sx={{ py: 4 }}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <CircularProgress />
                                    <Typography level="body-sm" sx={{ mt: 1 }}>
                                        Loading aircraft data
                                    </Typography>
                                </Stack>
                            </td>
                        </tr>
                    ) : planes.length === 0 ? (
                        <tr>
                            <td colSpan={6}>
                                <Typography level="body-sm" sx={{ py: 4, textAlign: "center" }}>
                                    No results
                                </Typography>
                            </td>
                        </tr>
                    ) : (
                        planes.map((plane) => (
                            <tr key={plane.callsign}>
                                <td>
                                    <Typography level="body-sm" fontWeight="md">
                                        {plane.callsign}
                                    </Typography>
                                </td>

                                <td>
                                    <Chip
                                        variant="soft"
                                        color={colorScaleInverse(plane.lowest_altitude, 6100, 6000)}
                                    >
                                        {plane.lowest_altitude} ft
                                    </Chip>
                                </td>

                                <td>
                                    <Chip
                                        variant="soft"
                                        color={colorScale(plane.total_violated_seconds, 10000, 14000)}
                                    >
                                        {secToDurationShort(plane.total_violated_seconds)}
                                    </Chip>
                                </td>

                                <td>
                                    <Typography level="body-sm">
                                        {plane.owner || "—"}
                                    </Typography>
                                </td>

                                <td>
                                    <Typography level="body-sm">
                                        {plane.aircraft_type || "—"}
                                    </Typography>
                                </td>

                                <td>
                                    <Button
                                        size="sm"
                                        variant="soft"
                                        onClick={() =>
                                            navigate("/data-search/sessions/t/" + plane.callsign)
                                        }
                                    >
                                        Sessions
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </Sheet>

            {/* Pagination */}
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

export default Planes;
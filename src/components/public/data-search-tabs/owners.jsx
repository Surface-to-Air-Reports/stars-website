import {
    Chip,
    CircularProgress,
    Table,
    Sheet,
    Stack,
    Typography,
    Box,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { colorScale } from "../../../utils/colorScale";
import { secToDurationShort } from "../../../utils/secToDurationShort";
import { Pagination } from "../../reusable/Pagination";
import { powerSearchOwners } from "../../../utils/powerSearchOwners";

const Owners = () => {
    const [owners, setOwners] = useState([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        powerSearchOwners(pageSize, page).then((data) => {
            setOwners(data.top || []);
            setTotalPages(data.total || 1);
            setLoading(false);
        });
    }, [page, pageSize]);

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
            <Sheet variant="outlined" sx={{ borderRadius: "md", overflow: "hidden" }}>
                <Table hoverRow stickyHeader>
                    <thead>
                    <tr>
                        <th>Registered Owner</th>
                        <th>Low Flight Time</th>
                        <th>Tail Numbers</th>
                    </tr>
                    </thead>

                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={3}>
                                <Stack
                                    sx={{ py: 4 }}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <CircularProgress />
                                    <Typography level="body-sm" sx={{ mt: 1 }}>
                                        Loading owner data
                                    </Typography>
                                </Stack>
                            </td>
                        </tr>
                    ) : owners.length === 0 ? (
                        <tr>
                            <td colSpan={3}>
                                <Typography level="body-sm" sx={{ py: 4, textAlign: "center" }}>
                                    No results
                                </Typography>
                            </td>
                        </tr>
                    ) : (
                        owners.map((owner, idx) => (
                            <tr key={owner.name ?? idx}>
                                <td>
                                    <Typography level="body-sm" fontWeight="md">
                                        {owner.name || "—"}
                                    </Typography>
                                </td>

                                <td>
                                    <Chip
                                        variant="soft"
                                        color={colorScale(owner.total_violated_seconds, 60000, 72000)}
                                    >
                                        {secToDurationShort(owner.total_violated_seconds)}
                                    </Chip>
                                </td>

                                <td>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {owner.callsigns?.length ? (
                                            owner.callsigns.map((cs, i) => (
                                                <Chip key={i} size="sm" variant="soft">
                                                    {cs}
                                                </Chip>
                                            ))
                                        ) : (
                                            <Typography level="body-sm">—</Typography>
                                        )}
                                    </Box>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </Sheet>

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

export default Owners;
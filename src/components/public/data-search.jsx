import React from 'react';
import {Box, Table} from "@mui/joy";

const Page = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{maxWidth: 800}}>
                <Table>
                    <thead>
                        <tr>
                            <th>Callsign</th>
                            <th>Time</th>
                            <th>Lowest Altitude</th>
                            <th>Violating time</th>
                        </tr>
                    </thead>
                    <tr>

                    </tr>
                </Table>
            </Box>
        </Box>
    )
}

export default Page;
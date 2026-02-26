import React from 'react';
import {Box, MenuItem, MenuList, Typography} from "@mui/joy";

import Sessions from "./data-search-tabs/sessions"
import Planes from "./data-search-tabs/planes"
import Owners from "./data-search-tabs/owners"

const Page = () => {
    const [currentTab, setCurrentTab] = React.useState(0);
    return (
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", gap: "1rem"}}>
            <Typography level={"h1"}>Data Search</Typography>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "1rem"}}>
                <Box>
                    <MenuList
                        component="div"
                        variant="outlined"
                        size="sm"
                        sx={{
                            boxShadow: 'sm',
                            flexGrow: 0,
                            minWidth: 200,
                            maxHeight: 240,
                            overflow: 'auto',
                        }}
                    >
                        <MenuItem onClick={() => setCurrentTab(0)}>Sessions</MenuItem>
                        <MenuItem onClick={() => setCurrentTab(1)}>Planes</MenuItem>
                        <MenuItem onClick={() => setCurrentTab(2)}>Owners</MenuItem>
                    </MenuList>

                </Box>
                <Box sx={{maxWidth: 800}}>
                    {currentTab === 0 && (
                        <Sessions/>
                    )}
                    {currentTab === 1 && (
                        <Planes/>
                    )}
                    {currentTab === 2 && (
                        <Owners/>
                    )}
                </Box>
        </Box>
        </Box>

    )
}

export default Page;
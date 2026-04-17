import React, {useEffect} from 'react';
import {Box, MenuItem, MenuList, Typography} from "@mui/joy";

import Sessions from "./data-search-tabs/sessions"
import Planes from "./data-search-tabs/planes"
import Owners from "./data-search-tabs/owners"
import {useParams} from "react-router-dom";

const tabs = {"sessions":0, "planes":1, "owners":2}

const Page = () => {
    const givenParams = useParams();
    const [currentTab, setCurrentTab] = React.useState(0);

    const [givenType, setGivenType] = React.useState("");
    const [givenId, setGivenId] = React.useState("");

    useEffect(() => {
        if (givenParams.tab) {
            setCurrentTab(tabs[givenParams.tab]);
        }
        if (givenParams.typ) {
            setGivenType(givenParams.typ);
        }
        if (givenParams.fil) {
            setGivenId(givenParams.fil);
        }


    }, [givenParams])

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
                <Box sx={{maxWidth: 1200}}>
                    {currentTab === 0 && (
                        <Sessions typ={givenType} id={givenId} key={`${givenType}-${givenId}`}/>
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
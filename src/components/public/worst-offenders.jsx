import React from 'react';
import {Box, Typography} from "@mui/joy";

const Page = () => {
    return (
        <Box>
            <Box sx = {{display : 'flex', flexDirection : 'column', alignText : 'center', gap : '.5rem'}}>
                <Typography level={"h1"} sx={{fontSize: "110px"}}>100,314</Typography>
                <Typography level={"h2"} sx={{width: "500px"}} textAlign={"center"}>Planes have  been caught flying below the legal altitude in Superior</Typography>
            </Box>
        </Box>
    )
}

export default Page;
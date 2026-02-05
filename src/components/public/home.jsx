import React from 'react';
import {Box, Button, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";

const Page = () => {
    const navigate = useNavigate();





    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem'}}>
                <Typography level={"h1"} sx={{fontSize: "110px"}}>100,314</Typography>
                <Typography level={"h2"} sx={{width: "500px"}} textAlign={"center"}>Planes have  been caught flying below the legal altitude in Superior</Typography>
                <Typography level={"h3"} sx={{color: "light-gray"}}>Since 01/07/2026</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Button
                        color={"neutral"}
                        onClick={() => navigate("/file-report")}>
                        File a complaint
                    </Button>
                    <Button
                        color={"neutral"}
                        variant={"outlined"}
                        onClick={() => navigate("/data-search")}>
                        View Data
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Page;
import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";

async function loadData() {
    const response = await fetch("/cdn/violating_totals.txt");
    const data = await response.text()
    console.log(data);
    return data;
}

const Page = () => {
    const navigate = useNavigate();

    const [data, setData] = useState("");

    useEffect(() => {
        loadData().then(setData);
    }, [])

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                <Typography level={"h1"} sx={{fontSize: "110px", paddingTop: "10vh"}}>{data}</Typography>
                <Typography level={"h2"} sx={{width: "500px"}} textAlign={"center"}>Hours of Low-Altitude Flight</Typography>
                <Typography level={"h3"} sx={{color: "light-gray"}}>Since November 11, 2025</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
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
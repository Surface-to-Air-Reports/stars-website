import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {getGenStats} from "../../utils/getStats";

const Page = () => {
    const navigate = useNavigate();

    const [time, setTime] = useState("");

    useEffect(() => {
        getGenStats().then((result) => {
            let totsec = result["lowtime"];
            let sec = totsec%60;
            let min = Math.floor((totsec%3600)/60);
            let hour = Math.floor(totsec/3600);
            console.log(hour, min, sec);
            setTime(hour+":" + min+":" + sec);
        });
    })

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                <Typography level={"h1"} sx={{fontSize: "110px", paddingTop: "10vh"}}>{time}</Typography>
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
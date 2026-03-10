import React, {useEffect, useState} from 'react';
import {Box, Button, Typography, Tooltip} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {getGenStats} from "../../utils/getStats";
import {secToDurationShort} from "../../utils/secToDurationShort";

const Page = () => {
    const navigate = useNavigate();

    const [time, setTime] = useState("");

    useEffect(() => {
        getGenStats().then((result) => {
            // let totsec = result["lowtime"];
            // let sec = (totsec%60).toString().padStart(2, "0");
            // let min = Math.floor((totsec%3600)/60).toString().padStart(2, "0");
            // let hour = Math.floor(totsec/3600);
            // console.log(hour, min, sec);
            //
            // setTime(hour+":" + min+":" + sec);

            setTime(secToDurationShort(result["lowtime"]));
        });
    }, [])

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                <Typography level={"h1"} sx={{fontSize: "110px", paddingTop: "10vh"}}>{time}</Typography>
                <Typography level={"h2"} sx={{width: "500px"}} textAlign={"center"}>of Low-Altitude Flight</Typography>
                <Typography level={"h3"} sx={{color: "light-gray"}}>Updated March 3rd 2026 {' '}
                    <Tooltip title="Data recording started Novemeber 11th">
                        <Box
                            component="span"
                            sx={{
                                cursor: 'pointer',
                                fontSize: '1.25rem',
                                verticalAlign: 'text-top',
                                color: 'inherit',
                                display: 'inline-block',
                            }}
                        >
                            *
                        </Box>
                    </Tooltip>
                </Typography>
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
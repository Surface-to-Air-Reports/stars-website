import React, {useEffect, useState} from 'react';
import {Box, Button, Typography, Tooltip} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {getGenStats} from "../../utils/getStats";
import {secToDurationShort} from "../../utils/secToDurationShort";

const Page = () => {
    const navigate = useNavigate();

    const [time, setTime] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");

    useEffect(() => {
        getGenStats().then((result) => {
            setTime(secToDurationShort(result["lowtime"]));
            if (result.lastUpdated) {
                const d = new Date(result.lastUpdated);
                setUpdatedDate(d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
            }
        });
    }, [])

    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                <Typography level={"h1"} sx={{fontSize: "110px", paddingTop: "10vh"}}>{time}</Typography>
                <Typography level={"h2"} sx={{width: "500px"}} textAlign={"center"}>of Low-Altitude Flight</Typography>
                <Typography level={"h3"} sx={{color: "light-gray"}}>{updatedDate ? `Updated ${updatedDate}` : ""} {' '}
                    <Tooltip title="Data recording started November 11th">
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

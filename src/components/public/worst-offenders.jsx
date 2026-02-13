import React from 'react';
import {Box, Typography, Button, Card} from "@mui/joy";
import {useNavigate} from "react-router-dom";

const Page = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap : '5rem'}}>
            <Box sx = {{bgcolor: 'background.level1'}}>
                <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center', gap : '1.5rem', py : '5rem'}}>
                    <Typography level={"h4"} textAlign={"center"}  color = {"neutral"}>Check out this weeks</Typography>
                    <Typography level={"h1"} textAlign={"center"} sx = {{fontSize : "50px"}}>SKY OFFENDERS</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap : '.5rem'}}>
                        <Button
                            color={"neutral"}
                            onClick={() => navigate("/file-report")}>
                            Enemy Number 1
                        </Button>
                        <Button
                            color={"neutral"}
                            variant={"outlined"}
                            onClick={() => navigate("/data-search")}>
                            Leaderboard
                        </Button>
                </Box>
                </Box>
            </Box>
            <Box sx = {{
                display : 'flex',
                alignSelf : 'center',
                alignItems : 'flex-end',
                gap : '1rem',
                flexDirection : 'row'}}>
                <Card sx = {{alignItems : 'center', width : 300, height : 200, background : '#804a00'}}>
                    <Typography sx = {{alignText : 'center'}}>
                            N65584
                    </Typography>
                </Card>
                <Card sx = {{alignItems : 'center', width : 300, height : 500, background : '#a57c00'}}>
                    <Typography sx = {{alignText : 'center'}}>
                            N256SF
                    </Typography>
                </Card>
                <Card sx = {{alignItems : 'center', width : 300, height : 300, background : '#71706e'}}>
                    <Typography sx = {{alignText : 'center'}}>
                            N738BJ
                    </Typography>
                </Card>
            </Box>
            <Box sx = {{alignSelf : 'center'}}>
                <Typography sx = {{alignText : 'center'}}>
                    BEHOLD!!
                </Typography>
                <Typography sx = {{alignText : 'center'}}>
                    THE ASSHOLES!!
                </Typography>
            </Box>
        </Box>
    )
}

export default Page;
import React, {useEffect, useState} from 'react';
import {Box, Typography, Card} from "@mui/joy";
import {getTopAircraft} from "../../utils/getTopAircraft";
import {secToDuration} from "../../utils/secToDuration";

const Page = () => {
    const [aircraft, setAircraft] = useState([]);

    useEffect(() => {
        getTopAircraft(3).then(res => {setAircraft(res);});
    }, [])

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap : '5rem'}}>
            <Box sx = {{bgcolor: 'background.level1'}}>
                <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center', gap : '1.5rem', py : '5rem'}}>
                    <Typography level={"h4"} textAlign={"center"}  color = {"neutral"}>Check out this weeks</Typography>
                    <Typography level={"h1"} textAlign={"center"} sx = {{fontSize : "50px"}}>Rankings</Typography>
                </Box>
            </Box>
            <Box sx = {{
                display : 'flex',
                alignSelf : 'center',
                alignItems : 'flex-end',
                gap : '1rem',
                flexDirection : 'row'}}>
                <Box
                 sx ={{
                    display : 'flex',
                    alignItems : 'center',
                    flexDirection : 'column'
                    }}>
                    <Typography
                    level = {"h2"}
                    sx = {{alignText : 'center'}}>
                        {secToDuration(aircraft[2]?.total_violated_seconds || 0)}
                    </Typography>
                    <Card 
                        sx = {{
                            alignItems : 'center',
                            width : 300,
                            height : 200,
                            bgcolor: 'background.level1',
                        }}>
                        {aircraft[2] ? (
                            <>
                                <Typography level = {"h3"} sx = {{alignText : 'center'}}>
                                    {aircraft[2]?.callsign || "Loading..."}
                                </Typography>
                                <Typography level = {"h4"} sx = {{alignText : 'center'}}>
                                    {aircraft[2]?.lowest_altitude || "Loading..."}ft
                                </Typography>
                                <Typography sx = {{alignText : 'center'}}>
                                    {aircraft[2]?.owner_name || "Loading..."}
                                </Typography>
                                <Typography sx = {{alignText : 'center'}}>
                                    {aircraft[2]?.type || "Loading..."}
                                </Typography>
                            </>
                        ) : (
                            <Typography sx = {{alignText : 'center'}}>
                                Loading...
                            </Typography>

                        )}
                    </Card>
                </Box>
                <Box
                sx ={{
                    display : 'flex',
                    alignItems : 'center',
                    flexDirection : 'column'
                    }}>
                <Typography
                level = {"h2"}
                sx = {{alignText : 'center'}}>
                                {secToDuration(aircraft[0]?.total_violated_seconds || 0)}
                </Typography>
                <Card 
                    sx = {{
                        alignItems : 'center',
                        width : 300,
                        height : 500,
                        bgcolor: 'background.level1'
                    }}>
                    
                    {aircraft[0] ? (
                        <>
                            <Typography
                                level = {"h3"}
                                sx = {{alignText : 'center'}}>
                                {aircraft[0]?.callsign || "Loading..."}
                            </Typography>
                            <Typography
                            level = {"h4"}
                            sx = {{alignText : 'center'}}>
                                {aircraft[0]?.lowest_altitude || "Loading..."}ft
                            </Typography>
                            <Typography sx = {{alignText : 'center'}}>
                                {aircraft[0]?.owner_name || "Loading..."}
                            </Typography>
                           <Typography sx = {{alignText : 'center'}}>
                                {aircraft[0]?.type || "Loading..."}
                            </Typography>
                        </>
                    ) : (
                        <Typography sx = {{alignText : 'center'}}>
                            Loading...
                        </Typography>

                    )}
                </Card>
                </Box>
                <Box
                sx ={{
                    display : 'flex',
                    alignItems : 'center',
                    flexDirection : 'column'
                    }}>
                <Typography
                    level = {"h2"}
                    sx = {{alignText : 'center'}}>
                        {secToDuration(aircraft[1]?.total_violated_seconds || 0)}
                </Typography>
                <Card

                    sx = {{
                        alignItems : 'center',
                        width : 300,
                        height : 300,
                        bgcolor: 'background.level1'
                    }}>
                    
                    {aircraft[1] ? (
                        <>
                            <Typography level = {"h3"} sx = {{alignText : 'center'}}>
                                {aircraft[1]?.callsign || "Loading..."}
                            </Typography>
                            <Typography level = {"h4"} sx = {{alignText : 'center'}}>
                                {aircraft[1]?.lowest_altitude || "Loading..."}ft
                            </Typography>
                            <Typography sx = {{alignText : 'center'}}>
                                {aircraft[1]?.owner_name || "Loading..."}
                            </Typography>
                            <Typography sx = {{alignText : 'center'}}>
                                {aircraft[1]?.type || "Loading..."}
                            </Typography>
                        </>
                    ) : (
                        <Typography sx = {{alignText : 'center'}}>
                            Loading...
                        </Typography>

                    )}
                </Card>
                </Box>
            </Box>
            <Box sx = {{alignSelf : 'center'}}>

            </Box>
        </Box>
    )
}

export default Page;
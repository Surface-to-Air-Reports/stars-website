import React, {useEffect, useState} from 'react';
import {Box, Typography, Card, Divider} from "@mui/joy";
import { BarChart } from '@mui/x-charts/BarChart';
import {getFrequencyStats, getAltitudeStats, getTopAircraft} from '../../utils/getStats'
import {secToDurationShort} from '../../utils/secToDurationShort'



const Page = () => {
    const [frequencyTimes, setFrequencyTimes] = useState([]);
    const [frequencyCounts, setFrequencyCounts] = useState([]);
    const [frequencyDuration, setFrequencyDuration] = useState([]);
    const [altitudeBrackets, setAltitudeBrackets] = useState([]);
    const [altitudeCounts, setAltitudeCounts] = useState([]);
    const [altitudeDuration, setAltitudeDuration] = useState([]);
    const [aircraftRankings, setAircraftRankings] = useState([])

    useEffect(() => {
        getTopAircraft(5).then(res => {
            const callsigns = [];
            const airtimes = [];
            const top = [];
            for(let i = 0; i < res.length;  i++){
                const tmp = {};
                callsigns.push(res[i].callsign);
                airtimes.push(res[i].total_violated_seconds);
                tmp.callsign = callsigns[i];
                tmp.airtime = airtimes[i];
                top.push(tmp);
            }
            setAircraftRankings(top);
        });
        
    }, [])

    useEffect(() => {
        getFrequencyStats().then(result => {
            const times = [];
            const counts = [];
            const durations = [];
            for(let i = 7; i < Object.keys(result).length; i++){
                times.push((i-6)+":00");
                counts.push(result[i].unique_planes)
                durations.push(result[i].total_violated_seconds)
            }
            for(let i = 0; i < 7; i++){
                times.push((i-6+24)+":00");
                counts.push(result[i].unique_planes)
                durations.push(result[i].total_violated_seconds)

            }
            setFrequencyTimes(times);
            setFrequencyCounts(counts);
            setFrequencyDuration(durations);
        })
    }, [])


        useEffect(() => {
        getAltitudeStats().then(result => {
            console.log(result);
            const brackets = [];
            const counts = [];
            const durations = [];
            for(let key in result){
                brackets.push(key);
                counts.push(result[key].unique_planes)
                durations.push(result[key].total_violated_seconds)
            }
            setAltitudeBrackets(brackets);
            setAltitudeCounts(counts);
            setAltitudeDuration(durations);
        })
    }, [])

    useEffect(() => {
        console.log(altitudeBrackets)
        console.log(altitudeCounts)
        console.log(altitudeDuration)
    }, [altitudeBrackets, altitudeCounts, altitudeDuration])


    return (
        <Box sx={{display: "flex", flexDirection: "column", gap : '1.5rem', alignItems: 'center'}}>
            <Typography level={"h1"}>Statistics</Typography>
            <Typography level={"h2"} textAlign={"center"} sx = {{fontSize : "100px"}}>861</Typography>
            <Typography level={"h3"} textAlign={"center"}  color = {"neutral"}>Planes recorded at low altitudes</Typography>
            <Divider>

            </Divider>
            <Box sx = {{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                <Card
                variant = 'soft'
                sx = {{width: 350}}>
                    <Typography level={"title-md"} textAlign={"center"}  color = {"neutral"}>Frequency per hour</Typography>
                    <BarChart
                        xAxis={[{ data: frequencyTimes }]}
                        yAxis={[
                            { id: "left", position: "left" },
                            { id: "right", position: "right" }
                        ]}
                        series={[
                            {
                                data: frequencyCounts,
                                label: "Sessions",
                                yAxisId: "left"
                            },
                            {
                                data: frequencyDuration,
                                label: "Total Time",
                                yAxisId: "right"
                            }
                        ]}
                        height={300}
                    />
                </Card>
                <Card
                variant = 'soft'
                sx = {{width: 350}}>
                    <Typography level={"title-md"} textAlign={"center"}  color = {"neutral"}>Aircraft Altitudes</Typography>
                    <BarChart
                        xAxis={[{ data: altitudeBrackets }]}
                        yAxis={[
                            { id: "left", position: "left" },
                            { id: "right", position: "right" }
                        ]}
                        series={[
                            {
                                data: altitudeCounts,
                                label: "Sessions",
                                yAxisId: "left"
                            },
                            {
                                data: altitudeDuration,
                                label: "Total Time",
                                yAxisId: "right"
                            }
                        ]}
                        height={300}
                        slotProps={{
                            tooltip: {
                                sx: {
                                    '& .MuiChartsTooltip-root': {
                                        backgroundColor: 'white',
                                        opacity: 1,
                                    }
                                }
                            }
                        }}
                    />                        
                    

                </Card>
                <Card 
                variant = 'soft'
                sx = {{width: 350}}>
                    <Typography level={"title-md"} textAlign={"center"}  color = {"neutral"}>Frequent Fliers</Typography>
                    <BarChart
                        layout = 'horizontal'
                        dataset = {aircraftRankings}
                        xAxis ={[{
                            label : 'Time'
                        }]}
                        yAxis={[{ dataKey: 'callsign' }]}
                        series={[{ dataKey: 'airtime', valueFormatter: secToDurationShort }]}
                        height={300}
                    />
                </Card>
            </Box>
        </Box>
    )
}

export default Page;

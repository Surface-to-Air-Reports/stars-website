import React, {useEffect, useState} from 'react';
import {Box, Typography, Card, Divider} from "@mui/joy";
import { BarChart } from '@mui/x-charts/BarChart';
import {getFrequencyStats} from '../../utils/getStats'



const Page = () => {
    const [frequencyData, setFrequencyData] = useState({});
    const [frequencyTimes, setFrequencyTimes] = useState([]);
    // const [frequencyCount, setFrequencyCount] = useState([]);
    // const [frequencyDuration, setFrequencyDuration] = useState([]);


    useEffect(() => {
        getFrequencyStats().then(result => {
            setFrequencyData(result);
            for(let i = 0; i < Object.keys(result).length; i++){
                setFrequencyTimes([...frequencyTimes, (i+1)+":00"]);
            }


        })
    }, [])


    return (
        <Box sx={{display: "flex", flexDirection: "column", gap : '2.5rem', alignItems: 'center'}}>
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
                        series={[{ data: [1,2,3,4,5,6,7,8,9,10,11,12,12,11,10,9,8,7,6,5,4,3,2,1] }]}
                        height={300}
                    />
                </Card>
                <Card
                variant = 'soft'
                sx = {{width: 350}}>
                    <Typography level={"title-md"} textAlign={"center"}  color = {"neutral"}>Aircraft Altitudes</Typography>
                    <BarChart
                        layout = 'horizontal'
                        yAxis={[{ data: ['450-500','400-450','350-400','300-350','250-300','200-250','150-200','100-150','50-100','0-50'] }]}
                        series={[{ data: [50,45,40,35,30,25,20,15,10,5] }]}
                        height={300}
                    />
                </Card>
                <Card 
                variant = 'soft'
                sx = {{width: 350}}>
                    <Typography level={"title-md"} textAlign={"center"}  color = {"neutral"}>Frequent Fliers</Typography>
                    <BarChart
                        layout = 'horizontal'
                        yAxis={[{ data: ['N256SF','N738BJ','N65584','Joe','Mama'] }]}
                        series={[{ data: [180, 162, 156, 130, 100] }]}
                        height={300}
                    />
                </Card>
            </Box>
        </Box>
    )
}

export default Page;

import React from 'react';
import {Box, Typography, Card, Divider} from "@mui/joy";
import { BarChart } from '@mui/x-charts/BarChart';

const page = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap : '2.5rem', alignItems: 'center'}}>
            <Card variant = 'soft' sx = {{
                width: 500,}}>
                <Typography level={"h1"} textAlign={"center"} sx = {{fontSize : "100px"}}>10,000</Typography>
                <Typography level={"h4"} textAlign={"center"}  color = {"neutral"}>Time Below 500 ft</Typography>
            </Card>S
            <Divider>

            </Divider>
            <Box sx = {{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                <Card
                variant = 'soft'
                sx = {{width: 350}}>
                    <Typography level={"title-md"} textAlign={"center"}  color = {"neutral"}>Frequency per hour</Typography>
                    <BarChart
                        xAxis={[{ data: ['0:00', '1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00',
                            '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00',] }]}
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

export default page;
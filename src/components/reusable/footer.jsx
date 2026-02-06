import React from 'react';
import {Box, Link, List, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <Box sx = {{display: 'flex',
            flexDirection: 'row',
            borderTop: "1px solid",
            borderColor: "divider",
            paddingTop: "1rem",
            justifyContent: "space-between"
        }} >
            <Box sx ={{display: 'flex', flexDirection: 'column', gap: '.5rem', padding: '1rem'}}>
                <Typography level = {'h4'}>
                    Surface To Air Reports
                </Typography>
                <Typography width = {'500px'}>
                    Calibrated flight information of planes flying over altitude restricted sections of Superior Colorado
                </Typography>
            </Box>

            <Box>
                <Typography>Learn More</Typography>
                <List>
                    <Link onClick={() => navigate("/blog")}>Blog</Link>
                    <Link onClick={() => navigate("/about")}>About</Link>
                    <Link onClick={() => navigate("/methodology")}>Methodology</Link>
                    <Link onClick={() => navigate("/tos")}>Terms of Service</Link>
                    <Link onClick={() => navigate("/privacy")}>Privacy Policy</Link>
                    <Link href={"https://github.com/Surface-to-Air-Reports"}>Github</Link>
                </List>
            </Box>
        </Box>


    )
}

export default Footer;
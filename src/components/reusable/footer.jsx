import React from 'react';
import {Box, Link, List, useColorScheme} from "@mui/joy";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const {mode, setMode} = useColorScheme();

    return (
        <Box sx = {{
            display: 'flex',
            flexDirection: 'row',
            borderTop: "1px solid",
            borderColor: "divider",
            paddingTop: "1rem",
            paddingBottom: "2rem",
            padding: "1rem",
            justifyContent: 'space-between',
            alignItems: "center"

        }}
             component="footer"
        >
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '.5rem',}}>
                {(mode === "light" || mode === "system") && (
                    <img alt={"Logo"} src={"/cdn/STARlogo.png"} width={"35px"} onClick={() => navigate("/")}
                         style={{cursor: 'pointer'}}/>
                )}
                {mode === "dark" && (
                    <img alt={"Logo"} src={"/cdn/DarkModeLogo.png"} width={"35px"} onClick={() => navigate("/")}
                         style={{cursor: 'pointer'}}/>
                )}
            </Box>

            <Box>
                <List sx={{display: 'flex', flexDirection: 'row', gap: '.5rem'}}>
                <Link onClick={() => navigate("/blog")}>Blog</Link>
                    <Link onClick={() => navigate("/about")}>About</Link>
                    <Link onClick={() => navigate("/methodology")}>Methodology</Link>
                    <Link onClick={() => navigate("/tos")}>Terms of Use</Link>
                    <Link onClick={() => navigate("/privacy")}>Privacy Policy</Link>
                    <Link href={"https://github.com/Surface-to-Air-Reports"}>Github</Link>
                </List>
            </Box>
        </Box>


    )
}

export default Footer;
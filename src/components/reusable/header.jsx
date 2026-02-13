import React from 'react';
import {Link, Box, useColorScheme, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import ModeToggle from "./ModeToggle";

const Header = () => {
    const navigate = useNavigate();

    const {mode, setMode} = useColorScheme();

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box style={{display: 'flex', flexDirection: 'row', padding: '1rem', gap: '1rem', cursor: 'pointer', alignItems: "center"}} onClick={() => navigate("/")}>
                {(mode === "light" || mode === "system") && (
                    <img alt={"Logo"} src={"/cdn/STARlogo.png"} width={"50px"} />
                )}
                {mode === "dark" && (
                    <img alt={"Logo"} src={"/cdn/DarkModeLogo.png"} width={"50px"} />
                )}
                <Typography level="h3">Surface to Air Reports</Typography>
            </Box>
            <Box style={{display: 'flex', flexDirection: 'row', padding: '1rem', gap: '1rem', alignItems: "center"}}>
            <Link onClick={() => navigate("/data-search")} color = {"neutral"}>Data Search</Link>
                <Link onClick={() => navigate("/worst-offenders")} color = {"neutral"}>Worst Offenders</Link>
                <Link onClick={() => navigate("/statistics")} color = {"neutral"}>Statistics</Link>
                <Link onClick={() => navigate("/affected-areas")} color = {"neutral"}>Affected Areas</Link>
                <Link onClick={() => navigate("/file-report")} color = {"neutral"}>File a Report</Link>
                <ModeToggle sx={{ ml: 'auto' }} />
            </Box>
        </Box>

    )
}

export default Header;
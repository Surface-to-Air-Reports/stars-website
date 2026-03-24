import React from 'react';
import {Link, Box, useColorScheme, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import ModeToggle from "./ModeToggle";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);   

  return null;
};

const Header = () => {
    const navigate = useNavigate();

    const {mode} = useColorScheme();

    return (
        <>
        <ScrollToTop />

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
                <Link onClick={() => navigate("/rankings")} color = {"neutral"}>Rankings</Link>
                <Link onClick={() => navigate("/statistics")} color = {"neutral"}>Statistics</Link>
                <Link onClick={() => navigate("/affected-areas")} color = {"neutral"}>Affected Areas</Link>
                <Link onClick={() => navigate("/file-report")} color = {"neutral"}>File a Report</Link>
                <ModeToggle sx={{ ml: 'auto' }} />
            </Box>
        </Box>
    </>
    )
}

export default Header;
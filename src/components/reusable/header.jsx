import React from 'react';
import {Link, Box} from "@mui/joy";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box style={{display: 'flex', flexDirection: 'row', padding: '1rem', gap: '1rem'}}>
                <img alt={"Logo"} src={"/cdn/logo.png"} width={"200px"} onClick={()=>navigate("/")} />
            </Box>
            <Box style={{display: 'flex', flexDirection: 'row', padding: '1rem', gap: '1rem'}}>
                <Link onClick={() => navigate("/about")}
                      color = {"neutral"}

                >
                    About
                </Link>
                <Link onClick={() => navigate("/affected-areas")} color = {"neutral"}>Affected Areas</Link>
                <Link onClick={() => navigate("/blog")} color = {"neutral"}>Blog</Link>
                <Link onClick={() => navigate("/data-search")} color = {"neutral"}>Data Search</Link>
                <Link onClick={() => navigate("/file-report")} color = {"neutral"}>File Report</Link>
                <Link onClick={() => navigate("/methodology")} color = {"neutral"}>Methodology</Link>
                <Link onClick={() => navigate("/statistics")} color = {"neutral"}>Statistics</Link>
                <Link onClick={() => navigate("/worst-offenders")} color = {"neutral"}>Worst Offenders</Link>
            </Box>
        </Box>

    )
}

export default Header;
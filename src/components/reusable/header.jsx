import React from 'react';
import {Link} from "@mui/joy";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Link onClick={() => navigate("/about")}>about</Link>
            <Link onClick={() => navigate("/affected-areas")}>affected areas</Link>
            <Link onClick={() => navigate("/blog")}>blog</Link>
            <Link onClick={() => navigate("/data-search")}>data search</Link>
            <Link onClick={() => navigate("/file-report")}>file report</Link>
            <Link onClick={() => navigate("/")}>home</Link>
            <Link onClick={() => navigate("/methodology")}>methodology</Link>
            <Link onClick={() => navigate("/statistics")}>statistics</Link>
            <Link onClick={() => navigate("/worst-offenders")}>worst offenders</Link>
        </div>

    )
}

export default Header;
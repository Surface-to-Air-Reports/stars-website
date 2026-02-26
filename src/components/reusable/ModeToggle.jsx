import React from 'react';
import {Card, useColorScheme} from "@mui/joy";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ComputerIcon from '@mui/icons-material/Computer';

function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    if (mode === "light") {
        return(<Card onClick={() => setMode("dark")} sx={{padding: "8px"}} variant={"outlined"}>
            <LightModeIcon />
        </Card>)
    }
    if (mode === "dark") {
        return (<Card onClick={() => setMode("light")} sx={{padding: "8px"}} variant={"outlined"}>
            <DarkModeIcon />
        </Card>)
    }
    if (mode === "system") {
        return (<Card onClick={() => setMode("dark")} sx={{padding: "8px"}} variant={"outlined"}>
            <ComputerIcon />
        </Card>)
    }


    }

export default ModeToggle;
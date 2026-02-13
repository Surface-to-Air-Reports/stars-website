import React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {Box, useColorScheme} from "@mui/joy";

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
        return(<Box onClick={() => setMode("dark")}>
            <LightModeIcon />
        </Box>)
    }
    if (mode === "dark") {
        return (<Box onClick={() => setMode("light")}>
            <DarkModeIcon />
        </Box>)
    }
    if (mode === "system") {
        return (<Box onClick={() => setMode("dark")}>
            <ComputerIcon />
        </Box>)
    }


    }

export default ModeToggle;
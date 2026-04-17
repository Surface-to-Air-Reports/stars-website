import React from 'react';
import { Box, Typography, Button, Container} from "@mui/joy";
import InteractiveMap from "./affected-areas-tabs/interactive-map";

const Page = () => {
    const [currentTab, setCurrentTab] = React.useState(0);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: '2.5rem', alignItems: 'center' }}>
            <Typography level={"h1"}>Affected Areas</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                <Button
                    color={"neutral"}
                    variant={currentTab === 0 ? 'solid' : 'outlined'}
                    onClick={() => setCurrentTab(0)}>
                    Heatmap
                </Button>
                <Button
                    color={"neutral"}
                    variant={currentTab === 1 ? 'solid' : 'outlined'}
                    onClick={() => setCurrentTab(1)}>
                    Interactive Map
                </Button>
            </Box>

            {/* Always mounted, just hidden with CSS */}
            <Container maxWidth="lg">
                <Box sx={{ display: currentTab === 0 ? 'block' : 'none', width: "100%", borderRadius: 2, overflow: "hidden" }}>
                    <img
                        src="\cdn\Placeholder-Map-Image.png"
                        alt="Heatmap of affected areas"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </Box>
            
            {/* Always mounted, just hidden with CSS */}
            <Box sx={{ display: currentTab === 1 ? 'block' : 'none', width: '100%' }}>
                 <InteractiveMap isVisible={currentTab === 1} />
            </Box>
            </Container>
        
        </Box>
    );
};

export default Page;
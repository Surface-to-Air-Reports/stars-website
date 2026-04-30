import React from 'react';
import { Box, Typography, Button, Container } from "@mui/joy";
import { useColorScheme } from '@mui/joy';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import InteractiveMap from "./affected-areas-tabs/interactive-map";

const OVERLAY_BOUNDS = [[39.82, -105.22], [39.98, -105.02]];
const MAP_CENTER = [39.919, -105.125];
const MAP_ZOOM = 13;

const HeatmapOverlayMap = () => {
    const { mode } = useColorScheme();

    return (
        <Box sx={{
            width: "100%",
            aspectRatio: "8000 / 6000",
            borderRadius: 10,
            overflow: "hidden",
        }}>
            <MapContainer
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
                dragging={false}
                touchZoom={false}
                doubleClickZoom={false}
                boxZoom={false}
                keyboard={false}
                zoomControl={false}
                attributionControl={true}
            >
                <TileLayer
                    key={mode}
                    attribution={mode === "dark"
                        ? "© CartoDB"
                        : "© OpenStreetMap contributors"}
                    url={mode === "dark"
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <ImageOverlay
                    url="/cdn/heatmap_low.png"
                    bounds={OVERLAY_BOUNDS}
                    opacity={0.85}
                    zIndex={10}
                />
            </MapContainer>
        </Box>
    );
};

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

            <Container maxWidth="lg">
                {/* Heatmap tab — Leaflet map with image overlay */}
                <Box sx={{ display: currentTab === 0 ? 'block' : 'none', width: "100%" }}>
                    <HeatmapOverlayMap />
                </Box>

                {/* Interactive map tab — always mounted, hidden with CSS */}
                <Box sx={{ display: currentTab === 1 ? 'block' : 'none', width: '100%' }}>
                    <InteractiveMap isVisible={currentTab === 1} />
                </Box>
            </Container>
        </Box>
    );
};

export default Page;
import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Button, Slider, CircularProgress } from "@mui/joy";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getSessionsByDate } from '../../../utils/getSessionsByDate.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const ResizeMap = ({ isVisible }) => {
    const map = useMap();
    useEffect(() => {
        if (isVisible) {
            setTimeout(() => map.invalidateSize(), 100);
        }
    }, [isVisible, map]);
    return null;
};

const getBearing = (lat1, lon1, lat2, lon2) => {
  const toRad = d => (d * Math.PI) / 180;
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
};

const makePlaneIcon = (bearing = 0) =>
  L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<svg width="28" height="28" viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
            style="transform:rotate(${bearing}deg);transform-origin:center">
      <path d="M14 2 L17 12 L26 14 L17 16 L16 24 L14 22 L12 24 L11 16 L2 14 L11 12 Z"
            fill="#3b82f6" stroke="white" stroke-width="1.2"/>
    </svg>`,
  });

const InteractiveMap = ({ isVisible }) => {
    // Initialized to empty string to keep the input controlled
    const [selectedDate, setSelectedDate] = useState(""); 
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [dayStart, setDayStart] = useState(0);
    const [dayEnd, setDayEnd] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const playRef = useRef(null);

    const fetchSessions = async () => {
        if (!selectedDate) return;

        setLoading(true);
        setError(null);
        setIsPlaying(false);
        setSessions([]);

        try {
            const { sessions: allSessions, startTs, endTs } = await getSessionsByDate(selectedDate);

            setSessions(allSessions);
            setDayStart(startTs);
            setDayEnd(endTs);
            setCurrentTime(startTs);

                const startTs = new Date(startIso).getTime() / 1000;
                const endTs   = new Date(endIso).getTime() / 1000;

                setDayStart(startTs);
                setDayEnd(endTs);
                setCurrentTime(startTs);

                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
            }
        };
        useEffect(() => {
            if (isPlaying) {
                playRef.current = setInterval(() => {setCurrentTime(prev => {
                        if (prev >= dayEnd) {
                            setIsPlaying(false);
                            return dayEnd;
                        }
                        return prev + 5; // advance x seconds per tick
                    });}, 50);

            } else {clearInterval(playRef.current);}

            return () => clearInterval(playRef.current);

        }, [isPlaying, dayEnd]);

        const getSessionAtTime = (session) => {
            const pings = session.pings;
            if (!pings || pings.length === 0) return null;

            const timed = pings.map(p => ({...p,ts: new Date(p.time.replace(' ', 'T')).getTime() / 1000,}));

            const sessionStart = timed[0].ts;
            const sessionEnd = timed[timed.length - 1].ts;

            if (currentTime < sessionStart || currentTime > sessionEnd) return null;

                    
            let idx = 0;
            for (let i = 0; i < timed.length; i++) {
                if (Math.abs(timed[i].ts - currentTime) < Math.abs(timed[idx].ts - currentTime))
                idx = i;
            }
            const closest = timed[idx];

            // Bearing
            const prev = idx > 0 ? timed[idx - 1] : closest;
            const bearing = (prev.lat === closest.lat && prev.lon === closest.lon)
                ? 0
                : getBearing(prev.lat, prev.lon, closest.lat, closest.lon);

            const trail = timed
                .filter(p => p.ts <= currentTime)
                .map(p => [p.lat, p.lon]);

            return { position: [closest.lat, closest.lon], trail, alt: closest.alt, bearing };

        };

        const formatTime = (ts) => {
            if (!ts) return '--:--';
            return new Date(ts * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false,});
        };

        const activeSessions = sessions
            .map(s => ({ ...s, computed: getSessionAtTime(s) }))
            .filter(s => s.computed !== null);

        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: '2rem', alignItems: 'center', width: '100%' }}>

                {/*Date Picker*/}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Typography level="body-md">Select date:</Typography>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
                    />
                    <Button 
                        onClick={fetchSessions} 
                        disabled={!selectedDate || loading}
                        size="sm"
                        color= 'neutral'
                    >
                        Load Flights
                    </Button>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <CircularProgress size="sm" />
                        <Typography level="body-sm" color="neutral">Loading sessions...</Typography>
                    </Box>
                )}
                {error && <Typography color="danger">Error: {error}</Typography>}

                {!loading && sessions.length === 0 && !error && selectedDate && (
                    <Typography level="body-sm" color="neutral">No sessions currently loaded.</Typography>
                )}
                

                {/* Time slider */}
                {sessions.length > 0 && (
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color = 'neutral'
                                onClick={() => setIsPlaying(p => !p)}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Typography level="body-sm" sx={{ minWidth: 60 }}>
                                {formatTime(currentTime)}
                            </Typography>
                            <Typography level="body-sm" color="neutral">
                                {activeSessions.length} active flights · {sessions.length} total sessions loaded
                            </Typography>
                        </Box>

                        <Box sx={{ position: 'relative', width: '100%', height: '12px', mb: '-8px' }}>
                            {sessions.map((session) => {
                                if (!session.pings || session.pings.length === 0) return null;
                                const pings = session.pings.map(p =>
                                    new Date(p.time.replace(' ', 'T')).getTime() / 1000
                                );

                                const sStart = pings[0];
                                const sEnd   = pings[pings.length - 1];
                                const leftPct  = ((sStart - dayStart) / (dayEnd - dayStart)) * 100;
                                const widthPct = ((sEnd - sStart)     / (dayEnd - dayStart)) * 100;
                                return (

                                    <Box
                                        key={`tick-${session.callsign}-${session.session_start}`}
                                        title={`${session.callsign} · ${formatTime(sStart)} – ${formatTime(sEnd)}`}
                                        sx={{
                                        position: 'absolute',
                                        left:   `${leftPct}%`,
                                        width:  `max(${widthPct}%, 2px)`,
                                        height: '8px',
                                        bottom: 0,
                                        background: '#3b82f6',
                                        opacity: 0.55,
                                        borderRadius: '2px',
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 1 },
                                        }}
                                        onClick={() => setCurrentTime(sStart)}
                                    />
                                );
                            })}
                        </Box>
                        <Slider
                            min={dayStart}
                            max={dayEnd}
                            value={currentTime}
                            onChange={(_, val) => setCurrentTime(val)}
                            sx={{ width: '100%' }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography level="body-xs" color="neutral">12:00 AM</Typography>
                            <Typography level="body-xs" color="neutral">11:59 PM</Typography>
                        </Box>
                    </Box>
                )}

                {/* Map */}
                <Box sx={{
                    height: "800px",
                    width: "100%",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: '2px solid neutral',
                }}>
                    <MapContainer
                        center={[39.93, -105.146]}
                        zoom={13}   
                        minZoom={13}
                        maxBounds={[
                            [39.872763, -105.254432],
                            [39.989165, -105.044289],
                        ]}
                        maxBoundsViscosity={.5}
                        style={{ height: "100%", width: "100%" }}
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
                        <ResizeMap isVisible={isVisible} />
                        <RecenterButton mode={mode}/>

                        {activeSessions.map((session) => (
                            <React.Fragment key={`${session.callsign}-${session.session_start}`}>
                                {session.computed.trail.length > 1 && (
                                    <Polyline
                                        positions={session.computed.trail}
                                        color="#3b82f6"
                                        weight={2}
                                        opacity={0.7}
                                    />
                                )}
                            <Marker position={session.computed.position}
                                icon={makePlaneIcon(session.computed.bearing)}>
                                    <Popup>
                                        <strong>{session.callsign}</strong><br />
                                        {session.owner || 'Unknown owner'}<br />
                                        {session.aircraft_type || 'Unknown type'}<br />
                                        Alt: {session.computed.alt?.toLocaleString()} ft<br />
                                        Session start: {session.session_start}
                                    </Popup>
                                </Marker>
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </Box>
            </Box>
        );
    };

    export default InteractiveMap;
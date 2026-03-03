import React from 'react';

const page = () => {
    return (
        <div>
            <h1>Methodology</h1>
            Since 11/20/2025, we have had an antenna zip tied to a fence in Rock Creek. This antenna dumps ADSB Basestation data to the raspberry pi connected to it.
            This raspberry pi then sorts the data by which one is inside the FAA defined residential area, and flying below the 1000 ft threshold.
            However, Tte altitude given by airplanes use barometric pressure, which is inaccurate at boulders elevation above sea level.
            The raspberry pi recalculates the altitude in accordance to the following formula: barometric altitude + ((pressure at position (in inches of mercury) - standard pressure (29.92)) * 1000)
                *The actual pressure is determined by closest reading from https://mesonet.agron.iastate.edu/request/download.phtml?network=CO_ASOS (usually Rocky Mountain Metropolitan Airport)
            The timestamp, altitude, latitude, longitude, and callsign are then stored in a CSV file and periodically uploaded to this website!
        </div>
    )
}

export default page;

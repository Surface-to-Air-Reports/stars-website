import React from 'react';
import { Box, Typography, Link, Container } from '@mui/joy';
const page = () => {
    return (
    <Container maxWidth="lg">
        <Box sx={{ my: 6 }}>
        <Typography level="h1" sx={{ mb: 2 }}>
                  Methodology
                </Typography>
      <Typography sx={{ mb: 2 }}>
        Since November 20th, 2025, our team has operated an antenna in Rock Creek
        that records ADS-B Basestation data and feeds it to a Raspberry Pi
        connected to it. This Raspberry Pi processes the data by removing
        records outside the FAA-defined residential area <Link
          href="https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/vfr/"
          target="_blank"

        >
        (learn more about this area) 
        </Link>
        {" "}as well as records from aircraft above 1,000 ft.
      </Typography>

      <Typography sx={{ mb: 2 }}>
        However, the altitude transmitted by aircraft flying near Rocky Mountain
        Metropolitan Airport is calculated using standard barometric pressure,
        which can introduce inaccuracies at lower elevations due to local
        pressure fluctuations. The Raspberry Pi therefore recalculates the
        altitude using the following formula:
      </Typography>

      <Box
        sx={{
          textAlign: "center",
          fontFamily: "serif",
          fontSize: "1.3rem",
          my: 2,
          letterSpacing: "0.02em",
        }}
      >
        <strong>PA</strong> = <strong>BA</strong> + [(<strong>P</strong> − 29.92) ×
        1000]
      </Box>

      <Typography sx={{ mb: 2 }}>
        <strong>Where:</strong>
        <br />
        <strong>PA</strong> = Pressure Altitude
        <br />
        <strong>BA</strong> = Barometric Altitude
        <br />
        <strong>P</strong> = Local pressure (inHg)
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <strong>*The actual pressure value is determined from the closest
        available reading from </strong>
        <Link
          href="https://mesonet.agron.iastate.edu/request/download.phtml?network=CO_ASOS"
          target="_blank"
        >
          the Iowa State Mesonet ASOS network
        </Link>
        <strong>, typically the station at Rocky Mountain Metropolitan Airport.</strong>
      </Typography>

      <Typography>
        The timestamp, altitude, latitude, longitude, and callsign are then
        stored in a CSV file and periodically uploaded to this website.
      </Typography>
      </Box>
    </Container>
      
    );
}

export default page;

import React from 'react';
import { Box, Typography, Container, Grid, useColorScheme, Link} from '@mui/joy';


const Page = () => {

    const {mode} = useColorScheme();
    return (
        <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* left side*/}
          <Grid item xs={12} md={6}>
            <Typography level="h1" fontWeight="bold" sx={{ mb: 2, lineHeight:1.4 }}>
            Supporting aviation safety and transparency one plane at a time.
            </Typography>

            <Typography  sx={{  mb: 3, lineHeight:1.6 }}>
              Founded by a small team of students to bring awareness 
              to the flight patterns of the Rocky Mountain Metropolitan 
              Airport. S.T.A.Rs offers local flight tracking, mathematical 
              recalculations, and visuals to help individuals better understand this situation.

            </Typography>
                        
                          <Link href="mailto:contact@stars80027.com">contact@stars80027.com</Link>

          </Grid>

          {/* right side */}
          <Grid item xs={12} md={6}>
            <Box
                component="img"
                src={mode === "dark"? "/cdn/DarkModeLogo.png": "/cdn/STARlogo.png"}
                alt="logo"
                sx={{width: "100%",maxWidth: "500px", display: "block",margin: "0 auto",pt: 8,}}
            />
          </Grid>

        </Grid>
      </Container>
    );
}

export default Page;

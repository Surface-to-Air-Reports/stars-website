import * as React from "react";
import { Container, Typography, Box, List, ListItem } from "@mui/joy";

export default function TermsOfUse() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
        <Typography level="h1" sx={{ mb: 2 }}>
          Terms of Use
        </Typography>

        <Typography level="body-sm" sx={{ mb: 4 }}>
          Last Updated: [IDK Date or smth] 
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            1. Project Purpose
          </Typography>
          <Typography>
            This platform is a student-led research project designed to analyze
            publicly available flight tracking data and present derived altitude
            calculations and related analytics. The purpose of this platform is
            educational, informational, and community-focused.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            2. Nature of the Data
          </Typography>
          <Typography>
            Altitude values and related metrics presented on this platform are
            derived estimates based on publicly available tracking data and
            locally adjusted atmospheric pressure calculations. These values may
            contain margins of error and may differ from official aviation
            records.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            3. No Regulatory Determinations
          </Typography>
          <Typography>
            The platform does not determine legal violations, regulatory
            noncompliance, or unlawful conduct. Any summaries, rankings, or
            metrics reflect automated analytical calculations and should not be
            interpreted as official findings or enforcement conclusions.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            4. Not for Operational Aviation Use
          </Typography>
          <Typography>
            This platform is not certified for aviation navigation, air traffic
            control, or real-time flight safety decisions. The data presented
            should not be relied upon for operational purposes.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            5. License and Attribution
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Unless otherwise stated, datasets made available through this
            platform are licensed under a Creative Commons Attribution-
            NonCommercial 4.0 International (CC BY-NC 4.0) license.
          </Typography>

          <List>
            <ListItem>
              Users may share and adapt the data for non-commercial purposes.
            </ListItem>
            <ListItem>
              Public use must provide clear attribution to [Project Name].
            </ListItem>
            <ListItem>
              Commercial redistribution or resale is not permitted without
              written permission.
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            6. Responsible Use
          </Typography>
          <Typography>
            Users may not use data from this platform to harass, defame, or
            target individuals or organizations. The data is intended for
            research, transparency, and informed discussion.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            7. Limitation of Liability
          </Typography>
          <Typography>
            To the fullest extent permitted by law, the project creators assume
            no liability for errors, omissions, or outcomes resulting from the
            use or interpretation of the data provided.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h3" sx={{ mb: 1 }}>
            7. Privacy
          </Typography>
          <Typography>
            This site does not collect personal identifying information from
            users. No user accounts, tracking systems, or behavioral analytics
            are implemented.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

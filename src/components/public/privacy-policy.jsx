import * as React from "react";
import { Container, Typography, Box, List,ListItem} from "@mui/joy";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
        <Typography level="h1" sx={{ mb: 2 }}>
          Privacy Policy
        </Typography>

        <Typography level="body-sm" sx={{ mb: 4 }}>
          Last Updated: 2/26/26 
        </Typography>
        <Box sx={{ mb: 4 }}>

            <Typography level="body-sm" sx={{ mb: 2 }}>
            <strong>Effective Date:</strong> 2/26/26
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            1. Introduction
            </Typography>
            <Typography sx={{ mb: 2 }}>
            This Privacy Policy explains how information is handled when you visit
            this website (“Site”). By using the Site, you agree to the practices
            described here.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            2. Information We Do Not Collect Directly
            </Typography>
            <Typography sx={{ mb: 2 }}>
            We do not directly collect personal information such as your name,
            email address, or payment details unless you voluntarily provide it
            through forms or communications.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            3. Hosting and Automatically Collected Data
            </Typography>
            <Typography sx={{ mb: 1 }}>
            This Site is hosted by Vercel. As our hosting provider, Vercel may
            automatically collect certain technical information when you visit
            the Site, including:
            </Typography>

            <List sx={{ listStyleType: "disc", pl: 3, mb: 2 }}>
            <ListItem sx={{ display: "list-item" }}>IP address</ListItem>
            <ListItem sx={{ display: "list-item" }}>Browser type and version</ListItem>
            <ListItem sx={{ display: "list-item" }}>Operating system</ListItem>
            <ListItem sx={{ display: "list-item" }}>Referring URLs</ListItem>
            <ListItem sx={{ display: "list-item" }}>Pages visited and timestamps</ListItem>
            <ListItem sx={{ display: "list-item" }}>Device information</ListItem>
            </List>

            <Typography sx={{ mb: 2 }}>
            This data is collected and processed for purposes such as security,
            analytics, performance monitoring, and infrastructure reliability.
            We do not control how data is processed automatically through the
            hosting platform.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            4. Cookies and Tracking
            </Typography>
            <Typography sx={{ mb: 2 }}>
            The Site itself does not intentionally place tracking cookies unless
            explicitly stated. However, hosting or integrated third-party services
            may use cookies or similar technologies required for functionality,
            security, or analytics.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            5. Third-Party Services
            </Typography>
            <Typography sx={{ mb: 2 }}>
            If the Site uses external services (such as embedded content,
            analytics tools, or APIs), those providers may collect data according
            to their own privacy policies. We are not responsible for the privacy
            practices of third-party services.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            6. Data Use
            </Typography>
            <Typography sx={{ mb: 1 }}>
            Any information voluntarily provided by you is used only to:
            </Typography>

            <List sx={{ listStyleType: "disc", pl: 3, mb: 2 }}>
            <ListItem sx={{ display: "list-item" }}>Respond to inquiries</ListItem>
            <ListItem sx={{ display: "list-item" }}>Provide requested services</ListItem>
            <ListItem sx={{ display: "list-item" }}>Maintain site functionality</ListItem>
            <ListItem sx={{ display: "list-item" }}>Improve user experience</ListItem>
            </List>

            <Typography sx={{ mb: 2 }}>
            We do not sell or rent personal information.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            7. Data Security
            </Typography>
            <Typography sx={{ mb: 2 }}>
            Reasonable technical measures are used to protect information.
            However, no internet transmission or storage system can be guaranteed
            to be 100% secure.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            8. Your Rights
            </Typography>
            <Typography sx={{ mb: 2 }}>
            Depending on your jurisdiction, you may have rights to request access
            to, correction of, or deletion of personal data.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            9. Changes to This Policy
            </Typography>
            <Typography sx={{ mb: 2 }}>
            This Privacy Policy may be updated periodically. Updates will be
            posted on this page with a revised effective date.
            </Typography>

            <Typography level="h3" sx={{ mt: 2, mb: 1 }}>
            10. Contact
            </Typography>
            <Typography>
            If you have questions about this Privacy Policy, contact:
            <br />
            <br />
            starscolorado@protonmail.com
            </Typography>
        </Box>
        </Box>
    </Container>
  );
}

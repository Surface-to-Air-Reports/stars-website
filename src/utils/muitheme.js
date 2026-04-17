// theme.js
import { createTheme } from "@mui/material/styles";

const joyLikeTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0B6BCB", // Joy default blue
        },
        neutral: {
            main: "#636B74",
        },
        background: {
            default: "#F8F9FA",
            paper: "#FFFFFF",
        },
    },
    shape: {
        borderRadius: 12, // Joy uses more rounded corners
    },
    typography: {
        fontFamily: `"Inter", system-ui, -apple-system, sans-serif`,
        button: {
            textTransform: "none", // Joy doesn’t uppercase buttons
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    boxShadow: "none",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiPickersLayout: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
    },
});

export default joyLikeTheme;
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        text: {
            primary: `#a52a2a`,
        },
        action: {
            active: `#a52a2a`,
        },
    },
    components: {
        MuiIconButton: {
            defaultProps: {
                centerRipple: false,
                className: "ripple",
                sx: () => ({
                    "&.MuiIconButton-root:hover": {
                        background: "none",
                    },
                    "& .MuiTouchRipple-child": {
                        backgroundColor: `white !important`,
                    },
                }),
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
                placement: "top",
                enterDelay: 750,
            },
        },
    },
});

export default function ThemeContext({ children }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

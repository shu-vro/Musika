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
});

export default function ThemeContext({ children }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

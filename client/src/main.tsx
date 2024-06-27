
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, yellow } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";
import { MovieContextProvider } from "./context/context.tsx";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: purple,
    secondary: yellow,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MovieContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MovieContextProvider>
  </BrowserRouter>
);

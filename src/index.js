import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import Router from "./routes";
import { AuthProvider } from "@contexts/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme";
import { UserProvider } from "@features/user/contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  </Provider>
);

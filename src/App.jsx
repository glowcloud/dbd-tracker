import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import AddMatch from "./pages/AddMatch";
import Matches from "./pages/Matches";
import Layout from "./components/Layout";
import Match from "./pages/Match";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { session } = useAuth();
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!session ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/matches"
              element={session ? <Matches /> : <Navigate to="/login" />}
            />
            <Route
              path="/matches/:id"
              element={session ? <Match /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-match"
              element={session ? <AddMatch /> : <Navigate to="/login" />}
            />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

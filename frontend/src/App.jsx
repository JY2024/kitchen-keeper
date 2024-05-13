import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import pages here
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectedPost from "./pages/SelectedPost";
import SocialPage from "./pages/SocialPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Setting from "./pages/Setting";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              {" "}
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/selectedPost" element={<SelectedPost />}></Route>
        <Route path="/social" element={<SocialPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

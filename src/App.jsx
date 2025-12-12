import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import Athletes from "./pages/admin/Athletes";
import Events from "./pages/admin/Events";
import Heat from "./pages/admin/Heat";

import EventPage from "./pages/Event";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* USER ROUTES */}
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/leaderboard/:eventId" element={<Leaderboard />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/athletes" element={<Athletes />} />
          <Route path="/admin/events" element={<Events />} />
          <Route path="/admin/heat/:id" element={<Heat />} />

          {/* HOME */}
          <Route path="/" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

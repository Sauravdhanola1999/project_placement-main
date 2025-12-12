import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import AthleteList from "../pages/admin/Athletes/AthleteList";
import AddAthlete from "../pages/admin/Athletes/AddAthlete";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />

        {/* Athletes */}
        <Route path="athletes" element={<AthleteList />} />
        <Route path="athletes/add" element={<AddAthlete />} />
      </Routes>
    </AdminLayout>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

import AthleteList from "./pages/admin/Athletes/AthleteList";
import AddAthlete from "./pages/admin/Athletes/AddAthlete";
import EventList from "./pages/admin/Events/EventList";
import AddEvent from "./pages/admin/Events/AddEvent";
import EventDetails from "./pages/admin/Events/EventDetails";
import AddHeat from "./pages/admin/Heats/AddHeat";
import HeatResults from "./pages/admin/Heats/HeatResults";
// import EnterResults from "./pages/admin/events/enter-results/EnterResults";

import EnterResults  from "./pages/admin/Events/enter-results/EnterResults"





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/admin/athletes" element={<AthleteList />} />
        <Route path="/admin/athletes/add" element={<AddAthlete />} />
        <Route path="/admin/events" element={<EventList />} />
        <Route path="/admin/events/add" element={<AddEvent />} />
        <Route path="/admin/events/:eventId" element={<EventDetails />} />
        <Route path="/admin/events/:eventId/add-heat" element={<AddHeat />} />
        <Route path="/admin/events/:eventId/heats/:heatId" element={<HeatResults />} />
        <Route
  path="/admin/events/:eventId/heats/:heatId/enter-results"
  element={<EnterResults />}
/>







      </Routes>
    </BrowserRouter>
  );
}

export default App;

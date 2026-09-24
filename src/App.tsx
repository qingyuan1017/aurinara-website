import { Routes, Route, Navigate } from "react-router-dom";

import SiteLayout from "./layout/SiteLayout.tsx";
import Home from "./pages/Home.tsx";
import Platform from "./pages/Platform.tsx";
import Solutions from "./pages/Solutions.tsx";
import Workflow from "./pages/Workflow.tsx";
import Trust from "./pages/Trust.tsx";
import Contact from "./pages/Contact.tsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/contact" element={<Contact />} />

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
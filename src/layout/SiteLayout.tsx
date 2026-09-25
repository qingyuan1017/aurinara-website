import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayout() {
  return (
    <div className="relative flex min-h-screen flex-col text-teal-900">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
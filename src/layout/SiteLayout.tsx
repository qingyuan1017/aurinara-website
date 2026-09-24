import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-[16rem] h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 font-sans selection:bg-primary selection:text-white">
      <ScrollRestoration />

      <header className="sticky top-0 z-50 shadow-sm border-b border-base-300">
        <Navbar />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

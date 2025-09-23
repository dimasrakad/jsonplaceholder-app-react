import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarContent from "./SidebarContent";

function Layout() {
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
  console.log(VITE_APP_NAME);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "enabled";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-x-hidden">
      <header className="lg:hidden bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {VITE_APP_NAME}
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1={3} y1={12} x2={21} y2={12}></line>
            <line x1={3} y1={6} x2={21} y2={6}></line>
            <line x1={3} y1={18} x2={21} y2={18}></line>
          </svg>
        </button>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 bg-white dark:bg-gray-800 shadow-md p-6 fixed top-0 left-0 h-screen">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Menu
          </h2>
          <SidebarContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </aside>

        {/* Mobile sidebar */}
        <div
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-in-out ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <aside
          className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Menu
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={18} y1={6} x2={6} y2={18}></line>
                <line x1={6} y1={6} x2={18} y2={18}></line>
              </svg>
            </button>
          </div>
          <SidebarContent
            closeSidebar={() => setSidebarOpen(false)}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </aside>

        <main className="flex-1 p-6 lg:ml-64 lg:p-8 w-full overflow-y-auto min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

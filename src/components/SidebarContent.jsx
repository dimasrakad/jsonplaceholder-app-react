import { Link } from "react-router-dom";

function SidebarContent({ closeSidebar, darkMode, toggleDarkMode }) {
  return (
    <>
      <nav className="space-y-4">
        <Link
          to="/posts"
          onClick={closeSidebar}
          className="flex items-center px-4 py-3 rounded-lg text-shadow-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          Posts
        </Link>
        <Link
          to="/todos"
          onClick={closeSidebar}
          className="flex items-center px-4 py-3 rounded-lg text-shadow-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          Todos
        </Link>
        <Link
          to="/albums"
          onClick={closeSidebar}
          className="flex items-center px-4 py-3 rounded-lg text-shadow-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          Albums
        </Link>

        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100 dark:bg-gray-700 transition w-full cursor-pointer"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {darkMode ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </nav>
    </>
  );
}

export default SidebarContent;

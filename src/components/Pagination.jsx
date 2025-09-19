function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md"
      >
        <a
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
          } focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
          <span className="sr-only">Previous</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            data-slot="icon"
            aria-hidden="true"
            className="size-5"
          >
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
          </svg>
        </a>
        {[...Array(totalPages)].map((_, i) => (
          <a
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              currentPage === i + 1
                ? "z-10 bg-gray-500 text-white border border-gray-bg-gray-500"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            {i + 1}
          </a>
        ))}
        <a
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
          } focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
          <span className="sr-only">Next</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            data-slot="icon"
            aria-hidden="true"
            className="size-5"
          >
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </a>
      </nav>
    </div>
  );
}

export default Pagination;

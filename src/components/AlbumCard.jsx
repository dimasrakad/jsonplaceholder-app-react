import { useRef } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const VITE_IMAGES_API_URL = import.meta.env.VITE_IMAGES_API_URL;

function AlbumCard({ album }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -120,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link
      to={`/albums/${album.id}`}
      key={album.id}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition overflow-hidden"
    >
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            scrollLeft();
          }}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-white cursor-pointer"
          aria-label="Scroll left"
        >
          <svg
            className="w-3 h-3 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden gap-1 pb-1 scroll-smooth"
        >
          {album.photos.map((photo) => (
            <div
              key={photo.id}
              className="flex-shrink-0 w-32 h-32 rounded overflow-hidden border border-gray-300 dark:border-gray-600"
            >
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
                <img
                  src={`${VITE_IMAGES_API_URL}/id/${photo.id}/150/150`}
                  alt={`${photo.title}`}
                  className="w-full h-full object-cover opacity-0"
                  loading="lazy"
                  onLoad={(e) => {
                    e.target.classList.remove("opacity-0");
                    e.target.previousElementSibling?.classList.add("hidden");
                  }}
                  onError={(e) => {
                    e.target.src = "/image-error.png";
                    e.target.classList.remove("opacity-0");
                    e.target.previousElementSibling?.classList.add("hidden");
                  }}
                />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded border border-dashed border-gray-400 dark:border-gray-600">
            more...
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            scrollRight();
          }}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-white cursor-pointer"
          aria-label="Scroll right"
        >
          <svg
            className="w-3 h-3 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2">
          {album.title}
        </h3>
        {album.user && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            by <span className="font-bold">{album.user.name}</span>
          </p>
        )}
      </div>
    </Link>
  );
}

export default AlbumCard;

import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";

const VITE_IMAGES_API_URL = import.meta.env.VITE_IMAGES_API_URL;

function Lightbox({ onClose, photos, currentPhotoIndex, onNavigate }) {
  const [imageLoading, setImageLoading] = useState(true);
  const goToPrevious = () => {
    if (currentPhotoIndex > 0) {
      onNavigate(currentPhotoIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      onNavigate(currentPhotoIndex + 1);
    }
  };

  const currentPhoto = photos[currentPhotoIndex];

  useEffect(() => {
    setImageLoading(true);
  }, [currentPhoto]);

  if (!currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition z-10 cursor-pointer"
          aria-label="Close lightbox"
          title="Close lightbox"
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

        {/* Previous button */}
        {currentPhotoIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full text-white bg-black/50 hover:bg-black/70 flex items-center justify-center transition cursor-pointer z-10"
            title="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {currentPhotoIndex < photos.length - 1 && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full text-white bg-black/50 hover:bg-black/70 flex items-center justify-center transition cursor-pointer z-10"
            title="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className="relative w-full max-h-[80vh]">
          {imageLoading && <LoadingSpinner />}
          <img
            src={`${VITE_IMAGES_API_URL}/id/${currentPhoto.id}/600/600`}
            alt={`${currentPhoto.title}`}
            className="w-full h-auto max-h-[80vh] object-contain rounded transition-opacity"
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              e.target.src = "/image-error.png";
              setImageLoading(false);
            }}
          />
        </div>

        <div className="mt-4 text-center text-white">
          <h3 className="text-lg font-medium">{currentPhoto.title}</h3>
          <p className="text-sm text-gray-300 mt-1">
            {currentPhotoIndex + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;

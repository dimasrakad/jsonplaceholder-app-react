import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import fetchAlbum from "../apis/fetchAlbum";
import fetchPhotos from "../apis/fetchPhotos";
import fetchUser from "../apis/fetchUser";

const VITE_IMAGES_API_URL = import.meta.env.VITE_IMAGES_API_URL;

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const loadMoreRef = useRef(null);

  // Fetch data
  useEffect(() => {
    const loadAlbumDetail = async () => {
      try {
        setLoading(true);

        const albumData = await fetchAlbum(id);
        const photosData = await fetchPhotos(id, null);
        const userData = await fetchUser(albumData.userId);

        setAlbum(albumData);
        setPhotos(photosData);
        setUser(userData);
      } catch (err) {
        if (err.message === "Album not found") {
          navigate("/not-found", { replace: true });
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAlbumDetail();
  }, [id, navigate]);

  // Infinite scroll
  useEffect(() => {
    if (photos.length === 0) return;

    const currentRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < photos.length) {
          setVisibleCount((prev) => Math.min(prev + 20, photos.length));
        }
      },
      { threshold: 1.0 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [photos.length, visibleCount]);

  const visiblePhotos = photos.slice(0, visibleCount);

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setLightboxOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (error) return <ErrorPage message={error} />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-full text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center mb-4 transition duration-200 ease-in-out cursor-pointer"
        title="Back"
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {album.title}
        </h1>
        {user && (
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            by <span className="font-bold">{user.name}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visiblePhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition group"
          >
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner />
              </div>
              <img
                src={`${VITE_IMAGES_API_URL}/id/${photo.id}/150/150`}
                alt={`${photo.title}`}
                className="w-full h-32 object-cover group-hover:scale-105 transition duration-300 opacity-0"
                onClick={() => openLightbox(photo)}
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
            <div className="p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {photo.title}
              </p>
            </div>
          </div>
        ))}
        {visibleCount < photos.length && (
          <div ref={loadMoreRef} className="col-span-full h-10"></div>
        )}
      </div>

      {photos.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No photos in this album.
        </p>
      )}

      {lightboxOpen && selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition z-10 cursor-pointer"
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

            <img
              src={`${VITE_IMAGES_API_URL}/id/${selectedPhoto.id}/600/600`}
              alt={`${selectedPhoto.title}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded"
              loading="lazy"
              onError={(e) => {
                e.target.src = "/image-error.png";
              }}
            />

            <div className="mt-4 text-center text-white">
              <h3 className="text-lg font-medium">{selectedPhoto.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumDetail;

import { useState, useEffect, useRef } from "react";

import fetchAlbums from "../apis/fetchAlbums";
import fetchUsers from "../apis/fetchUsers";
import fetchPhotos from "../apis/fetchPhotos";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import BackToTopButton from "../components/BackToTopButton";
import AlbumCard from "../components/AlbumCard";
import ErrorPage from "./ErrorPage";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const loadMoreRef = useRef(null);

  //   Fetch data
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albumsData = await fetchAlbums();
        const usersData = await fetchUsers();

        const userMap = {};
        usersData.forEach((user) => {
          userMap[user.id] = user;
        });

        const albumsWithUserAndPhotosPromises = albumsData.map(
          async (album) => {
            const photos = await fetchPhotos(album.id, 7);
            return { ...album, user: userMap[album.userId], photos };
          }
        );

        const albumsWithUserAndPhotos = await Promise.all(
          albumsWithUserAndPhotosPromises
        );

        setAlbums(albumsWithUserAndPhotos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  //   Search filter, delay 500ms
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      let filtered = albums;

      if (searchInput.trim()) {
        filtered = albums.filter(
          (album) =>
            album.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            album.user?.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setAlbums(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, albums]);

  //   Infinite scroll
  useEffect(() => {
    if (albums.length === 0) return;

    const currentRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < albums.length) {
          setVisibleCount((prev) => Math.min(prev + 10, albums.length));
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
  }, [albums.length, visibleCount]);

  const visibleAlbums = albums.slice(0, visibleCount);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //   Scroll detection for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    return () => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Albums
      </h1>
      <SearchInput value={searchInput} onChange={setSearchInput}></SearchInput>

      <div className="grid gap-6">
        {visibleAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
        {visibleCount < albums.length && (
          <div ref={loadMoreRef} className="col-span-full h-10"></div>
        )}
      </div>

      {showBackToTop && <BackToTopButton onClick={scrollTop} />}
    </div>
  );
}

export default Albums;

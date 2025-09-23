import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import UserInfoHeader from "../components/UserInfoHeader";

import fetchPosts from "../apis/fetchPosts";
import fetchUsers from "../apis/fetchUsers";
import ErrorPage from "./ErrorPage";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Fetch data
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts();
        const usersData = await fetchUsers();

        const userMap = {};
        usersData.forEach((user) => {
          userMap[user.id] = user;
        });

        const postsWithUser = postsData.map((post) => ({
          ...post,
          user: userMap[post.userId],
        }));

        setPosts(postsWithUser);
        setAllPosts(postsWithUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Search filter, delay 500ms
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true);

      let filtered = allPosts;

      if (searchInput.trim()) {
        filtered = allPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.body.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.user?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.user?.email.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setPosts(filtered);
      setAppliedSearch(searchInput);
      setLoading(false);
    }, 500); // delay 500ms before run search

    return () => clearTimeout(delayDebounce);
  }, [searchInput, allPosts]);

  // Reset to page 1 when search input changed
  useEffect(() => {
    if (searchInput !== appliedSearch) {
      setAppliedSearch(searchInput);
    }
  }, [searchInput, appliedSearch]);

  // Scroll detection for back to top button
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

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <ErrorPage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SearchInput value={searchInput} onChange={setSearchInput}></SearchInput>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col justify-between ring ring-gray-900/5 leading-normal hover:shadow-lg transition">
              <UserInfoHeader
                name={highlightText(
                  post.user?.name || "Unknown User",
                  appliedSearch
                )}
                email={highlightText(
                  post.user?.email || "No Email",
                  appliedSearch
                )}
              />
              <div className="text-gray-900 dark:text-white font-medium text-xl mt-2 mb-2">
                {highlightText(post.title, appliedSearch)}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                {highlightText(post.body, appliedSearch)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {showBackToTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none z-50 cursor-pointer"
          aria-label="Back to top"
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
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
        </button>
      )}
    </div>
  );
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, query) {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
}

export default Posts;

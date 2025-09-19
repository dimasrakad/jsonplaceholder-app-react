import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import Pagination from "../components/Pagination";
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

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

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
            post.user?.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setPosts(filtered);
      setAppliedSearch(searchInput);
      setCurrentPage(1);
      setLoading(false);
    }, 500); // delay 500ms before run search

    return () => clearTimeout(delayDebounce);
  }, [searchInput, allPosts]);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <ErrorPage message={error} />
      </div>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SearchInput value={searchInput} onChange={setSearchInput}></SearchInput>

      <div className="grid md:grid-cols-2 gap-6">
        {currentPosts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="border border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal hover:shadow-lg transition">
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
              <div className="text-gray-900 font-bold text-xl mt-2 mb-2">
                {highlightText(post.title, appliedSearch)}
              </div>
              <p className="text-gray-700 text-base">
                {highlightText(post.body, appliedSearch)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      ></Pagination>
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

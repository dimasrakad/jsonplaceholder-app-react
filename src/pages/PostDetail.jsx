import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import Comments from "../components/Comments";
import ErrorPage from "./ErrorPage";
import fetchPost from "../apis/fetchPost";
import fetchComments from "../apis/fetchComments";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const postData = await fetchPost(id);
        const commentsData = await fetchComments(id);

        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        if (err.message === "Post not found") {
          navigate("/not-found", { replace: true });
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <ErrorPage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-full text-gray-900 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 flex items-center justify-center mb-4 transition duration-200 ease-in-out cursor-pointer"
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
      <div className="mb-6">
        <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-4">
          {post.title}
        </h2>
        <p className="text-gray-800 dark:text-gray-300 text-base">
          {post.body}
        </p>
      </div>

      <Comments comments={comments}></Comments>
    </div>
  );
}

export default PostDetail;

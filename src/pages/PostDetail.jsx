import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Posts
      </Link>
      <div className="bg-white mb-6">
        <h2 className="text-gray-900 text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-800 text-base">{post.body}</p>
      </div>

      <Comments comments={comments}></Comments>
    </div>
  );
}

export default PostDetail;

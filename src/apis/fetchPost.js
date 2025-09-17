const API_URL = import.meta.env.VITE_API_URL;

async function fetchPost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`);

  if (!res.ok) throw new Error("Failed to fetch post data");

  return await res.json();
}

export default fetchPost;

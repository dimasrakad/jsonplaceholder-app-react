const API_URL = import.meta.env.VITE_API_URL;

async function fetchComments(id) {
  const res = await fetch(`${API_URL}/posts/${id}/comments`);

  if (!res.ok) throw new Error("Failed to fetch comments data");

  return await res.json();
}

export default fetchComments;

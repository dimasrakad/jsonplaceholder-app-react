const API_URL = import.meta.env.VITE_API_URL;

async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);

  if (!res.ok) throw new Error("Failed to fetch posts data");

  return await res.json();
}

export default fetchPosts;

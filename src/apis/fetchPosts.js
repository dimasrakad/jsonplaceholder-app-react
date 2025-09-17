const API_URL = import.meta.env.VITE_API_URL;

async function fetchPosts(query = "") {
  const res = await fetch(`${API_URL}/posts?q=${query}`);

  if (!res.ok) throw new Error("Failed to fetch posts data");

  return await res.json();
}

export default fetchPosts;

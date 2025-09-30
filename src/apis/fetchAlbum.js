const API_URL = import.meta.env.VITE_API_URL;

async function fetchAlbum(id) {
  const res = await fetch(`${API_URL}/albums/${id}`);

  if (res.status === 404) throw new Error("Album not found");

  if (!res.ok) throw new Error("Failed to fetch album data");

  return await res.json();
}

export default fetchAlbum;

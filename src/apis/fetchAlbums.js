const API_URL = import.meta.env.VITE_API_URL;

async function fetchAlbums() {
  const res = await fetch(`${API_URL}/albums`);

  if (!res.ok) throw new Error("Failed to fetch albums data");

  return await res.json();
}

export default fetchAlbums;

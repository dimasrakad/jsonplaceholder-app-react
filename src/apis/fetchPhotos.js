const API_URL = import.meta.env.VITE_API_URL;

async function fetchPhotos(id) {
  const res = await fetch(`${API_URL}/albums/${id}/photos`);

  if (!res.ok) throw new Error("Failed to fetch photos data");

  return await res.json();
}

export default fetchPhotos;

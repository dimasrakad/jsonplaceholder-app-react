const API_URL = import.meta.env.VITE_API_URL;

async function fetchPhotos(id, limit) {
  const res = await fetch(
    `${API_URL}/albums/${id}/photos${limit ? `?_limit=${limit}` : ""}`
  );

  if (!res.ok) throw new Error("Failed to fetch photos data");

  return await res.json();
}

export default fetchPhotos;

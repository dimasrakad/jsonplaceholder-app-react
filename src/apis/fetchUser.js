const API_URL = import.meta.env.VITE_API_URL;

async function fetchUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`);

  if (res.status === 404) throw new Error("User not found");

  if (!res.ok) throw new Error("Failed to fetch user data");

  return await res.json();
}

export default fetchUser;

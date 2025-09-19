const API_URL = import.meta.env.VITE_API_URL;

async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) throw new Error("Failed to fetch users data");

  return await res.json();
}

export default fetchUsers;

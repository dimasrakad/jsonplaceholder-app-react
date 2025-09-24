const API_URL = import.meta.env.VITE_API_URL;

async function fetchTodos() {
  const res = await fetch(`${API_URL}/todos`);

  if (!res.ok) throw new Error("Failed to fetch todos data");

  return await res.json();
}

export default fetchTodos;

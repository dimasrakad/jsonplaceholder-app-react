import { useState, useEffect } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/SearchInput";
import BackToTopButton from "../components/BackToTopButton";
import fetchTodos from "../apis/fetchTodos";
import fetchUsers from "../apis/fetchUsers";
import ErrorPage from "./ErrorPage";

function Todos() {
  const [, setTodos] = useState([]);
  const [localTodos, setLocalTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  //   Fetch data
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosData = await fetchTodos();
        const usersData = await fetchUsers();

        const userMap = {};
        usersData.forEach((user) => {
          userMap[user.id] = user;
        });

        const todosWithUser = todosData.map((todo) => ({
          ...todo,
          user: userMap[todo.userId],
        }));

        setTodos(todosWithUser);
        setLocalTodos([...todosWithUser]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  //   Search filter, delay 500ms
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      let filtered = localTodos;

      if (searchInput.trim()) {
        filtered = localTodos.filter(
          (todo) =>
            todo.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            todo.user?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            todo.user?.email.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setLocalTodos(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, localTodos]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //   Scroll detection for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    return () => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   Filter todos based on status
  const filteredTodos = localTodos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  //   Set todo completed/uncompleted
  const toggleTodo = (id) => {
    setLocalTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Todos
      </h1>
      <SearchInput value={searchInput} onChange={setSearchInput}></SearchInput>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All ({localTodos.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Active ({localTodos.filter((todo) => !todo.completed).length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg transition cursor-pointer ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Completed ({localTodos.filter((todo) => todo.completed).length})
        </button>
      </div>

      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition border-l-4 border-transparent"
            style={{ borderLeftColor: todo.completed ? "#10b981" : "#3b82f6" }}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
              />

              <div className="flex-1">
                <h3
                  className={`text-lg font-medium ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.user && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    by {todo.user.name} ({todo.user.email})
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No todos found.
        </p>
      )}

      {showBackToTop && <BackToTopButton onClick={scrollTop} />}
    </div>
  );
}

export default Todos;

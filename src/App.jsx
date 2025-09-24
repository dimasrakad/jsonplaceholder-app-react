import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Todos from "./pages/Todos";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Posts />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="todos" element={<Todos />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

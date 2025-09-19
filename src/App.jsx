import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

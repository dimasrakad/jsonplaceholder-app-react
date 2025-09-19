import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        ← Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;

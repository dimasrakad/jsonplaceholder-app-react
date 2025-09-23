import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center dark:bg-gray-800">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-red-600 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-white mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-200 mb-10">
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

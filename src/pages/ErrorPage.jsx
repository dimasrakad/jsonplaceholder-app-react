function ErrorPage({ message }) {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">
          Something went wrong
        </h1>
        <p className="text-gray-700 dark:text-white">{message}</p>
      </div>
    </div>
  );
}

export default ErrorPage;

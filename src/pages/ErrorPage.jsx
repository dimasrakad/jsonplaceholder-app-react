function ErrorPage({ message }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-700 mb-6">{message}</p>
    </div>
  );
}

export default ErrorPage;

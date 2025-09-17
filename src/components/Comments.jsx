function Comments({ comments }) {
  return (
    <div className="bg-white">
      <h3 className="text-xl font-semibold mb-3">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-gray-400 rounded-lg p-4 shadow"
            >
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  alt="User image"
                />
                <div className="text-sm">
                  <strong className="block text-gray-900">{c.name}</strong>
                  <small className="text-gray-600">{c.email}</small>
                </div>
              </div>
              <p className="mt-2 text-gray-800">{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;

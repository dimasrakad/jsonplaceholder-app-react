import UserInfoHeader from "./UserInfoHeader";

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
              <UserInfoHeader name={c.name} email={c.email} />
              <p className="mt-2 text-gray-800">{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;

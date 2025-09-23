import UserInfoHeader from "./UserInfoHeader";

function Comments({ comments }) {
  return (
    <div>
      <h3 className="text-xl dark:text-white font-semibold mb-3">Comments</h3>
      {comments.length === 0 ? (
        <p className="dark:text-white">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
            >
              <UserInfoHeader name={c.name} email={c.email} />
              <p className="mt-2 text-gray-800 dark:text-gray-300 text-base">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;

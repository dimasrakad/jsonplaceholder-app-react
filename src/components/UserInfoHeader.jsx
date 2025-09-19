function UserInfoHeader({ name, email }) {
  return (
    <div className="flex items-center">
      <img
        className="w-10 h-10 rounded-full mr-4"
        src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
        alt="User image"
      />
      <div className="text-sm">
        <strong className="block text-gray-900">{name}</strong>
        <small className="text-gray-600">{email}</small>
      </div>
    </div>
  );
}

export default UserInfoHeader;

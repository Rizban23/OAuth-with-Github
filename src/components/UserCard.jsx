import React from "react";

function UserCard({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 border rounded-xl shadow hover:bg-gray-50 cursor-pointer transition"
    >
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold text-lg">{user.login}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Открыть профиль
        </a>
      </div>
    </div>
  );
}

export default UserCard;

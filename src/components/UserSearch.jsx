import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import RepoCard from "./RepoCard";

function UserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=10`);
      setUsers(res.data.items);
      setTotalCount(res.data.total_count);
      setSelectedUser(null);
      setRepos([]);
    } catch (error) {
      console.error("Ошибка при поиске пользователей:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(res.data);
      setSelectedUser(username);
    } catch (error) {
      console.error("Ошибка при загрузке репозиториев:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setUsers([]);
    setRepos([]);
    setSelectedUser(null);
    setTotalCount(0);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center"> Поиск пользователей GitHub</h1>

      {!selectedUser && (
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Введите имя пользователя..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-2 top-2 text-gray-500 hover:text-red-600"
              >
                ❌
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
             Найти
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500 mt-6"> Загрузка...</div>
      )}

      {!loading && users.length > 0 && !selectedUser && (
        <div className="text-sm text-gray-600 mb-4 text-center">
          Найдено пользователей: {totalCount}
        </div>
      )}

      {!selectedUser && (
        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleSelectUser(user.login)}
            />
          ))}
        </div>
      )}

      {selectedUser && (
        <div>
          <button
            onClick={() => {
              setSelectedUser(null);
              setRepos([]);
            }}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Назад к результатам поиска
          </button>

          <h2 className="text-xl font-semibold mb-3">
            Репозитории пользователя{" "}
            <span className="text-blue-700">{selectedUser}</span>
          </h2>

          <div className="grid gap-4">
            {repos.length > 0 ? (
              repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
            ) : (
              <p className="text-gray-500">Нет публичных репозиториев.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSearch;

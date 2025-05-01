import React from "react";

function RepoCard({ repo }) {
  return (
    <div className="p-4 border rounded-xl shadow-sm">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-700 font-semibold text-lg hover:underline"
      >
        {repo.name}
      </a>
      {repo.description && (
        <p className="text-sm text-gray-700 mt-1">{repo.description}</p>
      )}
      <div className="text-xs text-gray-500 mt-2">
        ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
      </div>
    </div>
  );
}

export default RepoCard;

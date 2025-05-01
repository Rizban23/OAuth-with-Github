// src/components/Repositories.jsx
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Repositories({ repos }) {
  if (!repos.length) return <p>Нет репозиториев.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {repos.map((repo) => (
        <div
          key={repo.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "16px",
            backgroundColor: "#fdfdfd",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0366d6", textDecoration: "none" }}
            >
              {repo.name}
            </a>
          </h3>

          <p style={{ marginBottom: "8px", color: "#555" }}>
            {repo.description || "Нет описания"}
          </p>

          <p style={{ fontSize: "0.9em", color: "#888" }}>
            {repo.private ? "🔒 Приватный" : "🔓 Публичный"}
          </p>

          <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <FaGithub style={{ marginRight: "6px" }} />
            <a
              href={repo.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0366d6", textDecoration: "none" }}
            >
              {repo.owner.login}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

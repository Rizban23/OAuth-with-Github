import React, { useState } from "react";
import axios from "axios";

function ProfileCard({ user, token, setUser }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    company: user?.company || "",
    location: user?.location || "",
  });

  if (!user) return <p>Загрузка профиля...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        "https://api.github.com/user",
        formData,
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUser(res.data);
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  return (
    <div
      style={{
        textAlign: "left",
        maxWidth: 500,
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fdfdfd",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <img
          src={user.avatar_url}
          alt="avatar"
          style={{ width: 80, height: 80, borderRadius: "50%" }}
        />
        <div>
          <h2 style={{ marginBottom: 4 }}>{user.name || "—"}</h2>
          <p style={{ margin: 0, color: "#555" }}>@{user.login}</p>
          <p style={{ margin: "4px 0", color: "#555" }}>
             {user.email || "Email не указан"}
          </p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0366d6", textDecoration: "underline" }}
          >
             Профиль на GitHub
          </a>
        </div>
      </div>

      {["name", "bio", "company", "location"].map((field) => (
        <div key={field} style={{ marginBottom: 10 }}>
          <strong>
            {field === "name"
              ? "Имя"
              : field === "bio"
              ? "Био"
              : field === "company"
              ? "Компания"
              : "Локация"}
            :
          </strong>{" "}
          {editing ? (
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "6px",
                marginTop: "4px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          ) : (
            <span style={{ marginLeft: "6px" }}>
              {user[field] || "—"}
            </span>
          )}
        </div>
      ))}

      {editing ? (
        <div>
          <button onClick={handleSave} style={{ marginRight: 10 }}>
             Сохранить
          </button>
          <button onClick={() => setEditing(false)}> Отмена</button>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}> Редактировать</button>
      )}

      <hr style={{ margin: "20px 0" }} />
      <a href="/users" style={{ color: "#0366d6", textDecoration: "underline", fontSize: "14px" }}>
         Перейти к поиску других пользователей
      </a>
    </div>
  );
}

export default ProfileCard;

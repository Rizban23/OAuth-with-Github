import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import Repositories from "../components/Repositories";

export default function MainPage({ token, setToken, user, setUser }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [repos, setRepos] = useState([]);
  const [email, setEmail] = useState(null);
  const [visibleType, setVisibleType] = useState("public"); 

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Ошибка профиля:", err));

    axios
      .get("https://api.github.com/user/emails", {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        const основной = res.data.find((e) => e.primary);
        if (основной) setEmail(основной.email);
      })
      .catch((err) => console.error("Ошибка email:", err));
  }, [token]);

  useEffect(() => {
    if (activeTab === "repos" && repos.length === 0 && user?.repos_url) {
      axios
        .get(user.repos_url, {
          headers: { Authorization: `token ${token}` },
        })
        .then((res) => setRepos(res.data))
        .catch((err) => console.error("Ошибка репозиториев:", err));
    }
  }, [activeTab, user, token]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {!token ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <a href="http://localhost:4000/auth/github">
            <button>Войти через GitHub</button>
          </a>
        </div>
      ) : !user ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>Загрузка профиля...</div>
      ) : (
        <>
          <h2>Добро пожаловать, {user.login}!</h2>
          {email && <p>📧 Email: {email}</p>}

          <div style={{ marginTop: 20 }}>
            <button onClick={() => setActiveTab("profile")}>🧑 Профиль</button>
            <button onClick={() => setActiveTab("repos")} style={{ marginLeft: 10 }}>
              📦 Репозитории
            </button>
          </div>

          <div style={{ marginTop: 30 }}>
            {activeTab === "profile" && (
              <ProfileCard
                user={user}
                onEdit={async (field, value) => {
                  try {
                    const res = await axios.patch(
                      "https://api.github.com/user",
                      { [field]: value },
                      {
                        headers: {
                          Authorization: `token ${token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    setUser(res.data);
                  } catch (err) {
                    console.error("Ошибка при обновлении профиля:", err);
                  }
                }}
              />
            )}

            {activeTab === "repos" && (
              <div>
               
                <div style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => setVisibleType("public")}
                    style={{
                      marginRight: 10,
                      backgroundColor: visibleType === "public" ? "#0366d6" : "#eee",
                      color: visibleType === "public" ? "#fff" : "#000",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                    }}
                  >
                    Публичные
                  </button>
                  <button
                    onClick={() => setVisibleType("private")}
                    style={{
                      backgroundColor: visibleType === "private" ? "#0366d6" : "#eee",
                      color: visibleType === "private" ? "#fff" : "#000",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                    }}
                  >
                    Приватные
                  </button>
                </div>

                <Repositories
                  repos={repos.filter((r) =>
                    visibleType === "public" ? !r.private : r.private
                  )}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

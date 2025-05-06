import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      console.error("Токен не найден в URL");
      navigate("/");
      return;
    }

    localStorage.setItem("github_token", token); 
    if (setToken) setToken(token);
    navigate("/");
  }, [setToken, navigate]);

  return <div>Авторизация... Пожалуйста, подождите.</div>;
}

export default AuthCallback;

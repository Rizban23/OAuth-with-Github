import React from "react";

const GitHubLoginButton = () => {
  const GITHUB_CLIENT_ID ="Ov23liLtKOFoRwkoPovF"
  const REDIRECT_URI = "http://localhost:3000/callback";

  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user repo`;
    window.location.href = githubAuthUrl;
  };

  return (
    <button onClick={handleLogin} className="bg-black text-white p-2 rounded">
      Войти через GitHub
    </button>
  );
};

export default GitHubLoginButton;

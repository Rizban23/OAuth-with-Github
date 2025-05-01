import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserSearch from "./components/UserSearch";
import MainPage from "./pages/Main";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const [token, setToken] = useState(localStorage.getItem("github_token"));
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
          />
        }
      />
      <Route path="/callback" element={<AuthCallback setToken={setToken} />} />
      <Route path="/users" element={<UserSearch />} />
    </Routes>
  );
}

export default App;

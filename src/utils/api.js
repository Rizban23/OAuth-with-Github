export const fetchUser = (token) =>
    axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${token}` },
    });
  
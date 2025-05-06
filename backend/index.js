require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

const CLIENT_ID = "Ov23liLtKOFoRwkoPovF";
const CLIENT_SECRET = "c61f98454783ec3175c204c78141694901106b62";

app.get("/auth/github", (req, res) => {
  const redirect_uri = "http://localhost:4000/auth/github/callback";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user,repo`
  );
});

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    res.redirect(`http://localhost:3000/callback?token=${accessToken}`);
  } catch (error) {
    console.error(" Ошибка при получении токена:", error.message);
    res.status(500).send("Ошибка при получении токена");
  }
});

app.listen(4000, () => console.log("Backend is running on http://localhost:4000"));

const axios = require("axios");

const ENV = process.env.NODE_ENV || "development";

if (ENV === "development")
  require("dotenv").config({
    path: `./.env.${ENV}`,
  });

const myApi = axios.create({
  baseURL: process.env.API_URL,
});

const auth = {
  auth: {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  },
};

const getNineAnagrams = () => {
  return myApi.get("/questions", auth).then(({ data }) => {
    return data;
  });
};

const updateScoreOnDatabase = (user_id, score) => {
  return myApi
    .patch("/users/new-score", { user_id, score }, auth)
    .then(({ data }) => {
      return data;
    });
};

const postSignUp = ({user_id, username, avatar}) => {
     return myApi.post("/users/sign-up", {user_id: `${user_id}`, username: `${username}`, avatar_url: `${avatar}`}, auth)
}

const getHighScoreLeaderboard = () => {
  return myApi.get("/users?order_by=high_score", auth).then(({ data }) => {
    return data;
  });
};
const getLifetimeScoreLeaderboard = () => {
  return myApi.get("/users?order_by=lifetime_score", auth).then(({ data }) => {
    return data;
  });
};

module.exports = {
  getNineAnagrams,
  updateScoreOnDatabase,
  postSignUp,
  getHighScoreLeaderboard,
  getLifetimeScoreLeaderboard,
};

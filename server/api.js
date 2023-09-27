const axios = require("axios");

const myApi = axios.create({
  baseURL: "https://sphinx-api-gjqf.onrender.com/api",
  headers: { auth: { username: "admin", password: "admin" } },
});

const auth = { auth: { username: "admin", password: "admin" } };

const getNineAnagrams = () => {
  return myApi.get("/questions", auth).then(({ data }) => {
    return data;
  });
};

const testApi = () => {
  return myApi
    .get("", auth)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getNineAnagrams, testApi };

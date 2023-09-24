const axios = require("axios");

const myApi = axios.create({
  baseURL: "https://sphinx-api-gjqf.onrender.com/api",
});

const auth = { headers: { auth: { user: "admin", password: "admin" } } };

const getNineAnagrams = () => {
  return myApi.get("/questions").then(({ data }) => {
    // console.log(data, 'getNineAnagrams')
    return data;
  });
};

module.exports = { getNineAnagrams };
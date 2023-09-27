const axios = require("axios");
const { templateAnagrams } = require("./testData");

const myApi = axios.create({
  baseURL: "https://sphinx-api-gjqf.onrender.com/api",
});

const auth = { auth: { username: "admin", password: "admin" } };

const getNineAnagrams = () => {
  return myApi.get("/questions", auth).then(({ data }) => {
    if (!data){
    return templateAnagrams
  } else {
    return data
  } });
};

module.exports = { getNineAnagrams };

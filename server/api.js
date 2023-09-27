const axios = require("axios");

const ENV = process.env.NODE_ENV || "development";

if (ENV === "development")
  require("dotenv").config({
    path: `./.env.${ENV}`,
  });

const myApi = axios.create({
  baseURL: "https://sphinx-api-gjqf.onrender.com/api",
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

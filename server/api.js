const axios = require("axios");
const { templateAnagrams } = require("./testData");

const myApi = axios.create({
  baseURL: "https://sphinx-api-gjqf.onrender.com/api",
});

const auth =  { auth: { username: "admin", password: "admin" }  };

const getNineAnagrams = () => {
  return myApi.get("/questions").then(({ data }) => {
    return data;
  });
};

const postSignUp = ({user_id, username, avatar}) => {
     console.log(user_id)
     console.log(username)
     console.log(avatar)
     return myApi.post("/users/sign-up", {user_id: `${user_id}`, username: `${username}`, avatar_url: `${avatar}`}, auth)

}


module.exports = { getNineAnagrams, postSignUp };

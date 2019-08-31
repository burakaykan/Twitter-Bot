const Twitter = require("twitter");
const config = require("./config.js");
const T = new Twitter(config);

const params = {
  q: "#nodejs",
  count: 10,
  result_type: "recent",
  lang: "en"
};

T.get("search/tweets", params, function(err, data, response) {
  if (!err) {
    data.statuses.forEach(element => {
      let id = element.id_str;
      T.post("favorites/create", id, function(err, response) {
        if (err) {
          console.log(err[0].message);
        } else {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log(
            "Favorited: ",
            "https://twitter.com/${username}/status/${tweetId}"
          );
        }
      });
    });
  } else {
    console.log(err);
  }
});

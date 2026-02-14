const axios = require("axios");

module.exports = function (event) {
  return function setMessageReaction(reaction, messageId) {
    return Graph(reaction, messageId)
      .then((response) => response)
      .catch((error) => {
        console.error("Error sending reaction:", error);
        throw error; // Propagate the error
      });
  };

  function Graph(reaction, messageId) {
    const payload = {
      access_token: PAGE_ACCESS_TOKEN,
      reaction: reaction,
    };

    return axios
      .post(
        `https://graph.facebook.com/v20.0/${messageId}/reactions`,
        payload
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response ? err.response.data : err.message;
      });
  }
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me

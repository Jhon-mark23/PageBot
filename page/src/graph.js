const axios = require("axios");

module.exports = function (event) {
  return function graph(form) {
    // Directly return the axios promise
    return axios
      .post(
        `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        form
      )
      .then((res) => res.data) // Return the response data
      .catch((err) => {
        // Handle errors and throw them
        throw err.response ? err.response.data : err.message;
      });
  };
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me
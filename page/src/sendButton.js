const axios = require("axios");

module.exports = function (event) {
  return function sendButton(text, buttons, senderID) {
    const recipientID = senderID || event.sender.id;

    // Map the buttons to the format expected by the Facebook API
    const payload = buttons.map(button => ({
      type: button.type || 'postback', // 'postback' or 'web_url'
      title: button.title,
      payload: button.payload || null,
      url: button.url || null, // Only for 'web_url' type buttons
    }));

    // Structure the message as a button template
    const form = {
      recipient: { id: recipientID },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: text,
            buttons: payload,
          },
        },
      },
      messaging_type: "RESPONSE",
    };

    // Return a promise from Graph
    return Graph(form);
  };

  function Graph(form) {
    return axios
      .post(
        `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        form
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response ? err.response.data : err.message;
      });
  }
};

// If an error occurs please contact @YanMaglinte
// FB: https://www.facebook.com/yandeva.me

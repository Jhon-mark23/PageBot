module.exports.config = {
  name: "button", // Command name (required)
  author: "Yan Maglinte", // Author of this script
  version: "1.0", // Script version; update if you modify the script
  category: "Utility", // Category for organization in help commands
  description: "Sends a button message.", // Description of the command
  adminOnly: false, // Restrict command usage to admins only if set to true
  usePrefix: true, // Activates command only if prefixed, when set to true
  cooldown: 5,
};

// Main code execution starts here
// 'event' and 'args' are parameters passed by the command handler
module.exports.run = function ({ event }) {
  // Sends a button message to the user
  api
    .sendButton(
      "Here are your options:",
      [
        {
          type: "web_url",
          url: "https://www.facebook.com/yandeva.me",
          title: "Check Profile",
        },
        {
          type: "postback",
          title: "Say Hello",
          payload: "HELLO_PAYLOAD",
        },
      ],
      event.sender.id,
    )
    .then((res) => {
      //console.log("Response:", res);
    })
    .catch((err) => {
      //console.error("Error:", err);
    });
};

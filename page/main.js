const path = require("path");
const config = require("../config.json");

module.exports = async function (event) {
  const api = {};
  const scripts = [
    "graph",
    "markAsSeen",
    "sendAttachment",
    "sendButton",
    "sendMessage",
    "sendTypingIndicator",
    "setMessageReaction",
  ];

  try {
    scripts.forEach((v) => {
      const scriptFunc = require(path.join(__dirname, "src", v))(event);
      api[v] = scriptFunc;
    });

    global.api = api;
    global.PREFIX = config.PREFIX;
    global.BOTNAME = config.BOTNAME;

    delete require.cache[require.resolve("./handler.js")];
    require("./handler.js")(event);
  } catch (err) {
    console.error("Initialization error:", err.message);
  }
};

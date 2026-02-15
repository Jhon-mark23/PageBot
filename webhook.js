const config = require("./config.json");
const utils = require("./modules/utils");
const fs = require("fs");
const path = require("path");

const messagesFilePath = path.join(__dirname, "./page/data.json");
let messagesCache = {};

if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, "{}", "utf8");
}

try {
  messagesCache = JSON.parse(fs.readFileSync(messagesFilePath, "utf8"));
} catch (e) {
  messagesCache = {};
}

function writeToFile() {
  if (config.clearData) return;
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messagesCache, null, 2), "utf8");
  } catch (error) {
    console.error("Storage error:", error.message);
  }
}

module.exports.listen = function (event) {
  if (event.object !== "page") return;

  event.entry.forEach((entry) => {
    entry.messaging.forEach(async (ev) => {
      const eventType = await utils.getEventType(ev);
      ev.type = eventType;

      global.PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;

      const mid = ev.message?.mid || ev.reaction?.mid;

      if (["message", "attachments", "message_reply"].includes(ev.type)) {
        const text = ev.message?.text;
        const attachments = ev.message?.attachments;

        if (mid) {
          if (!messagesCache[mid]) messagesCache[mid] = {};
          if (text) messagesCache[mid].text = text;
          if (attachments) messagesCache[mid].attachments = attachments;
        }
      }

      if (ev.type === "message_reply") {
        const replyToMid = ev.message.reply_to?.mid;
        if (replyToMid && messagesCache[replyToMid]) {
          ev.message.reply_to.text = messagesCache[replyToMid].text || null;
          ev.message.reply_to.attachments = messagesCache[replyToMid].attachments || null;
        }
      }

      if (config.selfListen && ev.message?.is_echo) return;

      writeToFile();
      utils.log(ev);
      require("./page/main")(ev);
    });
  });
};

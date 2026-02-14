const { gpt } = require("gpti");

module.exports.config = {
  name: "gpt",
  author: "Yan Maglinte",
  version: "1.0",
  category: "AI",
  description: "Chat with gpt",
  adminOnly: false,
  usePrefix: false,
  cooldown: 3,
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let prompt = args.join(" ");

    let data = await gpt.v1({
        messages: [],
        prompt: prompt,
        model: "GPT-4",
        markdown: false
    });

    api.sendMessage(data.gpt, event.sender.id).catch(err => {
        console.log(err);
    });
  } else if (event.type === "message_reply") {
    let prompt = `Message: "${args.join(" ")}\n\nReplying to: ${event.message.reply_to.text}`;

    let data = await gpt.v1({
        messages: [],
        prompt: prompt,
        model: "GPT-4",
        markdown: false
    });

    api.sendMessage(data.gpt, event.sender.id).catch(err => {
        console.log(err);
    });
  }
};

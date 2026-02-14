module.exports.config = {
  name: "greet", // Command Name (IMPORTANT)
  author: "Yan Maglinte", // The author of this script
  version: "1.0", // If you want to update your own version, please update this.
  category: "Utility", // Change this to the desired category, helpful for help.js command
  description: "Sends a back greeting message.", // Command's description
  adminOnly: false, // Only admins can use this command
  usePrefix: false, // Will use a PREFIX if its true to activate this command
  cooldown: 10, // Cooldown time in seconds
};

// The code scripts runs here
// event and args are the parameters you get from the command handler
module.exports.run = function ({ event, args }) {
  //console.log(`Hello, ${args.join(" ")}!`);
  api.sendMessage("Hello! " + args.join(" "), event.sender.id);

  // This will send a message to the sender if it replies to a message
  if (event.type === "message_reaction") {
    api.sendMessage("Replying to your message: " + args.join(" "), event.sender.id);
  }
};

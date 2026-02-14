module.exports.config = {
  name: "get", // Command Name (IMPORTANT)
  author: "Yan Maglinte", // The author of this script
  version: "1.0", // If you want to update your own version, please update this.
  category: "Utility", // Change this to the desired category, helpful for help.js command
  description: "Sends the user's recipient ID", // Command's description
  adminOnly: true, // Only admins can use this command
  usePrefix: true, // Will use a PREFIX if its true to activate this command
  cooldown: 0, // cooldown time in seconds
};

// The code scripts runs here
// event and args are the parameters you get from the command handler
module.exports.run = function ({ event, args }) {
  // If event type is just a message
  if (event.type === "message") {
    api.sendMessage("This is your ID: " + event.sender.id, event.sender.id);
  };

  // The received ID, can be used in the config.json to add your ID as part of the admin list and will be sent if it's replying to a message
  if (event.type === "message_reply") {
    api.sendMessage(`This your ID: ${event.sender.id}`, event.sender.id);
    console.log(event)
  }
  // This will send a message to the sender if it replies to a message
};

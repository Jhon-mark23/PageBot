module.exports.config = {
  name: "image",
  author: "Yan Maglinte",
  version: "1.0",
  category: "Utility",
  description: "Sends an attachment.",
  adminOnly: false, 
  usePrefix: true,
  cooldown: 5, // Cooldown time in seconds
};

module.exports.run = function ({ event, args }) {
  // Method 1
  api.graph({
    recipient: {
      id: event.sender.id
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: 'https://i.ibb.co/G9RBVz1/Facebook-Page-Bot-Icon.jpg',
          is_reusable: false
        }
      }
    }
  }).then((res) => {
    //console.log(res);
  }).catch((err) => {
    //console.error(err);
  });

  // Method 2
  api.sendAttachment("image", "https://i.ibb.co/G9RBVz1/Facebook-Page-Bot-Icon.jpg", event.sender.id);
}

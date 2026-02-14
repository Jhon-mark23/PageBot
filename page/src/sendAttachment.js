const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

module.exports = function (event) {
  return function sendAttachment(attachmentType, attachment, senderID) {
    const recipientID = senderID || event.sender.id;
    let attachmentId = null;

    // Determine the type of attachment (audio, file, image, etc.)
    const supportedTypes = ['audio', 'file', 'image', 'video']; // Add other types as needed

    if (supportedTypes.includes(attachmentType)) {
      if (attachmentType === 'file') {
        // If it's a file, upload it to Facebook
        const fileData = new FormData();
        fileData.append('file', fs.createReadStream(attachment)); // 'attachment' is the local file path

        // Upload the file and return the promise directly
        return axios
          .post(
            `https://graph.facebook.com/v20.0/me/message_attachments?access_token=${PAGE_ACCESS_TOKEN}`,
            fileData,
            {
              headers: fileData.getHeaders(), // Include headers for the form data
            }
          )
          .then((uploadResponse) => {
            attachmentId = uploadResponse.data.attachment_id; // Get the attachment ID from the response

            // Send the file attachment with the attachment ID
            const attachmentPayload = {
              type: 'file', // Type for files
              payload: { attachment_id: attachmentId }, // For file, use the attachment ID
            };

            return sendMessage(attachmentPayload, recipientID);
          })
          .catch((err) => {
            throw err.response ? err.response.data : err.message;
          });
      } else if (attachmentType === 'url') {
        // If it's a URL, use it directly
        attachmentId = attachment; // Use the URL directly in the payload

        // Send the attachment
        const attachmentPayload = {
          type: attachmentType, // dynamic type like 'image', 'audio', 'video', etc.
          payload: { url: attachmentId, is_reusable: true }, // For URL, use the URL directly
        };

        return sendMessage(attachmentPayload, recipientID);
      } else {
        return Promise.reject({ error: "Invalid attachment type." });
      }
    } else {
      return Promise.reject({ error: "Unsupported attachment type." });
    }
  };

  // Helper function to send the message with the attachment
  function sendMessage(attachmentPayload, recipientID) {
    const form = {
      recipient: { id: recipientID },
      message: {
        attachment: attachmentPayload, // Directly use the attachment payload passed
      },
      messaging_type: "RESPONSE",
    };

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

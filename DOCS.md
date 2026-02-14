# API Documentation
## Basic Messaging

### `api.sendMessage(message, senderID)`

Sends a text message to a specified user.

#### Parameters:
- `message` (string): The message to send.
- `senderID` (string): The ID of the message recipient.

#### Usage:
```javascript
api.sendMessage("Hello", event.sender.id);
```

or, with a promise:
```javascript
api.sendMessage("Hello", event.sender.id).then((res) => {
  console.log(res).catch((err) => {
    console.error(err);
  });
});
```

---

### `api.sendTypingIndicator(isTyping, senderID)`

Activates or deactivates the typing indicator for a user.

#### Parameters:
- `isTyping` (boolean): Set to `true` to show the typing indicator, or `false` to hide it.
- `senderID` (string): The ID of the user for whom the typing indicator is being set.

#### Usage:
Enable the typing indicator:
```javascript
api.sendTypingIndicator(true, event.sender.id);
```

Disable the typing indicator:
```javascript
api.sendTypingIndicator(false, event.sender.id);
```

or, with a promise:
```javascript
api.sendTypingIndicator(false, event.sender.id).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
```

---

# API Button Sender

A simple and flexible API for sending buttons (text buttons, URL buttons, postback buttons) to users on Facebook Messenger. This function allows you to send a rich message that includes interactive buttons like `Call to Action` buttons.

## Usage

The `api.sendButton` function allows you to send interactive buttons that a user can click, leading to a postback event or opening a URL.

### Example Usage:

```javascript
// Sending a single button
const buttons = [
  {
    type: "web_url",
    title: "Visit Website",
    url: "https://www.facebook.com/yandeva.me",
  },
];

api.sendButton("Here is a button!", buttons, senderID)
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Sending multiple buttons (e.g., postback buttons)
const postback = [
  {
    type: "postback",
    title: "Click Me!",
    payload: "USER_CLICKED_BUTTON",
  },
  {
    type: "web_url",
    title: "Visit Website",
    url: "https://www.facebook.com/yandeva.me",
  },
  {
    type: "web_url",
    title: "Chat Me",
    url: "m.me/pekoai",
  },
];

api.sendButton("Click a button!", postback, senderID)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Supported Button Types

- **`web_url`**: Opens a URL when clicked (ideal for external links).
- **`postback`**: Sends a postback event when clicked (ideal for triggering specific bot actions).

### Parameters

- **`messageText`** (string): The text content that accompanies the buttons. This can include any message you want the user to see along with the buttons.
- **`buttons`** (array): An array of buttons to send, where each button is an object containing:
  - **`type`** (string): The button type. Can be one of:
    - `'web_url'`: A button that opens a URL.
    - `'postback'`: A button that sends a postback to the bot.
  - **`title`** (string): The text to display on the button.
  - **`url`** (string, optional): The URL to open when the button is clicked. Required for `web_url` type buttons.
  - **`payload`** (string, optional): The payload to send when the button is clicked. Required for `postback` type buttons.
- **`senderID`** (string): The ID of the recipient. If not provided, it will use the sender ID from the event.

### Response

The function returns a promise that resolves with the response from the Facebook Graph API, which will contain information about the sent message or an error if something goes wrong.

### Example Response:

```json
{
  "recipient_id": "123456789",
  "message_id": "m_123456789"
}
```

## Notes

- **Buttons Layout**: You can send a maximum of 3 buttons per message. If you need to send more, consider breaking the message into multiple parts or creating a more complex button template.

- **Button Limitations**: Only `web_url` and `postback` are supported as button types. The payload for `postback` buttons should be a string that you can use to trigger specific actions in your bot.

- **Access Tokens**: Ensure that your `PAGE_ACCESS_TOKEN` is properly set up. This token is required for authenticating requests to the Facebook Graph API.

---

# API Attachment Sender

A simple and flexible API for sending various types of attachments (file, image, audio, video, etc.) via Facebook Messenger using the Graph API. This function supports sending both file uploads and URL-based attachments.

## Usage

The `api.sendAttachment` function is used to send different types of attachments, including files, images, audio, and video, to a recipient via Facebook Messenger.

### Example Usage:

```javascript
// Sending a file
api.sendAttachment('file', 'path/to/your/file.pdf', event.sender.id)
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Sending an image URL
api.sendAttachment('image', 'https://example.com/image.jpg', event.sender.id)
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Sending an audio URL
api.sendAttachment('audio', 'https://example.com/audio.mp3', event.sender.id)
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Sending a video URL
api.sendAttachment('video', 'https://example.com/video.mp4', event.sender.id)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Supported Attachment Types

- **`file`**: Upload and send a file attachment (e.g., PDFs, documents, etc.).
- **`image`**: Send an image URL as an attachment.
- **`audio`**: Send an audio URL as an attachment.
- **`video`**: Send a video URL as an attachment.

You can extend the list of supported types by adding new types to the `supportedTypes` array in the code.

### Parameters

- **`attachmentType`** (string): The type of the attachment. Can be one of the following:
  - `'file'`: For file uploads.
  - `'image'`: For image URLs.
  - `'audio'`: For audio URLs.
  - `'video'`: For video URLs.

- **`attachment`** (string): The attachment content. This can either be:
  - A **file path** (e.g., `'path/to/file.pdf'`) for file uploads.
  - A **URL** (e.g., `'https://example.com/image.jpg'`) for image, audio, or video URLs.

- **`senderID`** (string): The ID of the recipient. If not provided, it will use the sender ID from the event.

### Response

The function returns a promise that resolves with the response from the Facebook Graph API, which will contain information about the sent message or an error if something goes wrong.

### Example Response:

```json
{
  "recipient_id": "123456789",
  "message_id": "m_123456789",
  "attachment_id": "attach_987654321"
}
```

### Error Handling

If an error occurs, the function will throw an error with details about what went wrong. For example:

```json
{
  "error": {
    "message": "(#100) Param message[attachment][type] is not supported. Please check developer docs for details",
    "type": "OAuthException",
    "code": 100,
    "fbtrace_id": "ACRTjqIJmOIwRF0u868-JSM"
  }
}
```

## Notes

- **File Upload Limitations**: When sending a file, the file must be uploaded to Facebook first. The function handles the upload and retrieval of the attachment ID, which is then used to send the message.

- **Supported Facebook Graph API Versions**: This function is compatible with `v20.0` of the Facebook Graph API. Make sure your API version is aligned with this.

- **Access Tokens**: Make sure that your `PAGE_ACCESS_TOKEN` is set up correctly. This token is required to authenticate requests to the Facebook Graph API.

---

### `api.setMessageReaction`

This API function allows you to send reactions to Facebook messages using the Facebook Graph API. It is intended for use with verified business pages only and will not work on normal Facebook pages.

## Features

- **Send Reactions**: Allows you to send reactions like `LIKE`, `LOVE`, `HAHA`, `WOW`, `SAD`, and `ANGRY` to messages on a verified business page.
- **Error Handling**: Provides error handling and logs any issues that occur during the process.

## Requirements

- **Verified Business Page**: This API can only be used with a verified business page. It will not work on regular Facebook pages.
- **PAGE_ACCESS_TOKEN**: Ensure that you have a valid page access token with the necessary permissions to interact with the Facebook Graph API.

## Usage

Use the `api.setMessageReaction` function to send a reaction to a message by providing the desired reaction type and message ID.

#### Parameters:
- `reaction` (string): The type of reaction you want to send. Supported values are: `LIKE`, `LOVE`, `HAHA`, `WOW`, `SAD`, and `ANGRY`.
- `messageId` (string): The ID of the message to which you want to react.

#### Example:

```javascript
const reaction = 'LIKE'; // or 'LOVE', 'HAHA', etc.
const messageId = '1234567890123456'; // The ID of the message to react

api.setMessageReaction(reaction, messageId)
  .then(response => {
    console.log('Reaction sent:', response);
  })
  .catch(error => {
    console.error('Error sending reaction:', error);
  });
```

or, simply like this:

```javascript
api.setMessageReaction('LIKE', '1234567890123456');
```

### 3. Error Handling

If the API call encounters an error, it will log the error message and return `null`.

#### Example of error:

```javascript
Error sending reaction: Unable to send message: { error details }
```

---

## Notes

- This API function only works for verified business pages.

---

### `api.markAsSeen(isSeen, senderID)`

Marks a message as seen or unseen for a user.

#### Parameters:
- `isSeen` (boolean): Set to `true` to mark the message as seen, or `false` to mark it as unseen.
- `senderID` (string): The ID of the user for whom the message is being marked.

#### Usage:
To mark a message as seen:
```javascript
api.markAsSeen(true, event.sender.id);
```

To mark a message as unseen:
```javascript
api.markAsSeen(false, event.sender.id);
```

or, with a promise:
```javascript
api.markAsSeen(false, event.sender.id).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```

---

## Advanced Messaging with `api.graph`

The `api.graph` method allows for flexible message formatting, enabling you to send image attachments, buttons, and generic templates.

### Sending Button Template

Sends a message with buttons that perform various actions (like opening URLs or triggering postback events).

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: "What would you like to do?",
        buttons: [
          {
            type: 'web_url',
            url: "https://www.facebook.com/yandeva.me",
            title: "Visit Profile"
          },
          {
            type: 'postback',
            title: "Say Hello",
            payload: "HELLO_PAYLOAD"
          }
        ]
      }
    }
  }
});
```

### Sending Image Attachment

Sends an image attachment to the user.

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    attachment: {
      type: 'image',
      payload: {
        url: "https://example.com/image.jpg",
        is_reusable: true // Set to true to reuse the image
      }
    }
  }
});
```

### Sending Generic Template

Sends a carousel-style message with multiple items, each with an image, title, subtitle, and buttons.

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: "First Item",
            image_url: "https://example.com/image1.jpg",
            subtitle: "This is the first item",
            buttons: [
              {
                type: 'web_url',
                url: "https://example.com",
                title: "View Item"
              },
              {
                type: 'postback',
                title: "More Info",
                payload: "MORE_INFO_ITEM_1"
              }
            ]
          },
          {
            title: "Second Item",
            image_url: "https://example.com/image2.jpg",
            subtitle: "This is the second item",
            buttons: [
              {
                type: 'web_url',
                url: "https://example.com",
                title: "View Item"
              },
              {
                type: 'postback',
                title: "More Info",
                payload: "MORE_INFO_ITEM_2"
              }
            ]
          }
        ]
      }
    }
  }
});
```

### Sending Quick Replies

Sends a message with quick reply buttons that disappear after being tapped.

```javascript
api.graph({
  recipient: { id: event.sender.id },
  message: {
    text: "Choose an option:",
    quick_replies: [
      {
        content_type: "text",
        title: "Option 1",
        payload: "OPTION_1"
      },
      {
        content_type: "text",
        title: "Option 2",
        payload: "OPTION_2"
      }
    ]
  }
});
```

Each of these examples demonstrates a different format of messaging to engage users with images, buttons, or dynamic templates. Adjust the templates as needed to fit your application!

## Setting Up "Get Started" Payload

Facebook Messenger allows you to set up a "Get Started" button for new users. When clicked, it sends a payload you can use to initiate a welcome flow.

### Configuring the "Get Started" Button

First, set up the "Get Started" button in your Facebook Page settings or by calling the Facebook API to configure it programmatically.

```javascript
api.graph({
  get_started: { payload: "GET_STARTED_PAYLOAD" }
});
```

### Handling the "Get Started" Payload

When a user clicks the "Get Started" button, a payload is sent. You can use it to send an introductory message or guide the user through initial setup steps.

```javascript
function handlePayload(payload, senderID) {
  if (payload === "GET_STARTED_PAYLOAD") {
    api.sendMessage("Welcome! I'm here to help you.", senderID);
    api.sendMessage("Type 'help' to see what I can do.", senderID);
  }
}

// Example usage
if (event.postback && event.postback.payload) {
  handlePayload(event.postback.payload, event.sender.id);
}
```

---

Here's a sample `README.md` that outlines the differences between **Commands** and **Events** with example code and property explanations.

---

# Commands and Events Differences

In this framework, **Commands** and **Events** serve different purposes, each having unique properties and behaviors that cater to distinct types of interactions. This document explains the differences and provides examples to help understand how to set up each.

## Commands

Commands are user-triggered actions that require specific keywords or prefixes to be recognized. They are typically used for straightforward, user-initiated requests, like `!greet` or `/help`, and need to match the configured command name in order to activate.

### Key Properties for Commands

Commands are structured with specific properties to handle how they respond to user inputs:

- **name**: The name of the command that triggers the execution.
- **usePrefix**: A boolean that defines whether the command requires a prefix (e.g., `!` or `/`) to be recognized.
- **bodyIndex**: Defines the matching behavior for the command name (e.g., starts with, exact match).
- **adminOnly**: Restricts command usage to administrators if set to `true`.

### Command Example

```javascript
module.exports.config = {
  name: "greet",
  author: "YourName",
  version: "1.0",
  description: "Sends a greeting message.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5
};

module.exports.run = function ({ event, args }) {
  api.sendMessage(`Hello, ${args.join(" ")}!`, event.sender.id);
};
```

### How Commands Work

- **Triggering**: Commands trigger based on matching text (like `!greet`) with the `name` property. The `usePrefix` property determines if the command requires a prefix (e.g., `!greet` vs. just `greet`).

### When to Use Commands
Commands are ideal for specific, user-directed actions where structured responses are required, such as:
- **Bot Features**: `/help` to list commands or `/profile` to show user details.
- **Quick Interactions**: `/greet` to send a greeting message or `/status` to check bot status.
- **Note**: These are just examples.

## Events

Events are general actions that the bot listens for, often without requiring specific prefixes or command names. They are more versatile and are used to handle system-wide interactions, background processes, and message handling that isn’t dependent on user commands.

### Key Properties for Events

Events have configurations that control when they activate:

- **name**: Identifies the event (informational, not used for matching).
- **selfListen**: Determines if the event should handle messages sent by the bot itself.
- **description**: Describes the event’s purpose.

### Event Example

```javascript
module.exports.config = {
  name: "Message Logger",
  author: "YourName",
  version: "1.0",
  description: "Logs every message received.",
  selfListen: false, // Skip handling messages sent by the bot
};

module.exports.run = function ({ event, args }) {
  if (event.type === 'message') {
    console.log(`Received message: ${event.message.text}`);
  }
};
```

### How Events Work

- **Triggering**: Events automatically listen to certain actions or message types, such as new messages, reactions, or postbacks, and don’t require specific text or prefixes to activate.
- **Self-Listening Control**: The `selfListen` property determines if events should handle messages that are bot echoes.
  - If `selfListen` is `false` and the message is an echo (`event.message.is_echo`), the event won’t execute.
- **Flexible Context**: Events are designed to handle broader contexts, often listening for any relevant actions in the system rather than specific keywords.

### When to Use Events

Events are suited for background tasks, global listeners, and anything that doesn’t require specific user input:
- **Message Logging**: Log every incoming message.
- **Background Operations**: Automatically handle user reactions, mark messages as read, or handle postbacks.
- **System Monitoring**: Track interactions that happen passively without user intervention.

## Summary of Differences

| Aspect       | Commands                                      | Events                                    |
|--------------|----------------------------------------------|-------------------------------------------|
| **Trigger**  | User-initiated, needs specific text          | Passively listens for actions or messages |
| **Prefix**   | Requires a prefix if `usePrefix` is `true`   | Does not need a prefix                    |
| **Use Case** | Feature-triggered actions, user commands     | Background tasks, system actions, global listeners |
| **Config Properties** | `name`, `author`, `version`, `category`, `description`, `adminOnly`, `usePrefix`, `cooldown` | `name`, `author`, `version`, `description` `selfListen`, |

By keeping Commands and Events distinct, the framework allows targeted control over user-triggered interactions and system-wide listeners.

--- 

### Event Types

Below are the available event types that are triggered during interactions with the bot:

| Event Type          | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| `message`           | A simple message sent by a sender.                                  |
| `message_reply`     | Triggered when a sender replies to a message.                       |
| `mark_as_seen`      | Logs when a sender marks a message as seen.                         |
| `mark_as_delivered`      | Logs when a sender marks a message as delivered.                         |
| `attachments`       | Triggered when an attachment (image, audio, video, or file) is sent. |
| `postback`          | Triggered when a button is clicked.                                 |
| `quick_reply`       | Triggered when a quick reply button is clicked.                     |
| `message_reaction`  | Triggered when a sender reacts to a message.                        |
| `response_feedback`  | Triggered when a sender clicks a like/dislike button feedback of a message.                        |

This gives the user context on what the event types are and how they are triggered.

---

### Available Terminal Themes

Choose from one of the following terminal themes:

|                | Theme Options |              |
|---------------|---------------|---------------|
| Fiery         | Sunlight      | Ghost         |
| Hacker        | Retro         | Purple        |
| Aqua          | Teen          | Rainbow       |
| Blue          | Summer        | Orange        |
| Pink          | Flower        | Red           |

---

#### Setting Up Your Terminal Theme

You can configure the terminal theme in the `config.json` file, along with the ADMIN and TITLE displayed in the terminal.

```json
{
  "THEME_SETUP": {
    "THEME": "Fiery",
    "ADMIN": "Your Name",
    "TITLE": "PAGEBOT"
  }
}
```

Simply replace `"Fiery"`, `"Your Name"`, and `"PAGEBOT"` with your preferred theme, name, and title to personalize your terminal experience.

--- 

## Message Data
Whenever you reply to a message, you can receive its message content without the need for Page App Review.

### Replying to an attachments:
```json
{
  "sender": { "id": "8044984915628464" },
  "recipient": { "id": "392705877267020" },
  "timestamp": 1735858742487,
  "message": {
    "mid": "m_23456",
    "text": "Reply test?",
    "reply_to": {
      "mid": "m_2025123",
      "text": null,
      "attachments": [
        { 
          "type": "template",
          "title": "Hey there newbie!",
          "payload": { 
            "template_type": "generic",
            "sharable": false,
            "elements": [Array] 
          }
        }
      ]
    }
  },
  "type": "message_reply"
}
```

### Replying to a text:
```json
{
  "sender": { "id": "8044984915628464" },
  "recipient": { "id": "392705877267020" },
  "timestamp": 1735858742817,
  "message": {
    "mid": "m_23456",
    "text": "Reply test?",
    "reply_to": {
      "mid": "m_1244567",
      "text": "Hey there! How may I help you today?",
      "attachments": null
    }
  },
  "type": "message_reply"
}
```

The message datas are stored in `./page/data.json`. You can set it up whether you want to use less storage data through clearing it in the `config.json` by setting `clearData` into true. It will clear everytime you run the code.

---

## Author

If you encounter issues or need support, feel free to reach out to the author:

- **Yan Maglinte** (FB: [@YanMaglinte](https://www.facebook.com/yandeva.me))
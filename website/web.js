const path = require("path");
const fs = require("fs");
const color = require("gradient-string");
const chalk = require("chalk");
const config = require("../config.json");
const font = require("fontstyles");
const axios = require("axios");

function html(res) {
  res.sendFile(path.join(__dirname, "index.html"));
}

// Function to display a loading bar
function loadingBar(duration, color) {
  const totalLength = 24; // Length of the loading bar
  let currentLength = 0;

  const interval = setInterval(() => {
    currentLength++;
    const filledLength = "━".repeat(currentLength);
    const unfilledLength = " ".repeat(totalLength - currentLength);
    const percentage = ((currentLength / totalLength) * 100).toFixed(2);

    // Clear the line and print the loading bar
    process.stdout.write(
      `\r |${color(filledLength)}${unfilledLength}| ${percentage}%`,
    );

    if (currentLength >= totalLength) {
      clearInterval(interval);
      console.log("\n\n" + chalk.bold.dim("CHAT LOG:")); // Move to the next line after loading
    }
  }, duration / totalLength); // Adjust the duration to your needs
}

// Retrieve admin name, using a fallback default if not found
const adminName = config.THEME_SETUP.ADMIN || "Unknown";

// ASCII mappings for letter characters, with uppercase and lowercase options
const asciiMappings = {
  a: { upper: " ▄▀█", lower: "░█▀█" },
  b: { upper: "░█▄▄", lower: "░█▄█" },
  c: { upper: "░█▀▀", lower: "░█▄▄" },
  d: { upper: "░█▀▄", lower: "░█▄▀" },
  e: { upper: "░█▀▀", lower: "░██▄" },
  f: { upper: "░█▀▀", lower: "░█▀ " },
  g: { upper: "░█▀▀", lower: "░█▄█" },
  h: { upper: "░█░█", lower: "░█▀█" },
  i: { upper: "░█", lower: "░█" },
  j: { upper: "░░░█", lower: "░█▄█" },
  k: { upper: "░█▄▀", lower: "░█░█" },
  l: { upper: "░█░░", lower: "░█▄▄" },
  m: { upper: "░█▀▄▀█", lower: "░█░▀░█" },
  n: { upper: "░█▄░█", lower: "░█░▀█" },
  o: { upper: "░█▀█", lower: "░█▄█" },
  p: { upper: "░█▀█", lower: "░█▀▀" },
  q: { upper: "░█▀█", lower: " ▀▀█" },
  r: { upper: "░█▀█", lower: "░█▀▄" },
  s: { upper: "░█▀", lower: "░▄█" },
  t: { upper: " ▀█▀", lower: "░░█░" },
  u: { upper: "░█░█", lower: "░█▄█" },
  v: { upper: "░█░█", lower: "░▀▄▀" },
  w: { upper: "░█░█░█", lower: "░▀▄▀▄▀" },
  x: { upper: " ▀▄▀", lower: "░█░█" },
  y: { upper: "░█▄█", lower: "░░█░" },
  z: { upper: "░▀█", lower: "░█▄" },
  "-": { upper: " ▄▄", lower: "░░░" },
  "+": { upper: " ▄█▄", lower: "░░▀░" },
  ".": { upper: "░", lower: "▄" },
};

// Generates ASCII art based on provided text
function generateAsciiArt(text) {
  const title = text || "PAGEBOT";
  const lines = ["  ", "  "];
  for (const char of title.toLowerCase()) {
    const mapping = asciiMappings[char] || { upper: "  ", lower: "  " };
    lines[0] += mapping.upper;
    lines[1] += mapping.lower;
  }

  setTimeout(() => {
    font.bin(getTheme().gradient, getTheme().color)
  }, 400);
  return lines.join("\n");
}

// Get the theme and determine color settings for the gradient and chalk
const theme = config.THEME_SETUP.THEME.toLowerCase() || "";
let colorGradient, colorChalk, htmlColors;

switch (theme) {
  case "fiery":
    colorGradient = color.fruit;
    colorChalk = color("#EB0000", "#D80606", "#E5A800");
    htmlColors = ["#CE2F16", "#fe8916", "#ff952a"];
    logTheme("Fiery");
    break;
  case "aqua":
    colorGradient = color("#2e5fff", "#466deb");
    colorChalk = chalk.hex("#88c2f7");
    htmlColors = ["#2e5fff", "#466deb", "#1BD4F5"];
    logTheme("Aqua");
    break;
  case "hacker":
    colorGradient = color("#47a127", "#0eed19", "#27f231");
    colorChalk = chalk.hex("#4be813");
      htmlColors = ["#049504", "#0eed19", "#01D101"];
    logTheme("Hacker");
    break;
  case "blue":
    colorGradient = color("#1702CF", "#11019F ", "#1401BF");
    colorChalk = chalk.blueBright;
    htmlColors= ["#1702CF", "#11019F ", "#1401BF"];
    logTheme("Blue");
    break;
  case "pink":
    colorGradient = color("#ab68ed", "#ea3ef0", "#c93ef0");
    colorChalk = chalk.hex("#8c00ff");
    htmlColors = ["#ab68ed", "#ea3ef0", "#c93ef0"];
    logTheme("Pink");
    break;
  case "sunlight":
    colorGradient = color("#ffae00", "#ffbf00", "#ffdd00");
    colorChalk = chalk.hex("#f6ff00");
    htmlColors = ["#ffae00", "#ffbf00", "#ffdd00"];
    logTheme("Sunlight");
    break;
  case "retro":
    colorGradient = color.retro;
    colorChalk = chalk.hex("#7d02bf");
    htmlColors = ["#7d02bf", "#FF6F6F", "#E67701"];
    logTheme("Retro");
    break;
  case "teen":
    colorGradient = color.teen;
    colorChalk = chalk.hex("#fa7f7f");
    htmlColors = ["#29D5FB", "#9CFBEF", "#fa7f7f"]
    logTheme("Teen");
    break;
  case "summer":
    colorGradient = color.summer;
    colorChalk = chalk.hex("#f7f565");
    htmlColors = ["#f7f565", "#16FAE3", "#16D1FA"]
    logTheme("Summer");
    break;
  case "flower":
    colorGradient = color.pastel;
    colorChalk = chalk.hex("#6ded85");
    htmlColors = ["#16B6FA", "#FB7248", "#13FF9C"]
    logTheme("Flower");
    break;
  case "ghost":
    colorGradient = color.mind;
    colorChalk = chalk.hex("#95d0de");
    htmlColors = ["#076889", "#0798C7", "#95d0de"]
    logTheme("Ghost");
    break;
  case "purple":
    colorGradient = color("#380478", "#5800d4", "#4687f0");
    colorChalk = chalk.hex('#7a039e');
    htmlColors = ["#380478", "#5800d4", "#4687f0"]
    logTheme("Purple");
    break;
  case "rainbow":
    colorGradient = color.rainbow;
    colorChalk = chalk.hex('#0cb3eb');
    htmlColors = ["#E203B2", "#06DBF7", "#F70606"]
    logTheme("Rainbow");
    break;
  case "orange":
    colorGradient = color("#ff8c08", "#ffad08", "#f5bb47");
    colorChalk = chalk.hex('#ff8400');
    htmlColors = ["#ff8c08", "#ffad08", "#f5bb47"]
    logTheme("Orange");
    break;
  case "red":
    colorGradient = color("#ff0000", "#ff0026");
    colorChalk = chalk.hex("#ff4747");
    htmlColors = ["#ff0000", "#ff4747", "#ff0026"]
    logTheme("Red");
    break;
    // You can add your own default themes here, using the same method above and using hex color
  default:
    colorGradient = color.fruit;
    colorChalk = color("#EB0000", "#D80606", "#E5A800");
    htmlColors = ["#bc6107", "#fe8916", "#ff952a"];
    logUnknownTheme(config.THEME_SETUP.THEME);
}

fs.readFile('./config.json', 'utf8', (err, data) => {
  if (err) return console.error(err);
  const config = JSON.parse(data);
  config.THEME_SETUP.HTML = htmlColors;
  fs.writeFile('./config.json', JSON.stringify(config, null, 2), err => err ? console.error(err) : /*console.log('config.json updated!')*/ "" );
});

function getTheme() {
  return {
    gradient: colorGradient,
    color: colorChalk,
    html,
  }
}

// Display theme information
function logTheme(theme) {
  if (!config.THEME_SETUP.THEME) {
    console.log(`The "THEME" property in the config is empty. To apply a custom theme, please provide one.`);
  }
}

// Shows up if unknown theme is used
function logUnknownTheme(theme) {
  console.log(`The theme "${theme}" is not recognized. Using the default theme instead.`);
};

async function checkForUpdates() {
  // Load local package.json version
  const localPackagePath = path.join(__dirname, "../package.json");
  const localPackage = JSON.parse(fs.readFileSync(localPackagePath, "utf8"));
  const localVersion = localPackage.version;

  // URL for remote package.json
  const remotePackageUrl = "https://raw.githubusercontent.com/YANDEVA/Pagebot/refs/heads/main/package.json";

  try {
    // Fetch remote package.json
    const response = await axios.get(remotePackageUrl);
    const remoteVersion = response.data.version;

    // Compare versions
    if (remoteVersion !== localVersion) {
      // Check if local version is ahead
      const localParts = localVersion.split('.').map(Number);
      const remoteParts = remoteVersion.split('.').map(Number);

      let isLocalNewer = false;
      for (let i = 0; i < Math.max(localParts.length, remoteParts.length); i++) {
        const localPart = localParts[i] || 0;
        const remotePart = remoteParts[i] || 0;

        if (localPart > remotePart) {
          isLocalNewer = true;
          break;
        } else if (localPart < remotePart) {
          isLocalNewer = false;
          break;
        }
      }

      if (isLocalNewer) {
        setTimeout(() => {
          console.log(`${colorGradient(`SYSTEM:`)} Your local version (${colorGradient(localVersion)}) is ahead of the remote version (${colorGradient(remoteVersion)}).`);
          console.log(`${colorGradient(`SYSTEM:`)} You may be using a development or unreleased version.`);
        }, 4500);
      } else {
        setTimeout(() => {
          console.log(`${colorGradient(`SYSTEM:`)} A new version is available! Local: ${colorGradient(localVersion)}, Remote: ${colorGradient(remoteVersion)}`);
          console.log(`${colorGradient(`SYSTEM:`)} Update now! ${colorGradient(`https://github.com/YANDEVA/Pagebot`)}`);
        }, 4500);
      }
    }
  } catch (error) {
    console.error("Failed to check for updates:", error.message);
  }
}

// Main log function with theme and admin information display
function log() {
  // Call the update checker function
  checkForUpdates();

  const title = config.THEME_SETUP.TITLE || "";
  const asciiTitle = generateAsciiArt(title);
  console.log(colorGradient.multiline(asciiTitle));
  setTimeout(() => {
    console.log(
      // colorGradient(" ❱ ") + "Credits to",
      // colorChalk("Yan Maglinte"),
      colorGradient(" ❱ ") + `Admin: ${colorChalk(adminName)}`,
    );

    function loadModules(commandsPath, eventsPath) {
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
      const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
      let validCommands = 0;
      let validEvents = 0;

      console.log(`\nLoading ${commandFiles.length} command(s) and ${eventFiles.length} event(s)...`);

      // Display loading bar
      loadingBar(1500, colorGradient); // Adjust duration as needed

      // Load and validate commands
      commandFiles.forEach(file => {
        const commandPath = path.join(commandsPath, file);
        const command = require(commandPath);

        let missingProperties = [];
        // Check for missing properties in command
        if (!command.config) {
          missingProperties.push("config object");
        } else {
          if (typeof command.config.name !== "string") missingProperties.push("name");
          if (typeof command.config.usePrefix !== "boolean") missingProperties.push("usePrefix");
          if (typeof command.config.adminOnly !== "boolean") missingProperties.push("adminOnly");
          if (typeof command.config.category !== "string") missingProperties.push("category");
          if (typeof command.config.version !== "string") missingProperties.push("version");
          if (typeof command.config.author !== "string") missingProperties.push("author");
        }

        // Log details about each command
        if (missingProperties.length === 0) {
          validCommands++;
          console.log(
            `${colorChalk(`✔`)} Command Loaded: ${colorChalk(command.config.name)}`
          );
        } else {
          console.log(
            `${chalk.red(`✘`)} Invalid Command: ${file} - Missing properties: ${missingProperties.join(", ")}`
          );
        }
      });

      // Load and validate events
      eventFiles.forEach(file => {
        const eventPath = path.join(eventsPath, file);
        const event = require(eventPath);

        let missingProperties = [];
        // Check for missing properties in event
        if (!event.config) {
          missingProperties.push("config object");
        } else {
          if (typeof event.config.name !== "string") missingProperties.push("name");
          if (typeof event.config.selfListen !== "boolean") missingProperties.push("selfListen");
        }

        // Log details about each event
        if (missingProperties.length === 0) {
          validEvents++;
          console.log(
            `${colorChalk(`✔`)} Event Loaded: ${colorChalk(event.config.name)}`
          );
        } else {
          console.log(
            `${chalk.red(`✘`)} Invalid Event: ${file} - Missing properties: ${missingProperties.join(", ")}`
          );
        }
      });

      console.log(`\nTotal Commands Loaded: ${validCommands}/${commandFiles.length}`);
      console.log(`Total Events Loaded: ${validEvents}/${eventFiles.length}\n`);
    }

    // Usage
    const commandsPath = path.join(__dirname, "../modules/scripts/commands");
    const eventsPath = path.join(__dirname, "../modules/scripts/events");

    loadModules(commandsPath, eventsPath);
  }, 500);
}

function verify(req, res) {
  const config = JSON.parse(fs.readFileSync("./config.json"), "utf8");
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.VERIFY_TOKEN) {
    console.log(getTheme().gradient(`SYSTEM:`), "WEBHOOK VERIFIED!");
    res.status(200).send(challenge);
  } else {
    console.error("Verification failed. Make sure the tokens match.");
    res.sendStatus(403);
  }
}

module.exports = {
  html,
  log,
  verify,
  getTheme,
};

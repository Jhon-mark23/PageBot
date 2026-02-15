const fs = require("fs");
const path = require("path");
const config = require("../config.json");

const cooldowns = new Map();

module.exports = async function (event) {
  const id = event.sender.id;
  const messageText = (event.message?.text || event.postback?.title || "").trim();
  if (!messageText) return;

  const isAdmin = config.ADMINS.includes(id);
  const args = messageText.split(/\s+/);
  const rawCmd = args.shift().toLowerCase();

  const cmdsPath = path.join(__dirname, "../modules/scripts/commands");
  const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const cmd = require(path.join(cmdsPath, file));
    if (!cmd.config) continue;

    let isMatch = false;
    if (cmd.config.usePrefix) {
      if (rawCmd === config.PREFIX + cmd.config.name.toLowerCase()) isMatch = true;
    } else {
      if (rawCmd === cmd.config.name.toLowerCase()) isMatch = true;
    }

    if (isMatch) {
      if (cmd.config.adminOnly && !isAdmin) {
        return api.sendMessage("Admin only command.", id);
      }

      const now = Date.now();
      const cooldownKey = `${id}_${cmd.config.name}`;
      if (cooldowns.has(cooldownKey)) {
        const expiration = cooldowns.get(cooldownKey) + (cmd.config.cooldown * 1000);
        if (now < expiration) {
          return api.sendMessage(`Wait ${Math.ceil((expiration - now) / 1000)}s.`, id);
        }
      }

      cooldowns.set(cooldownKey, now);
      await cmd.run({ event, args });
      return;
    }
  }

  // Event handlers
  const eventsPath = path.join(__dirname, "../modules/scripts/events");
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));
  for (const file of eventFiles) {
    const ev = require(path.join(eventsPath, file));
    if (ev.run) await ev.run({ event, args });
  }
};

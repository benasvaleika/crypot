import DiscordJs, { Client, Collection, Intents } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const client: Client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

const commandPrefix = "!";

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./src/commands/")
  .filter((file) => file.endsWith(".ts"));

for (let i = 0; i < commandFiles.length; i++) {
  const command = require(`./commands/${commandFiles[i]}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("Crypot is on");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

  const args = message.content.slice(commandPrefix.length).split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === "add") {
    client.commands.get("add")?.execute(message, args);
  } else if (command === "fact") {
    client.commands.get("fact")?.execute(message, args);
  } else if (command === "write") {
    client.commands.get("write")?.execute(message, args);
  } else if (command === "read") {
    client.commands.get("read")?.execute(message, args);
  }
});

client.login(process.env.TOKEN);

import DiscordJs, {
  Client,
  Collection,
  Intents,
  TextChannel,
} from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import displayDailyChange from "./functions/dailyChange";
import displayDailyPrices from "./functions/dailyPrices";
import { getChannel, getFirstTrigger } from "./utils/utils";
const bitvavo = require("bitvavo")();

dotenv.config();

const client: Client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

bitvavo.options({
  APIKEY: process.env.BTVKEY,
  APISECRET: process.env.BTVSECRET,
  ACCESSWINDOW: 10000,
  RESTURL: "https://api.bitvavo.com/v2",
  WSURL: "wss://ws.bitvavo.com/v2/",
  DEBUGGING: false,
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

client.on("ready", async (client) => {
  console.log("Crypot is on");

  // Starts daily crypto report loop
  setTimeout(() => {
    displayDailyPrices(client);
    displayDailyChange(client);
    setInterval(() => {
      displayDailyPrices(client);
      displayDailyChange(client);
    }, 24 * 60 * 60 * 1000); // 24 hours
  }, getFirstTrigger("21:00"));
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
  } else if (command === "price") {
    client.commands.get("getPrice")?.execute(message, args);
  } else if (command === "change") {
    client.commands.get("getChange")?.execute(message, args);
  }
});

client.login(process.env.TOKEN);

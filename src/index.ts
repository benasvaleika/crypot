import axios from "axios";
import DiscordJs, { Intents } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

const commandPrefix = "-";

client.on("ready", () => {
  console.log("Crypot is on");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

  const args = message.content.slice(commandPrefix.length).split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === "add") {
    const result = parseInt(args[0]) + parseInt(args[1]);
    message.channel.send(`${args[0]} + ${args[1]} ira ${result}`);
  } else if (command === "fact") {
    const fetchFunFact = async () => {
      const funFact = await axios.get(`http://numbersapi.com/${args[0]}`);
      message.channel.send(funFact.data);
    };
    fetchFunFact();
  } else if (command === "write") {
    const data = message.content.slice(7); // command length
    console.log(data);
    fs.appendFile("./src/data/collected.txt", `\n${data}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else if (command === "read") {
    const readFile = async () => {
      const text = await fs.readFileSync("./src/data/collected.txt", "utf8");
      message.channel.send(text);
    };
    readFile();
  }
});

client.login(process.env.TOKEN);

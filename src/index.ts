import DiscordJs, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  console.log("Crypot is on");
});

client.on("messageCreate", (message) => {
  if (message.content === "she") {
    message.channel.send("eeesh");
  }
});

client.login(process.env.TOKEN);

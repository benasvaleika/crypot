import fs from "fs";

module.exports = {
  name: "read",
  description: "Reads and messages file content, previously written by users",
  async execute(message: any, args?: any) {
    const text = await fs.readFileSync("./src/data/collected.txt", "utf8");
    console.log("read message");
    message.channel.send(text);
  },
};

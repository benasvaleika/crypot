import fs from "fs";

module.exports = {
  name: "write",
  description: "Writes text to a file, stored in data directory",
  execute(message: any, args?: any) {
    const data = message.content.slice(7); // command length
    fs.appendFile("./src/data/collected.txt", `\n${data}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

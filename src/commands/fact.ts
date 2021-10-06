import axios from "axios";

module.exports = {
  name: "fact",
  description: "Displays a random fact about a number",
  async execute(message: any, args?: any) {
    const funFact = await axios.get(`http://numbersapi.com/${args[0]}`);
    message.channel.send(funFact.data);
  },
};

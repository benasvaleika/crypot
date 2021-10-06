module.exports = {
  name: "add",
  description: "adds two numbers given as args",
  execute(message: any, args?: any) {
    const result = parseInt(args[0]) + parseInt(args[1]);
    message.channel.send(`${args[0]} + ${args[1]} ira ${result}`);
  },
};

const bitvavo = require("bitvavo")();

module.exports = {
  name: "getPrice",
  description: "Gets price of a crpyto asset",
  async execute(message: any, args: any) {
    try {
      let response = await bitvavo.tickerPrice({});
      let resultMessage = "";
      for (let entry of response) {
        if (entry.market === "NANO-EUR") {
          resultMessage = resultMessage + ` | NANO kaina: ${entry.price}€`;
          // message.channel.send(`NANO kaina: ${entry.price}€`);
        } else if (entry.market === "BTC-EUR") {
          resultMessage = resultMessage + ` | BTC kaina: ${entry.price}€`;
          // message.channel.send(`BTC kaina: ${entry.price}€`);
        } else if (entry.market === "ETH-EUR") {
          resultMessage = resultMessage + ` | ETH kaina: ${entry.price}€`;
          // message.channel.send(`ETH kaina: ${entry.price}€`);
        } else if (entry.market === "SOL-EUR") {
          resultMessage = resultMessage + ` | SOLANA kaina: ${entry.price}€`;
          // message.channel.send(`SOLANA kaina: ${entry.price}€`);
        }
      }
      message.channel.send(resultMessage);
    } catch (error) {
      console.log(error);
    }
  },
};

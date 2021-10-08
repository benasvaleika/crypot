const bitvavo = require("bitvavo")();

module.exports = {
  name: "getPrice",
  description: "Gets price of a crpyto asset",
  async execute(message: any, args: any) {
    try {
      let response = await bitvavo.tickerPrice({});
      for (let entry of response) {
        if (entry.market === "NANO-EUR") {
          message.channel.send(`NANO kaina: ${entry.price}€`);
        } else if (entry.market === "BTC-EUR") {
          message.channel.send(`BTC kaina: ${entry.price}€`);
        } else if (entry.market === "ETH-EUR") {
          message.channel.send(`ETH kaina: ${entry.price}€`);
        } else if (entry.market === "SOL-EUR") {
          message.channel.send(`SOLANA kaina: ${entry.price}€`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};

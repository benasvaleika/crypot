const bitvavo = require("bitvavo")();

module.exports = {
  name: "getPrice",
  description: "Gets price of a crpyto asset",
  async execute(message: any, args?: any) {
    try {
      let response = await bitvavo.tickerPrice({});
      for (let entry of response) {
        console.log(entry);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

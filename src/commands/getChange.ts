module.exports = {
  name: "getChange",
  description: "Gets price difference between current and past timestamp",
  async execute(message: any, args: any) {
    const bitvavo = require("bitvavo")();
    const marketArg = args[0].toUpperCase();

    if (["BTC", "ETH", "NANO", "SOL"].includes(marketArg)) {
      if (args[1] === "1d" || args[1] === "24h") {
        try {
          let response = await bitvavo.candles(marketArg + "-EUR", "1h", {
            limit: 24,
          });
          const currDayOpen = response[23][1];
          const currDayClose = response[0][4];
          const change = (100 / currDayOpen) * currDayClose - 100;
          message.channel.send(
            `${marketArg} change in 24h: ${
              Math.round((change + Number.EPSILON) * 100) / 100
            }%`
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      message.channel.send("Invalid Market");
    }
  },
};

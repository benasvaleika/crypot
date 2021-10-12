import { fetchCandles } from "../utils/utils";

module.exports = {
  name: "getChange",
  description: "Gets price difference between current and past timestamp",
  async execute(message: any, args: any) {
    const marketArg = args[0].toUpperCase();
    let timeArg = args[1];
    if (timeArg === "24h") {
      timeArg = "1d";
    }

    if (["BTC", "ETH", "NANO", "SOL"].includes(marketArg)) {
      if (["1h", "12h", "1d", "7d", "30d"].includes(timeArg)) {
        try {
          let timeOpen = 0;
          let timeClose = 0;
          let response: any;

          if (["1h", "12h", "1d"].includes(timeArg)) {
            response = await fetchCandles(marketArg, "1h", 24);
          } else {
            response = await fetchCandles(marketArg, "1d", 30);
          }

          switch (timeArg) {
            case "1h":
              timeOpen = response[0][1];
              timeClose = response[0][4];
              break;
            case "12h":
              timeOpen = response[11][1];
              timeClose = response[0][4];
              break;
            case "1d":
              timeOpen = response[23][1];
              timeClose = response[0][4];
              break;
            case "7d":
              timeOpen = response[6][1];
              timeClose = response[0][4];
              break;
            case "30d":
              timeOpen = response[29][1];
              timeClose = response[0][4];
              break;
          }

          const change = (100 / timeOpen) * timeClose - 100;

          message.channel.send(
            `${marketArg} change in ${timeArg}: ${
              Math.round((change + Number.EPSILON) * 100) / 100
            }%`
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        message.channel.send("Invalid Time Period (1h, 12h, 1d, 7d, 30d)");
      }
    } else {
      message.channel.send("Invalid Market (BTC, ETH, NANO, SOL)");
    }
  },
};

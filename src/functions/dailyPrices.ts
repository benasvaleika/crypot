const bitvavo = require("bitvavo")();
import DiscordJs from "discord.js";
import { getChannel } from "../utils/utils";

const displayDailyPrices = async (client: any) => {
  try {
    let response = await bitvavo.tickerPrice({});
    const generalChannel: any = getChannel(client, "general");
    let resultMessage = "";

    for (let entry of response) {
      if (entry.market === "NANO-EUR") {
        resultMessage = resultMessage + ` | NANO kaina: ${entry.price}€`;
        // generalChannel.send(`NANO kaina: ${entry.price}€`);
      } else if (entry.market === "BTC-EUR") {
        resultMessage = resultMessage + ` | BTC kaina: ${entry.price}€`;
        // generalChannel.send(`BTC kaina: ${entry.price}€`);
      } else if (entry.market === "ETH-EUR") {
        resultMessage = resultMessage + ` | ETH kaina: ${entry.price}€`;
        // generalChannel.send(`ETH kaina: ${entry.price}€`);
      } else if (entry.market === "SOL-EUR") {
        resultMessage = resultMessage + ` | SOLANA kaina: ${entry.price}€`;
        // generalChannel.send(`SOLANA kaina: ${entry.price}€`);
      }
    }
    generalChannel.send(resultMessage);
  } catch (error) {
    console.log(error);
  }
};

export default displayDailyPrices;

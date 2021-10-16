const bitvavo = require("bitvavo")();
import { getChannel } from "../utils/utils";

const displayDailyChange = async (client: any) => {
  const generalChannel: any = getChannel(client, "general");
  const dailyMarkets = ["BTC", "ETH", "NANO", "SOL"];
  let resultMsg = "Daily Change:";

  for (let i = 0; i < dailyMarkets.length; i++) {
    const market = dailyMarkets[i];
    const fetchMarket = await bitvavo.candles(market + "-EUR", "1h", {
      limit: 24,
    });

    const timeOpen = fetchMarket[23][1];
    const timeClose = fetchMarket[0][4];

    const change = (100 / timeOpen) * timeClose - 100;

    resultMsg =
      resultMsg +
      ` | ${market}: ${Math.round((change + Number.EPSILON) * 100) / 100}%`;
  }

  generalChannel.send(resultMsg);
};

export default displayDailyChange;

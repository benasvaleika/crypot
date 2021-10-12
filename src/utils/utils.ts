import DiscordJs, { Client } from "discord.js";

// Returns time in ms untill first function trigger
export const getFirstTrigger = (timeString: string) => {
  const hour = Number(timeString.split(":")[0]);
  const minute = Number(timeString.split(":")[1]);

  const currentTime = new Date();
  const triggerTime = new Date();
  triggerTime.setHours(hour, minute);

  if (triggerTime < currentTime) {
    triggerTime.setHours(triggerTime.getHours() + 24);
  }

  const msToTrigger = triggerTime.getTime() - currentTime.getTime();

  return msToTrigger;
};

// Finds and returns requested discord channel
export const getChannel = (client: Client, channelName: string) => {
  const resultChannel = client.channels.cache.find(
    (channel: DiscordJs.Channel) => channel.name == channelName
  );

  return resultChannel;
};

// Fetches candle data from bitvavo API
export const fetchCandles = async (
  market: string,
  time: string,
  limit: number
) => {
  const bitvavo = require("bitvavo")();
  const response = await bitvavo.candles(market + "-EUR", time, {
    limit: limit,
  });
  return response;
};

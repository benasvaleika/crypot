import DiscordJs, { Client } from "discord.js";

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

export const getChannel = (client: Client, channelName: string) => {
  const resultChannel = client.channels.cache.find(
    (channel: DiscordJs.Channel) => channel.name == "general"
  );

  return resultChannel;
};

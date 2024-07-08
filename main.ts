import Discord from 'discord.js'
import { DisTube } from "distube";
import { YouTubePlugin } from "@distube/youtube";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { token } from './config.ts';



const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootPath = __dirname;

declare module "discord.js" {
  interface Client {
    slashCommands: Map<string, any>;
    events: Map<string, any>;
  }
}

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ],
  partials: [
    Discord.Partials.Channel
  ],
})

const distube = new DisTube(client, {
  plugins: [
      new YouTubePlugin()
  ],
  savePreviousSongs: false,
});

const ytPlugin = new YouTubePlugin()
client.events = new Map(); //@ts-ignore
client.slashCommands = new Map(); //@ts-ignore
client.distube = distube;


await Promise.all([
  import("./src/handlers/Event.ts").then(({ EventHandler }) =>
      EventHandler(client, rootPath) //@ts-ignore
    ),
  import("./src/handlers/Command.ts").then(({ CommandHandler }) =>
      CommandHandler(client, rootPath) //@ts-ignore
    ),
])
client.login(token)

client.on('ready', (client: Discord.Client<boolean>) => {
  console.log(`Logged in as ${client.user?.tag}!`);
});
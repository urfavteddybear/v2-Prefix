module.exports = {
  token: process.env.token || "", //Bot's Token
  clientId: process.env.clientId || "", //ID of the bot
  clientSecret: process.env.clientSecret || "", //Client Secret of the bot
  prefix: process.env.PREFIX || ",", // Default Prefix
  mongoURL: process.env.mongo || "", // MongoDB URL
  port: 4200, //Port of the API and Dashboard
  scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  serverDeafen: true, //If you want bot to stay deafened
  defaultVolume: 100, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
  supportServer: "", //Support Server Link
  Issues: "", //Bug Report Link
  permissions: 826839002433, //Bot Inviting Permissions
  disconnectTime: 30000, //How long should the bot wait before disconnecting from the voice channel. in miliseconds. set to 1 for instant disconnect.
  alwaysplay: true, // when set to true music will always play no matter if theres no one in voice channel.
  debug: true, //Debug mode
  // Lavalink server; optional public lavalink -> https://lavalink-list.darrennathanael.com/
  // The default one should work fine, these are picked due to their speed and not using cloudflare.
  nodes: [
    {
      identifier: "Main", //- Used for indentifier in stats commands.
      host: "176.31.203.21",
      port: 1859,
      password: "lavaserver",
      retryAmount: 15, //- The amount of times to retry connecting to the node if connection got dropped.
      retryDelay: 6000, //- Delay between reconnect attempts if connection is lost.
      secure: false, //- Can be either true or false. Only use true if ssl is enabled!
    },
    {
      identifier: "Main 2", //- Used for indentifier in stats commands.
      host: "54.37.6.86",
      port: 80,
      password: "Blacky#9125",
      retryAmount: 15, //- The amount of times to retry connecting to the node if connection got dropped.
      retryDelay: 6000, //- Delay between reconnect attempts if connection is lost.
      secure: false, //- Can be either true or false. Only use true if ssl is enabled!
    },
  ],
  embedColor: "#b72d30", //Color of the embeds, hex supported
  iconURL: "", //This icon will be in every embed's author field
};

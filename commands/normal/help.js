const { MessageEmbed } = require("discord.js");
const LoadCommands = require("../../util/loadCommands");

module.exports = {
    name: "help",
    category: "Util",
    description: "Shows all available commands",
    args: false,
    usage: "",
    permission: [],
    aliases: ["cmd", "cmds"],

    run: async (message, args, client, prefix) => {

        // map the commands name and description to the embed
    const commands = await LoadCommands().then((cmds) => {
      return [].concat(cmds.slash).concat(cmds.context);
    });
    // from commands remove the ones that hae no description
    const filteredCommands = commands.filter((cmd) => cmd.description);

    // if git exists, then get commit hash
    let gitHash = "";
    try {
      gitHash = require("child_process")
        .execSync("git rev-parse --short HEAD")
        .toString()
        .trim();
    } catch (e) {
      // do nothing
      console.log("ignore error about git.");
      gitHash = "unknown";
    }

    // create the embed
    const helpEmbed = new MessageEmbed()
      .setAuthor({
        name: `Commands of ${client.user.username}`,
        iconURL: client.config.iconURL,
        url: client.config.website,
      })
      .setColor(client.config.embedColor)
      .setDescription(`\`\`\`fix` + "\n" +
        filteredCommands
          .map((cmd) => {
            return `${cmd.name}`;
          })
          .join(" • ") +
          "\`\`\`\n" +
          `Bot Version: v${
            require("../../package.json").version
          }; Build: ${gitHash}` +
          "\n" +
          `[✨ Invite Me](https://discord.com/api/oauth2/authorize?client_id=929248460442574859&permissions=277083450689&scope=bot%20applications.commands)`
      );
    // Do not change the Source code link.
    return message.reply({ embeds: [helpEmbed], ephemeral: false });
    }
}
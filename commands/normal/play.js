const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    category: "Music",
    description: "Play your favourite song",
    args: false,
    usage: "",
    permission: [],
    aliases: ["p"],

    run: async (message, args, client, prefix) => {

        let channel = await client.getChannel(client, message);
        if (!channel) return;

        let node = await client.getLavalink(client);
        if (!node) {
            return message.reply({
                embeds: [client.ErrorEmbed("Lavalink node is not connected")],
            });
        }
        let query = args.join(" ");
        if (!query) {
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(":x: | Please type a valid song name or song URL to play")
                ]
            })
        }
        let player = client.createPlayer(message.channel, channel);
        if (!message.member.voice.channel) {
            const joinEmbed = new MessageEmbed()
                .setColor(client.config.embedColor)
                .setDescription(
                    "❌ | **You must be in a voice channel to use this command.**"
                );
            return message.reply({ embeds: [joinEmbed], ephemeral: true });
        }
        if (player.state !== "CONNECTED") {
            player.connect();
        }
        // console.log(player);
        // if the channel is a stage channel then request to speak
        if (channel.type == "GUILD_STAGE_VOICE") {
            setTimeout(() => {
                if (message.guild.me.voice.suppress == true) {
                    try {
                        message.guild.me.voice.setSuppressed(false);
                    } catch (e) {
                        message.guild.me.voice.setRequestToSpeak(true);
                    }
                }
            }, 2000); // set timeout are here, because bot sometimes takes time before reconising it's a stage.
        }

        await message.reply({
            embeds: [client.Embed(":mag_right: **Searching...**")],
        }).then(async msg => {

            let res = await player.search(query, message.author).catch((err) => {
                client.error(err);
                return {
                    loadType: "LOAD_FAILED",
                };
            });

            if (res.loadType === "LOAD_FAILED") {
                if (!player.queue.current) player.destroy();
                return msg
                    .edit({
                        embeds: [client.ErrorEmbed("There was an error while searching")],
                    })
                    .catch(this.warn);
            }

            if (res.loadType === "NO_MATCHES") {
                if (!player.queue.current) player.destroy();
                return msg
                    .edit({
                        embeds: [client.ErrorEmbed("No results were found")],
                    })
                    .catch(this.warn);
            }

            if (res.loadType === "TRACK_LOADED" || res.loadType === "SEARCH_RESULT") {
                player.queue.add(res.tracks[0]);
                if (!player.playing && !player.paused && !player.queue.size)
                    player.play();
                let addQueueEmbed = client
                    .Embed()
                    .setAuthor({ name: "Added to queue", iconURL: client.config.iconURL })
                    //.setAuthor("Added to queue", client.config.iconURL) Deprecated soon
                    .setDescription(
                        `[${res.tracks[0].title}](${res.tracks[0].uri})` || "No Title"
                    )
                    .setURL(res.tracks[0].uri)
                    .addField("Author", res.tracks[0].author, true)
                    .addField(
                        "Duration",
                        res.tracks[0].isStream
                            ? `\`LIVE\``
                            : `\`${client.ms(res.tracks[0].duration, {
                                colonNotation: true,
                            })}\``,
                        true
                    );
                try {
                    addQueueEmbed.setThumbnail(
                        res.tracks[0].displayThumbnail("maxresdefault")
                    );
                } catch (err) {
                    addQueueEmbed.setThumbnail(res.tracks[0].thumbnail);
                }
                if (player.queue.totalSize > 1)
                    addQueueEmbed.addField(
                        "Position in queue",
                        `${player.queue.size - 0}`,
                        true
                    );
                return msg
                    .edit({ embeds: [addQueueEmbed] })
                    .catch(this.warn);
            }

            if (res.loadType === "PLAYLIST_LOADED") {
                player.queue.add(res.tracks);
                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                    player.play();
                let playlistEmbed = client
                    .Embed()
                    .setAuthor({
                        name: "Playlist added to queue",
                        iconURL: client.config.iconURL,
                    })
                    //.setAuthor("Playlist added to queue", client.config.iconURL)
                    .setThumbnail(res.tracks[0].thumbnail)
                    .setDescription(`[${res.playlist.name}](${query})`)
                    .addField("Enqueued", `\`${res.tracks.length}\` songs`, false)
                    .addField(
                        "Playlist duration",
                        `\`${client.ms(res.playlist.duration, {
                            colonNotation: true,
                        })}\``,
                        false
                    );
                return msg
                    .edit({ embeds: [playlistEmbed] })
                    .catch(this.warn);
            }
        });
    }
}
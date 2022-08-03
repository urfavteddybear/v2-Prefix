/**
 *
 * @param {import("../lib/DiscordMusicBot")} client
 */
 module.exports = (client) => {
  client.manager.init(client.user.id);
  client.log("Successfully Logged in as " + client.user.tag);
    
    let statuses = ['/help', ',help'];
    setInterval(function() {
  	let status = statuses[Math.floor(Math.random()*statuses.length)];		
        client.user.setPresence({
            activities: [
                {
                    name: status,
                    type: "LISTENING"
                }
            ],
            status: "online"
        });
    }, 10000)
    
};

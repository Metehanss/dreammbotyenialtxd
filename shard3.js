const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');
Manager.spawn(1); // This example will spawn 2 shards (5,000 guilds);

Manager.on('launch', function(shard) {
    console.log(`SHARD ${shard.id}: Aktif.`);
});
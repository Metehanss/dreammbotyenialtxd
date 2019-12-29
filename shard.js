const { ShardingManager } = require("discord.js");
const config = require("./ayarlar.json");
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var api = false;
const dreambot = new ShardingManager(`${__dirname}/bot.js`, { totalShards: "auto", token: config.benimyav, respawn: true });

dreambot.spawn();
dreambot.on("launch", shard => {
    console.log("Shard başarıyla başlatıldı! " + (shard.id + 1) + "/" + dreambot.totalShards);
    if (dreambot.totalShards == shard.id + 1) {
        if (!api) {
            app.listen(8080, () => {
                console.log("API başarıyla 8080 portunda başlatıldı!");
                api = true;
            });
        }
    }
});

app.get('/api', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    dreambot.fetchClientValues('guilds.size').then(g => {
        dreambot.fetchClientValues('users.size').then(u => {
            dreambot.fetchClientValues('channels.size').then(c => {
                res.json({sunucu: g.reduce((prev, val) => prev + val, 0), kullanici: u.reduce((prev, val) => prev + val, 0), kanal: c.reduce((prev, val) => prev + val, 0)});
            })
        })
    })
});
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const path = require('path');
const { Client } = require('discord.js');
const db = require('quick.db');
const { RichEmbed } = require('discord.js'),
moment = require('moment'),
Jimp = require('jimp'),
fs = require('fs'),
sqlite = require('sqlite'),
Discord = require('discord.js');

const client = new CommandoClient({
    commandPrefix: ayarlar.prefix,
    unknownCommandResponse: false,
    owner: ayarlar.sahip,
    disableEveryone: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
  ['sunucu', 'Sunucu Komutları'],
  ['bot', 'Bot Komutları'],
  ['ayarlar', 'Ayar Komutları'],
  ['admin', 'Admin Komutları'],
  ['moderatör', 'Moderatör Komutları'],
  ['eglence', 'Eğlence Komutları'],
  ['bilgi', 'Bilgi Komutları'],
  ['genel', 'Genel Komutlar'],
  ['minecraft', 'Minecraft Komutları'],
  ['destek' , 'Destek Komutları'],
  ['başvuru', 'Başvuru Komutları'],
  ['premium', 'Premium Komutlar'],
  ['seviye' , 'Seviye Komutları']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

	sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

client.on('ready', () => {      
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
  client.user.setStatus("dnd");
  var msgArray = [
"dr!yardım | dr!davet",
"Bot güncellemelerinden dolayı kesintiler yaşanabilir.",
"dr!öneri  | Önerinizi bize göndere bilirsiniz.",
 ];

 setInterval(() => {
  var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
  client.user.setActivity(`${msgArray[rastgeleOyun]}`, { type: 'STREAMING' ,  url: 'https://www.twitch.tv/dream1841' })
}, 15000);
})

.on('commandPrefixChange', (guild, prefix) => {
		console.log(`
			Prefix ${prefix === '' ? 'değiştirildi' : `Yeni Prefix ${prefix || 'varsayılan'}`}
			${guild ? `sunucu ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})

.on('message', async msg => {
  if (msg.content.toLowerCase() === `<@${client.user.id}>`) {
    msg.channel.send(`Prefix:  **${msg.guild.commandPrefix}**\nKomutlara bakmak için: **${msg.guild.commandPrefix}yardım**`)
  }
  })
  
.on("guildMemberAdd", async member => {
        const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
        if (veri ==! true) return;
        if (veri === true) {
            const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
            let username = member.user.username;
            if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
            if (member.guild.channels.get(kanalveri).type === "text") {
                const bg = await Jimp.read("./guildAdd.png");
                const userimg = await Jimp.read(member.user.avatarURL || member.user.displayAvatarURL);
                var font;
                if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
                else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
                else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                await bg.print(font, 430, 170, member.user.tag);
                await userimg.resize(340, 340);
                await bg.composite(userimg, 12, 65).write("./img/DreamBot-Hosgeldin.png");
                  setTimeout(function () {
                        member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/DreamBot-Hosgeldin.png"));
                  }, 1000);
            }
        }
    })

  .on("guildMemberRemove", async member => {
	const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
	if (veri ==! true) return;
	if (veri === true) {
		const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
		let username = member.user.username;
		if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
		if (member.guild.channels.get(kanalveri).type === "text") {
			const bg = await Jimp.read("./guildRemove.png");
			const userimg = await Jimp.read(member.user.avatarURL || member.user.displayAvatarURL);
			var font;
			if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
			else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
			else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				await bg.print(font, 430, 170, member.user.tag);
				await userimg.resize(340, 340);
				await bg.composite(userimg, 12, 65).write("./img/DreamBot-Gorusuruz.png");
			  setTimeout(function () {
					member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/DreamBot-Gorusuruz.png"));
			  }, 1000);
		}
	}
	})
	
		.on('guildMemberAdd', async member => {
			if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_ROLES')) {
				return console.log('Rol vermek için `Rolleri Yönet` yetkim yok?');
			}else {
		const veri = client.provider.get(member.guild.id, 'girisRolK', []);
		if (veri ==! true) return;
		if (veri === true) {
	        if(member.user.bot) {return;}
                if(!member.user.bot) {
			const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
			if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
			member.addRole(girisrolveri);
		}
		}
	}
	})
	
	.on('guildMemberAdd', async member => {
		if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_ROLES')) {
			return console.log('Rol vermek için `Rolleri Yönet` yetkim yok?');
		}else {
    const veri = client.provider.get(member.guild.id, 'botgirisRolK', []);
    if (veri ==! true) return;
    if (veri === true) {
        const botgirisrolveri = client.provider.get(member.guild.id, 'botgirisRol', []);
        if (member.guild.roles.get(botgirisrolveri) === undefined || member.guild.roles.get(botgirisrolveri) === null) return;
        if(member.user.bot) {
    return member.addRole(botgirisrolveri);
        }
	}
}
})

.on('guildMemberAdd' ,member => {
	if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_CHANNELS')) {
		return console.log('Sunucu paneli düzeltmek için `Kanalları Yönet` yetkim yok?');
	}else {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
};
	}
})

.on('guildMemberRemove' ,member => {
	if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_CHANNELS')) {
		return console.log('Sunucu paneli düzeltmek için `Kanalları Yönet` yetkim yok?');
	}else {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
}
	}
})

.on('guildBanAdd', async (guild, member) => {
	if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_CHANNELS')) {
		return console.log('Sunucu paneli düzeltmek için `Kanalları Yönet` yetkim yok?');
	}else {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
}
	}
})
	
.on('guildBanRemove', async (guild, member) => {
	if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_CHANNELS')) {
		return console.log('Sunucu paneli düzeltmek için `Kanalları Yönet` yetkim yok?');
	}else {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))	
}
	}
})
	
	.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
		if(member.user.bot) {return;}
                if(!member.user.bot) {
			const girisRol = member.guild.roles.get(client.provider.get(member.guild.id, 'girisRol')).name
			member.guild.channels.get(logCh).send('<:lockeds:504333829616697344> `' + member.user.tag + '` adlı kişiye `' + girisRol + '` adlı rol verildi.');
		}
		}
	})

	.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			if(member.user.bot) {
			const botgirisrolveri = member.guild.roles.get(client.provider.get(member.guild.id, 'botgirisRol')).name
			member.guild.channels.get(logCh).send('<:lockeds:504333829616697344> `' + member.user.tag + '` adlı bota `' + botgirisrolveri + '` adlı rol verildi.');
		}
		}
	})
	
.on('message', async msg => {
	    if (!msg.guild) return;
	    const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
	    const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
	    if (veri ==! true) return;
	    if (veri === true) {
	        const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
	        if (swearWords.some(word => msg.content.includes(word))) {
	        	try {
		            if (!msg.member.hasPermission("BAN_MEMBERS")) {
		                msg.delete();

		                return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
		            }
	        	} catch(err) {
	        		console.log(err);
	        	}
	        }
	    }
	})




  .on('message', msg => {
    if (!msg.guild) return;
    const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
    if (veri !== true) return;
    if (veri === true) {
		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
		if (swearWords.some(word => msg.content.includes(word))) {
			if (!msg.member.hasPermission("BAN_MEMBERS")) {
				return;
			}
		}
		var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
		if (regex.test(msg.content)==true) {
			if (!msg.member.hasPermission("BAN_MEMBERS")) {
				msg.delete();
				
				return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
			} else {
				return;
			};
		} else {
			return;
		};
    };
  })
	
	.on('message', async msg => { 
            if (!msg.guild) return;
        const veri = client.provider.get(msg.guild.id, 'saas', []);
        if (veri ==! true) return;
        if (veri === true) {
            const swearWords = ["sa" , "sea" , "selam", "selamün aleyküm" , "selamun aleyküm" , "selamın aleyküm","SA","Sa"];
            if (swearWords.some(word => msg.content === (word))) {
				msg.react("498054746779942923").then(() => msg.react("498054757836128268"))
                try {
                        return msg.channel.sendMessage(`Aleyküm selam hoş geldin <@!${msg.author.id}>.`);
                } catch(err) {
                    console.log(err);
                }
            }
        }
})

	.on('message', async msg => {
        if (!msg.guild) return;
        const veri = client.provider.get(msg.guild.id, 'mentionEngel', []);
        if (veri ==! true) return;
        if (veri === true) {
            const swearWords = ['@here' , '@everyone'];
            if (swearWords.some(word => msg.content === (word))) {
                if (!msg.member.hasPermission("BAN_MEMBERS")) {
				msg.delete();
                        return msg.channel.sendMessage(`Hey sen <@!${msg.author.id}> milleti rahatsız etmeye utanmıyormusun?`);
                } return;
            }
		}
    })
	
	.on('message', async msg => {
	    if (!msg.guild) return;
        const veri = client.provider.get(msg.guild.id, 'küfürEngelle', []);
        if (veri ==! true) return;
        if (veri === true) {
	        const swearWords = ["amk","aq","ananı","sikiyim","orospu","orospu çocu","orospu çocuğu","sik","siktir","sakso","sikik","sikici","Aq","Amk","Ananı","Sikiyim","Orosbu","Orospu çocu","Orspu Çocuğu","Sik","Siktir","Sakso","Siki","Sikici","Oç","Oc","Amlk","Qmk","mq"];
	        if (swearWords.some(word => msg.content.includes(word))) {
	        	try {
		            if (!msg.member.hasPermission("BAN_MEMBERS")) {
		                msg.delete();

		                return msg.reply('Hoop burası saygılı bir ortam küfür etmemelisin!').then(msg => msg.delete(3000));
		            }
	        	} catch(err) {
	        		console.log(err);
	        	}
	        }
	    }
	})

.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye katıldı.')
			.setAuthor(member.user.tag, member.user.displayAvatarURL)
			.setColor(3066993)
			.setDescription(`Sunucuya katıldı **${member.guild.memberCount}** üye olduk.`)
			.setThumbnail(member.user.displayAvatarURL)
			.setFooter(`${client.user.username}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('guildMemberRemove', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye ayrıldı.')
			.setAuthor(member.user.tag, member.user.displayAvatarURL)
			.setColor(15158332)
			.setDescription(`Sunucudan ayrıldı **${member.guild.memberCount}** üye kaldık.`)
			.setThumbnail(member.user.displayAvatarURL)
			.setFooter(`${client.user.username}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('guildBanAdd', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.displayAvatarURL)
			.setColor(15158332)
			.setDescription(`Sunucudan yasaklandı **${member.guild.memberCount}** üye kaldık.`)
			.setThumbnail(member.user.displayAvatarURL)
			.setFooter(`${client.user.username}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});

		}
	})
	
	.on('guildBanRemove', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.displayAvatarURL)
			.setColor(3447003)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.displayAvatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('messageDelete', async msg => {
		if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
			if (msg.author.bot) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL)
			.setColor(15158332)
			.setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen mesajı silindi.`)
			.addField('Silinen Mesajı' , '```' + msg.content + '```' )
			.setFooter(`Mesaj ID: ${msg.id}`)
			msg.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('channelCreate', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})
		
	.on('channelDelete', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})
	
	.on('roleCreate', async role => {
		if (!role.guild) return;
		const enabled = client.provider.get(role.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(role.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (role.guild.channels.get(logCh) === undefined || role.guild.channels.get(logCh) === null) return;
		if (role.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(role.guild.iconURL)
				.setTitle('Rol oluşturuldu')
		        .setDescription('**`'+ role.name + '` adlı rol oluşturuldu.**')
				role.guild.channels.get(logCh).send({embed});
		}
	})
	
		.on('roleDelete', async role => {
		if (!role.guild) return;
		const enabled = client.provider.get(role.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(role.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (role.guild.channels.get(logCh) === undefined || role.guild.channels.get(logCh) === null) return;
		if (role.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#f44336')
				.setThumbnail(role.guild.iconURL)
				.setTitle('Rol silindi')
		        .setDescription('**`'+ role.name + '` adlı rol silindi.**')
				role.guild.channels.get(logCh).send({embed});
		}
	})
	
		.on('roleUpdate', async (role , newrole) => {
		if (!role.guild) return;
		const enabled = client.provider.get(role.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(role.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (role.guild.channels.get(logCh) === undefined || role.guild.channels.get(logCh) === null) return;
		if (role.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(role.guild.iconURL)
				.setTitle('Rol düzenlendi')
		        .setDescription('**`' + role.name + '` adlı rolü düzenlendi.**')
				role.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('emojiCreate', async emoji => {
		if (!emoji.guild) return;
		const enabled = client.provider.get(emoji.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(emoji.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (emoji.guild.channels.get(logCh) === undefined || emoji.guild.channels.get(logCh) === null) return;
		if (emoji.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(emoji.guild.iconURL)
				.setTitle('Emoji eklendi')
		        .setDescription('**`' + emoji.name + '` adlı emoji eklendi.**')
				emoji.guild.channels.get(logCh).send({embed});
		}
	})
	
		.on('emojiDelete', async emoji => {
		if (!emoji.guild) return;
		const enabled = client.provider.get(emoji.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(emoji.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (emoji.guild.channels.get(logCh) === undefined || emoji.guild.channels.get(logCh) === null) return;
		if (emoji.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#f44336')
				.setThumbnail(emoji.guild.iconURL)
				.setTitle('Emoji silindi')
		        .setDescription('**`' + emoji.name + '` adlı emoji silindi.**')
				emoji.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('emojiUpdate', async emoji => {
		if (!emoji.guild) return;
		const enabled = client.provider.get(emoji.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(emoji.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (emoji.guild.channels.get(logCh) === undefined || emoji.guild.channels.get(logCh) === null) return;
		if (emoji.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(emoji.guild.iconURL)
				.setTitle('Emoji düzenlendi')
		        .setDescription('**`' + emoji.name + '` adlı emoji düzenledi.**')
				emoji.guild.channels.get(logCh).send({embed});
		}
	})
	
	
	
	.on('messageUpdate', async (oldMsg, newMsg) => {
		if (!oldMsg.guild) return;
		if (oldMsg.author.bot) return;
		const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
		if (oldMsg.guild.channels.get(logCh).type === "text") {
			const embed = new Discord.RichEmbed()
			.setColor(3066993)
			.setAuthor(`${oldMsg.author.username}  ${oldMsg.channel.name} Kanalına gönderdiği mesajını düzenledi.` , oldMsg.author.avatarURL)
			.addField('Eski Mesaj' , '```' +  oldMsg.content + '```')
            .addField('Yeni Mesaj' , '```' + newMsg.content  + '```')
			.setFooter(`ID: ${oldMsg.id}`);
			oldMsg.guild.channels.get(logCh).send({embed});
		};
	})

const invites = {};
const wait = require('util').promisify(setTimeout);
client.on('ready', () => {
  wait(1000);
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  const enabled = client.provider.get(member.guild.id, 'davetKanalK', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'davetKanal', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    member.guild.channels.get(logCh).send(`:inbox_tray: **${member.user.tag}** sunucuya katıldı. Davet eden: **${inviter.tag}** Daveti kullanan kişi sayısı: **${invite.uses}**`);
  });
    }
})
	
	
.on("guildCreate", guild => {
   const embed = new Discord.RichEmbed()
  .setDescription('DreamBot Yeni bir sunucuya eklendi !!')
  .addField('• Shard', `${client.shard.id+1}`)
  .addField('• Sunucu', `Sunucu adı: ${guild.name}\nSunucu id: ${guild.id}\nSunucu üye sayısı: ${guild.members.size}`)
  .addField('• Sunucu sahibi' , `${guild.owner.user.username}#${guild.owner.user.discriminator}\nID ${guild.owner.user.id}`)
  .setColor('RANDOM')
  client.channels.get('447400791750213653').sendMessage(embed)
  client.users.get('276829048943149057').send(embed)
})

.on("guildDelete", guild => {
   const embed = new Discord.RichEmbed()
  .setDescription('DreamBot Bir sunucudan çıkarıldı !!')
  .addField('• Shard', `${client.shard.id+1}`)
  .addField('• Sunucu', `Sunucu adı: ${guild.name}\nSunucu id: ${guild.id}\nSunucu üye sayısı: ${guild.members.size}`)
  .addField('• Sunucu sahibi' , `${guild.owner.user.username}#${guild.owner.user.discriminator}\nID: ${guild.owner.user.id}`)
  .setColor('RANDOM')
  client.channels.get('447400791750213653').sendMessage(embed)
  client.users.get('276829048943149057').send(embed)
})

.on('guildMemberAdd', member => {
  var kanal = member.guild.channels.get(member.guild.settings.get('sayaçkanal'));
  if (!kanal) return;
  var sayaç = member.guild.settings.get('sayac');
  if (!sayaç) return;

if (member.guild.members.size > sayaç) return kanal.send(`Sunucudaki kişi sayısı zaten belirlenen hedefe ulaşmış! Sayaçı değiştiriniz!`)
 kanal.send(`:inbox_tray: **${member.user.username}** Sunucuya Katıldı! \`${sayaç}\` kullanıcı olmaya \`${sayaç - member.guild.members.size}\` kullanıcı kaldı!`)
  if (member.guild.members.siz === sayaç) return kanal.send(`Sunucunuz Belirlenen Hedefe Ulaştı Sayaç Özelliği Otomatikmen devredışı bırakılıyor!`)
})

.on('guildMemberRemove', member => {
  var kanal = member.guild.channels.get(member.guild.settings.get('sayaçkanal'));
  if (!kanal) return;
  var sayaç = member.guild.settings.get('sayac');
  if (!sayaç) return;

if (member.guild.members.size > sayaç) return kanal.send(`Sunucudaki kişi sayısı zaten belirlenen hedefe ulaşmış! Sayaçı değiştiriniz!`)
 kanal.send(`:outbox_tray: ${member.user.username} Sunucudan Ayrıldı! \`${sayaç}\` kullanıcı olmaya \`${sayaç - member.guild.members.size}\` kullanıcı kaldı!`)
});



client.dispatcher.addInhibitor(msg => {
    const blacklist = client.provider.get('global', 'userBlacklist', []);
    if (!blacklist.includes(msg.author.id)) return false;
    msg.reply('Bottan yasaklanmışın botu kullanamassın.')
    return true;
})

.on('message', msg => {
	const reason = msg.content.split(" ").slice(1).join(" ");
	const veri = client.provider.get(msg.guild.id, "destekkanalK", []);
			if (veri ==! true) return;
			if (veri === true) {
			const kanalveri = client.provider.get(msg.guild.id, "destekkanal", []);  
		let destekkanaliiste = msg.guild.channels.get(client.provider.get(msg.guild.id, "destekkanal")).name  
	  if (msg.channel.name== `${destekkanaliiste}`) { 
		const hatay1 = new Discord.RichEmbed()
		.addField("☡ Hata ☡", `Bu Sunucuda \`Destek Ekibi\` Adında Bir Rol Yok!`)
		.setColor("RANDOM")
		
		if (!msg.guild.roles.exists("name", "Destek Ekibi")) return msg.author.send(hatay1) + msg.guild.owner.send(hatay1);
		if(!msg.guild.channels.find('name', 'Destek Talepleri')) {
		  msg.guild.createChannel(`Destek Talepleri`, 'category').then(category => {
		  category.setPosition(1)
			let every = msg.guild.roles.find("name", "@everyone");
		  category.overwritePermissions(every, {
			VIEW_CHANNEL: false,
			SEND_MESSAGES: false,
			READ_MESSAGE_HISTORY: false
		  })
		  msg.guild.createChannel(`destek-${msg.author.username}`, "text").then(c => {
		  c.setParent(category.id)
		  let role = msg.guild.roles.find("name", "Destek Ekibi");
		  let role2 = msg.guild.roles.find("name", "@everyone");
		  let role3 = msg.guild.roles.find("name", `${client.user.username}`);
		  c.overwritePermissions(role, {
			  SEND_MESSAGES: true,
			  READ_MESSAGES: true
		  });
		  c.overwritePermissions(role2, {
			  SEND_MESSAGES: false,
			  READ_MESSAGES: false
		  });
		  c.overwritePermissions(msg.author, {
			  SEND_MESSAGES: true,
			  READ_MESSAGES: true
		  });
			  c.overwritePermissions(role3, {
			  SEND_MESSAGES: true,
			  READ_MESSAGES: true
		  });
	
		  const embed = new Discord.RichEmbed()
		  .setColor("RANDOM")
		  .setAuthor(`${client.user.username} | Destek Sistemi`)
		  .addField(`Merhaba ${msg.author.username}!`, `Destek Ekibi burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${conf.prefix}kapat\` yazabilirsin.`)
		  .addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
		  .addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
		  .setFooter(`${client.user.username} | Destek Sistemi`)
		  .setTimestamp();
		  c.send(embed);
		  c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, <@&396029009345118213>`)
		  msg.delete()
		  }).catch(console.error);
		})
	  }
	}
		}
	})
	
	.on("message", message => {
	if (message.content.toLowerCase().startsWith(conf.prefix + `kapat`)) {
		if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılablir!`);
	
		var deneme = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`Destek Talebi Kapatma İşlemi`)
		.setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
		.setFooter(`${client.user.username} | Destek Sistemi`)
		message.channel.send(deneme)
		.then((m) => {
		  message.channel.awaitMessages(response => response.content === 'evet', {
			max: 1,
			time: 10000,
			errors: ['time'],
		  })
		  .then((collected) => {
			  message.guild.channels.find('name', 'Destek Talepleri').delete()
			  message.channel.delete();
			})
			.catch(() => {
			  m.edit('Destek Talebi kapatma isteğin zaman aşımına uğradı!').then(m2 => {
				  m2.delete();
			  }, 3000);
			});
		});
	}
	});

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCIn2tUo5vtqwmrwB7orGonnNsS5a3oNSc');
const queue = new Map();
var servers = {};
client.on("message", async message => {
    var args = message.content.substring(message.guild.commandPrefix.length).split(" ");
    if (!message.content.startsWith(message.guild.commandPrefix)) return;
  var searchString = args.slice(1).join(' ');
	var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "oynat":
    var voiceChannel = message.member.voiceChannel;
    const voiceChannelAdd = new Discord.RichEmbed()
    .setColor("#e53935")
    .setTitle(`Hata`)
    .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`)
		if (!voiceChannel) return message.channel.send(voiceChannelAdd);
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
      const warningErr = new Discord.RichEmbed()
      .setColor("#e53935")
      .setTitle(`Hata`)
      .setDescription(`Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`)
			return message.channel.send(warningErr);
		}
		if (!permissions.has('SPEAK')) {
      const musicErr = new Discord.RichEmbed()
      .setColor("#36393E")
      .setTitle(`Hata`)
      .setDescription(`Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`)
			return message.channel.send(musicErr);
		}
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      const PlayingListAdd = new Discord.RichEmbed()
      .setColor("#009688")
      .setTitle(`Oynatma Listesi:`)
      .setDescription(`**${playlist.title}** İsimli şarkı oynatma listesine Eklendi.`)
			return message.channel.send(PlayingListAdd);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
          var index = 0;
          const embed = new Discord.RichEmbed()
          .setColor("#009688")
          .setTitle(`Şarkı Seçimi`)
          .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')} \n**Lütfen hangi şarkıyı seçmek istiyorsan \`1\` ile \`10\` arası bir sayı yaz.**`)
          .setFooter(`Şarkı seçimi \`10\` saniye içinde iptal edilecektir.`)
					message.channel.send({embed});
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
            console.error(err);
            const NoNumber = new Discord.RichEmbed()
            .setColor("#f44336")
            .setTitle(`Hata`)
            .setDescription(`Şarkı seçimi iptal edildi.`) 
						return message.channel.send(NoNumber);
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
          console.error(err);
          const songNope = new Discord.RichEmbed()
          .setColor("#f44336")
          .setTitle(`Hata`)
          .setDescription(`Aradığınız isimde bir şarkı bulamadım.`) 
					return message.channel.send(songNope);
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
        break;
      case "geç":
      const err0 = new Discord.RichEmbed()
      .setColor("#f44336")
      .setTitle(`Hata`)
      .setDescription(`Bir sesli kanalda değilsin.`) 
    if (!message.member.voiceChannel) return message.channel.send(err0);
    const err05 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
		if (!serverQueue) return message.channel.send(err05);
    const songSkip = new Discord.RichEmbed()
    .setColor("#009688")
    .setTitle(`Şarkı Geçildi`)
    .setDescription(`Şarkı başarıyla geçildi.`)
    serverQueue.connection.dispatcher.end(songSkip);
		return undefined;
break;
      case "dur":
    const err1 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(err1);
    const err2 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
		if (!serverQueue) return message.channel.send(err2);
		serverQueue.songs = [];
    const songEnd = new Discord.RichEmbed()
    .setColor("#4CAF50")
    .setTitle(`Şarkı Kapatıldı`)
    .setDescription(`Şarkı başarıyla kapatıldı.`)
    serverQueue.connection.dispatcher.end(songEnd); 
		return undefined;
break;
      case "ses":
      const asd1 = new Discord.RichEmbed()
      .setColor("#f44336")
      .setTitle(`Hata`)
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(asd1);
    const asd2 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(asd2);
    const volumeLevel = new Discord.RichEmbed()
    .setColor("#FF5722")
    .setTitle(`Ses Seviyesi`)
    .setDescription(`Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    if (!args[1]) return message.channel.send(volumeLevel);
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    const volumeLevelEdit = new Discord.RichEmbed()
    .setColor("#FF5722")
    .setTitle(`Ses Seviyesi`)
    .setDescription(`Yeni Ses Seviyesi: **${args[1]}**`)
    return message.channel.send(volumeLevelEdit);
break;
      case "şarkı-listesi":
    if (!serverQueue) return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
    const songList10 = new Discord.RichEmbed()
    .setColor("#009688")
    .setTitle(`Şarkı Listesi`)
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} \n\n**Şuanda Çalınan Şarkı:** ${serverQueue.songs[0].title}`)
    return message.channel.send(songList10);
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
		thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
	    hours: video.duration.hours,
        minutes: video.duration.minutes,
        seconds: video.duration.seconds,	
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Ses kanalına giremedim HATA: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
    if (playlist) return undefined;

    const songListBed = new Discord.RichEmbed()
    .setColor("#00BCD4")
    .setTitle(`Şarkı Listesine Eklendi`)
    .addField('Eklenen Şarkı', `[**${song.title}**](${song.url})`)
    .addField('Süresi', `${song.minutes}:${song.seconds}`)
	.addField('Ekleyen' , `**${message.author.username}**`)
	.setThumbnail(song.thumbnail)
		return message.channel.send(songListBed);
	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
  }
  console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı.');
      else message.channel.send(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  const playingBed = new Discord.RichEmbed()
  .setColor("#03A9F4")
  .setTitle(`<a:loading:396385483271438347> Şarkı Çalınıyor...`)
  .addField('Çalınan Şarkı', `[**${song.title}**](${song.url})`)
  .addField('Ses Seviyesi', `${serverQueue.volume}%`)
  .addField('Süresi', `${song.minutes}:${song.seconds}`)
  .addField('Şarkıyı İsteyen', `**${message.author.username}**`)
  .setThumbnail(song.thumbnail)
	serverQueue.textChannel.send(playingBed);
}
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (message.channel.type !== 'text') return;
	if (message.content.startsWith(message.guild.commandPrefix)) return;
  
	let kullanıcı = message.mentions.users.first() || message.author
	let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
	let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
	let sebep = afkkullanıcı
   
	if (message.author.bot) return;
	if (message.content.includes(`${message.guild.commandPrefix}afk`)) return;
	
	if (message.content.includes(`<@${kullanıcı.id}>`)) {
	  if (afkdkullanıcı) {
		message.channel.send(`<:check:509661885843505153> **${message.author.tag}** adlı kullanıcı artık AFK degil...`)
		db.delete(`afk_${message.author.id}`)
			 const member = message.guild.member(kullanıcı.id)
		member.setNickname(kullanıcı.username) 
	  }
	  if (afkkullanıcı) return message.channel.send(`<:xx:509661885973397504> **${kullanıcı.tag}** şu anda AFK.\n Sebep : **${sebep}**`)
	}
  
	if (!message.content.includes(`<@${kullanıcı.id}>`)) {
	  if (afkdkullanıcı) {
		message.channel.send(`<:check:509661885843505153> **${message.author.tag}** adlı kullanıcı artık AFK değil.`)
		db.delete(`afk_${message.author.id}`)
		const member = message.guild.member(kullanıcı.id)
		member.setNickname(kullanıcı.username) 
	  }
	}
	}
  )
  
  
  
  client.on("message", async msg => {
	const db = require('quick.db');
	if (msg.channel.type === "dm") return;
	if(msg.author.bot) return;  
	
	if (msg.content.length > 7) {
	  
	  db.add(`puancik_${msg.author.id + msg.guild.id}`, 5)
  } 
  
  if(msg.content.length > 50) {
  db.add(`puancik_${msg.author.id + msg.guild.id}`, 30)
  }
   
  let gerekenxp = db.fetch(`gerekenxp_${msg.author.id + msg.guild.id}`)
  
	if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > `${gerekenxp || 155}`) {
	   
	  db.add(`gerekenxp_${msg.author.id + msg.guild.id}`, 155+55)
	  db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
	  
	  msg.channel.send(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)
	  
	  db.delete(`puancik_${msg.author.id + msg.guild.id}`)
	  
	};
   
	if (db.has(`roll_${msg.guild.id}`) === true) {
	if (db.has(`rollss_${msg.guild.id}`) === true) {
	  
   var r = db.fetch(`roll_${msg.guild.id}`)
   var s = db.fetch(`rollss_${msg.guild.id}`)
	
	if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
	  if (msg.member.roles.has(r.id) === false) {
	  msg.channel.send(`<@${msg.author.id}> Başarıyla **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}.** seviyeye geçtin ve  **${r.name}** rolünü aldın!`)
	  msg.member.addRole(r.id)
	  }
	};
  }};
	


client.on('error', err => {
	console.log(err)
});


async function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcçdefghiIjklmnopqrsştuüvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCÇDEFGHIİJKLMNOPQRSŞTUÜVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

client.login(process.env.benimyahus);
   

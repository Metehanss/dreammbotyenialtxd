const { stripIndents, oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js')
const { Command } = require('discord.js-commando');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			group: 'util',
			memberName: 'yardım',
			aliases: ['helps','komutlar','y','helpss','yardim'],
			description: 'Kullanilabilir komutların listesini veya belirtilen bir komut için ayrıntılı bilgileri görüntüler.',
			details: oneLine`
			Komut, bir komut adının veya bir tam komut adının bir parçası olabilir.
			Belirtilmezse, tüm kullanilabilir komutlar listelenir.
			`,
			examples: ['helps'],
			guarded: true,

			args: [
				{
          key: 'command',
					prompt: 'Yardımı hangi komuttan görmek istersiniz?',
          type: 'string',
					default: ''
                }
			]
		});
	}

    async run(msg, args) { // eslint-disable-line complexity
        const groups = this.client.registry.findGroups(args.command)
        const showAll = args.command && args.command.toLowerCase() === 'hepsi';
        const commands = this.client.registry.findCommands(args.command, false, msg);
   if(commands && !showAll) {
			if(commands.length === 1) {
                const komutyardım = new RichEmbed()
                .setColor('#009688')
                .setAuthor(`${commands[0].name} Komutu  — Yardım`, this.client.user.avatarURL)
                .addField('Açıklama', commands[0].description)
                .addField('Kullanım Şekli', `${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}`)
                .addField('Kısaltmaları', commands[0].aliases.join(', '))
                .addField('Grubu', commands[0].group.name)
                .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
                msg.channel.send(komutyardım)
			} 
   } else {
				return msg.channel.send(`<:xx:509661885973397504> Bu yazdığınız isime sahip bir komut grubu ya da bir komut bulunamadı. Lütfen karakterleri tam olarak doğru yazdığınıza emin olun. Komut gruplarını görmek için ${msg.guild.commandPrefix}yardım yazabilirsiniz.`);
			} 

        if (args.command === 'ayarlar') {
            const messages = [];
            const ayarkomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Ayar Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}ayarlar** Botun ayarlarını gösterir.\n**${msg.guild.commandPrefix}hoş-geldin-ayarla** Hoş geldin kanalı ayarlar.\n**${msg.guild.commandPrefix}hoş-geldin-kapat** Hoş geldin kanalını kapatır.\n**${msg.guild.commandPrefix}otorol** Otorol ayarlar.\n**${msg.guild.commandPrefix}otorolkapat** Otorolü kapatır.\n**${msg.guild.commandPrefix}mod-log-ayarla** Mod-Log kanalını ayarlarsınız.\n**${msg.guild.commandPrefix}mod-log-kapat** Mod-Log kanalını kapatır.\n**${msg.guild.commandPrefix}duyuru-kanal-ayarla** Duyuru kanalı ayarlar.\n**${msg.guild.commandPrefix}duyuru-kanal-kapat** Duyuru kanalını kapatır.\n**${msg.guild.commandPrefix}link-engelle** Linkleri engeller\n**${msg.guild.commandPrefix}reklam-engelle** Reklamları engeller.\n**${msg.guild.commandPrefix}sa-as** SA-AS Mesajlarını açar kapatır.\n**${msg.guild.commandPrefix}sayaç-kanal-ayarla** Sayaç kanalı ayarlar.\n**${msg.guild.commandPrefix}sayaç-kapat** Sayaç kanalı kapatır.\n**${msg.guild.commandPrefix}mention-engel** here ve everyone mesajlarını engeller.\n**${msg.guild.commandPrefix}log-ayarla** Log kanalını ayarlar.\n**${msg.guild.commandPrefix}log-kapat** Log kanalını kapatır.\n**${msg.guild.commandPrefix}prefix** Prefixi değiştire bilirsiniz.\n**${msg.guild.commandPrefix}davet-takip-ayarla** Davet takip kanalı ayarlar.\n**${msg.guild.commandPrefix}davet-takip-kapat** Davet takip kanalını kapatır.\n**${msg.guild.commandPrefix}başvuru-kanal-ayarla** Başvuru kanalını ayarlar.\n**${msg.guild.commandPrefix}başvuru-kanal-kapat** Başvuru kanalını kapatır.\n**${msg.guild.commandPrefix}giriş-mesaj-ayarla** Sunucuya girenler için giriş mesajı ayarlarsınız.\n**${msg.guild.commandPrefix}giriş-mesajı-kapat** Ayarlanan giriş mesajını kapatır.\n**${msg.guild.commandPrefix}çıkış-mesaj-ayarla** Sunucudan çıkanlar için çıkış mesajı ayarlarsınız.\n**${msg.guild.commandPrefix}çıkış-mesajı-kapat** Ayarlanan çıkış mesajını kapatır.` + '\n\n Herhangi bir komut hakkında detaylı yardım almak için `' + msg.guild.commandPrefix + 'yardım` komutismi yazabilirsiniz.')
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(ayarkomutları)
        }

        if (args.command === 'genel') {
            const messages = [];
            const genelkomutlar = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Genel Komutlar`)
            .setDescription(`**${msg.guild.commandPrefix}davet** Botun linklerini atar.\n**${msg.guild.commandPrefix}söz** Rastgele söz verir.\n**${msg.guild.commandPrefix}linkoluştur** Link oluşturmanızı sağlar.\n**${msg.guild.commandPrefix}oylama** Oylama yapmanızı sağlar.\n**${msg.guild.commandPrefix}pm** İstediğiniz kişiye özle mesaj gönderir.\n**${msg.guild.commandPrefix}resimgönder** Embed içinde resim gönderir.\n**${msg.guild.commandPrefix}saat** Saati atar.\n**${msg.guild.commandPrefix}öneri** Bot yapımcısına öneride bulunursunuz.\n**${msg.guild.commandPrefix}davet-liderlik** Sunucudaki davet liderliği sıralamasını gösterir.\n**${msg.guild.commandPrefix}alıntıla** Mesaj idi ile alıntı yapar.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(genelkomutlar)
    }
    
         if (args.command === 'sunucu') {
            const sunucukomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Sunucu Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}sbilgi** Sunucu bilgisini gösterir.\n**${msg.guild.commandPrefix}kbilgi** Bilginizi gösterir.\n**${msg.guild.commandPrefix}kullanıcı-bilgi** Etiketlediniz kişinin bilgisini gösterir.\n**${msg.guild.commandPrefix}duyuru** Duyuru yapmanızı sağlar.\n**${msg.guild.commandPrefix}sunucu-icon** Sunucu resmini atar.\n**${msg.guild.commandPrefix}roller** Sunucudaki rolleri atar.\n**${msg.guild.commandPrefix}yetkililer** Sunucudaki yetkilileri gösterir.\n**${msg.guild.commandPrefix}yetkilerim** Yetkilerinizi gösterir.\n**${msg.guild.commandPrefix}bağışyap** Bot sahibine bağış yaparsınız.\n**${msg.guild.commandPrefix}başvuru** Sunucuda başvuru yaparsınız.\n**${msg.guild.commandPrefix}snipe** Son silinen mesajı atar.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(sunucukomutları)
        }
    
        if (args.command === 'moderatör') {
            const modkomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Moderatör Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}ban** İstediğiniz kişiyi sunucudan yasaklar.\n**${msg.guild.commandPrefix}at** İstediğiniz kişiyi sunucudan atar.\n**${msg.guild.commandPrefix}uyar** İstediğiniz kişiyi uyarır.\n**${msg.guild.commandPrefix}sustur** İstediğiniz kişiyi susturur.\n**${msg.guild.commandPrefix}susturma-kaldır** Susturulan kişinin susturulmasını açar.\n**${msg.guild.commandPrefix}davetlinkioluştur** Davet linki oluşturur.\n**${msg.guild.commandPrefix}kilit** Kanalı istediğiniz süre boyunca kilitler.\n**${msg.guild.commandPrefix}kilit aç** Kanalın kilidini açar.\n**${msg.guild.commandPrefix}kanaloluştur** Kanal oluşturur.\n**${msg.guild.commandPrefix}kanalsil** İstediğiniz kanalı siler.\n**${msg.guild.commandPrefix}kategorioluştur** Kategori oluşturur.\n**${msg.guild.commandPrefix}rololuştur** Rol oluşturur.\n**${msg.guild.commandPrefix}rolsil** Rol siler.\n**${msg.guild.commandPrefix}kanalbaşlığı** Kanal başlığını değiştirir.\n**${msg.guild.commandPrefix}temizle** Belirtiğiniz sayı kadar mesaj siler max 100.\n**${msg.guild.commandPrefix}kanaladı** Kanal adını değiştirir.\n**${msg.guild.commandPrefix}reklam-taraması** Oynuyor kısmında reklam taraması yapar.\n**${msg.guild.commandPrefix}slowmode** Kanala mesaj yazma süresini ayarlar.\n**${msg.guild.commandPrefix}toplu-rol-ver** Toplu rol verir.\n**${msg.guild.commandPrefix}toplu-rol-al** Toplu rol alır.\n**${msg.guild.commandPrefix}rolver** İstediğiniz kişiye rol verir.\n**${msg.guild.commandPrefix}rolal** İstediğiniz kişiden rol alır.\n**${msg.guild.commandPrefix}unban** Banlı olan kişinin banını açar.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(modkomutları)
        }
    
          if (args.command === 'eğlence') {
            const eğlencekomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Eğlence Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}sor** Bota soru sorarsınız.\n**${msg.guild.commandPrefix}slots** Slot oynarsınız.\n**${msg.guild.commandPrefix}vur** İstediğiniz kişiye vurur.\n**${msg.guild.commandPrefix}top10** Botun top10 sunucusunu atar.\n**${msg.guild.commandPrefix}çekiliş** Çekiliş yaparsınız.\n**${msg.guild.commandPrefix}avatar** İstediğiniz kişinin avatarını atar.\n**${msg.guild.commandPrefix}ascii** Ascii şekilde yazarsınız.\n**${msg.guild.commandPrefix}emoji** Emoji ile yazarsınız.\n**${msg.guild.commandPrefix}discrim** Discrim arar.\n**${msg.guild.commandPrefix}hava-durumu** Girdiğiniz şehrin hava durumunu atar.\n**${msg.guild.commandPrefix}türkkahvesi** Türk kahvesi içersiniz.\n**${msg.guild.commandPrefix}söv** İstediğiniz kişiye söver.\n**${msg.guild.commandPrefix}harfli-avatar** Harfli avatar oluşturur.\n**${msg.guild.commandPrefix}yazı-tura** Yazı tura oynarsınız.\n**${msg.guild.commandPrefix}trump** Trump tweet attırır.\n**${msg.guild.commandPrefix}aşk-ölçer** İstediğiniz kişi ile aşk ölçer.\n**${msg.guild.commandPrefix}tweet** Tweet atarsınız.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(eğlencekomutları)
        }
    
        if (args.command === 'efektkomutlar') {
            const efektkomutlar = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Efekt Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}wasted** Wasted efekti verir.\n**${msg.guild.commandPrefix}rip** Rip efekti verir.\n**${msg.guild.commandPrefix}adam** Adam efekti verir.\n**${msg.guild.commandPrefix}triggered** Avatarınıza triggered efekti verir.\n**${msg.guild.commandPrefix}bulanıklaştır** Avatarı bulanıklaştırır.\n**${msg.guild.commandPrefix}siyahbeyaz** Siyah beyaz efekti verir.\n**${msg.guild.commandPrefix}sepia** Sepia efekti verir.\n**${msg.guild.commandPrefix}sniper** Sniper efekti verir.\n**${msg.guild.commandPrefix}atatürk** Avatarınıza atatürk çerçevesi ekler.\n**${msg.guild.commandPrefix}brillance** Brillance çerçevesi ekler.\n**${msg.guild.commandPrefix}bravery** Bravery çerçevesi ekler.\n**${msg.guild.commandPrefix}balance** Balance çerçevesi ekler.\n**${msg.guild.commandPrefix}discord** Discord çerçevesi ekler.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(efektkomutlar)
        }

        if (args.command === 'bilgi') {
            const bilgikomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Bilgi Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}istatistik** Botun istatistiğini atar.\n**${msg.guild.commandPrefix}yapımcı** Yapımcı bilgisini gösterir.\n**${msg.guild.commandPrefix}döviz** Anlık döviz kurunu atar.\n**${msg.guild.commandPrefix}shard** Shard bilgilerini atar.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(bilgikomutları)
        }

        if (args.command === 'minecraft') {
            const minecraftkomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Minecraft Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}mcavatar** Minecraft avatarınızı atar.\n**${msg.guild.commandPrefix}mcbaşarım** Minecraft başarım.\n**${msg.guild.commandPrefix}mcskin** Minecraft skininizi atar.\n**${msg.guild.commandPrefix}mcistatistik** Minecraft sunucu istatistiği.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(minecraftkomutları)
        }
  
            if (args.command === 'müzik') {
            const müzikkomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Müzik Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}oynat** İstediğiniz müziği oynatır.\n**${msg.guild.commandPrefix}dur** Çalan müziği durdurur.\n**${msg.guild.commandPrefix}geç** Çalan şarkıyı geçer.\n**${msg.guild.commandPrefix}ses** Ses seviyesini ayarlarsınız.\n**${msg.guild.commandPrefix}oynatma-listesi** Şarkı listesini gösterir.\n**${msg.guild.commandPrefix}duraklat** Çalan şarkıyı duraklatır.\n**${msg.guild.commandPrefix}devamet** Duraklatılan şarkıyı devam ettirir.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(müzikkomutları)
        }
    
          if (args.command === 'destek') {
            const destekkomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Destek Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}canlı-destek** Canlı destek ile konuşursunuz.\n**${msg.guild.commandPrefix}çağır** Bot sahibini çağrır.\n**${msg.guild.commandPrefix}destek-kanal-ayarla** Destek kanalı ayarlar.\n**${msg.guild.commandPrefix}destek-kanalı-kapat** Destek kanalını kapatır.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(destekkomutları)
        }
		
		         if (args.command === 'premium') {
            const destekkomutları = new RichEmbed()
            .setColor('#009688')
            .setAuthor(`Premium Komutları`)
            .setDescription(`**${msg.guild.commandPrefix}botlara-toplu-rol-ver** Botlara toplu rol verir.\n**${msg.guild.commandPrefix}botlardan-toplu-rol-al** Botlardan toplu rol alır.\n**${msg.guild.commandPrefix}bot-otorol-ayarla** Sadece botlara otorol verir.\n**${msg.guild.commandPrefix}bot-rolü-kapat** Bot giriş rolünü kapatır.\n**${msg.guild.commandPrefix}sunucupanel** Sunucu paneli oluşturur.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
            .setFooter(`${msg.author.username} tarafından istendi`, msg.author.avatarURL)
            msg.channel.send(destekkomutları)
        }
		
		if (args.command === 'özelkomutlar') {
		   const destekkomutları = new RichEmbed()
			.setColor('#009688')
			.setAuthor('Özel Komutlar')
		    .setDescription(`**${msg.guild.commandPrefix}özel-komut ekle** Özel komut eklersiniz.\n**${msg.guild.commandPrefix}özel-komut sil** Özel komut silersiniz.\n**${msg.guild.commandPrefix}özel-komut bilgi** Özel komut bilgisine barkasınız.\n\n Herhangi bir komut hakkında detaylı yardım almak için ${msg.guild.commandPrefix}yardım komutismi yazabilirsiniz.`)
		     .setFooter(`${msg.author.username} tarafından istendi`,msg.author.avatarURL)
			 msg.channel.send(destekkomutları)
        } 
   
      
  if (args.command === '') {
  const messages = [];
  const dmembe1 = new RichEmbed()
  .setColor('#009688')
  .setAuthor(`${this.client.user.username} — Komut Grupları`, this.client.user.avatarURL)
  .setDescription(`**${msg.guild.commandPrefix}yardım ayarlar** → Ayar komutları\n**${msg.guild.commandPrefix}yardım genel** → Genel komutlar\n**${msg.guild.commandPrefix}yardım sunucu** → Sunucu komutları\n**${msg.guild.commandPrefix}yardım moderatör** → Moderatör komutları\n**${msg.guild.commandPrefix}yardım eğlence** → Eğlence komutları\n**${msg.guild.commandPrefix}yardım efektkomutlar** → Efekt komutları\n**${msg.guild.commandPrefix}yardım bilgi** → Bilgi komutları\n**${msg.guild.commandPrefix}yardım minecraft** → Minecraft komutları\n**${msg.guild.commandPrefix}yardım müzik** → Müzik komutları\n**${msg.guild.commandPrefix}yardım destek** → Destek komutları\n**${msg.guild.commandPrefix}yardım premium** → Premium komutları\n**${msg.guild.commandPrefix}yardım özelkomutlar** → Özel Komutlar`)
  .addField(':link: Bağlantılar', '[Sunucuna Ekle](https://discordapp.com/oauth2/authorize?client_id=402153479164002305&permissions=2146827775&redirect_uri=https%3A%2F%2Fdiscordapp.com%2Finvite%2FzBtAktj&response_type=code&scope=guilds.join%20bot)\n[DBL Oyu ver](https://discordbots.org/bot/402153479164002305/vote)\n[Destek Sunucusu](https://discordapp.com/invite/zBtAktj)\n[Web Site](http://dreambot.rf.gd)')
  .setFooter(`${msg.author.username} tarafından istendi.`, msg.author.avatarURL)
  msg.channel.send(dmembe1)
    }
        
}
};
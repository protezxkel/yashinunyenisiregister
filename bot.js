const Discord = require("discord.js"); //
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json"); //
const chalk = require("chalk"); //
const moment = require("moment"); //
var Jimp = require("jimp"); //
const { Client, Util } = require("discord.js"); //
const fs = require("fs"); //
const db = require("quick.db"); //
const express = require("express"); //
require("./util/eventLoader.js")(client); //
const path = require("path"); //
const snekfetch = require("snekfetch"); //
const ms = require("ms"); //
//

var prefix = ayarlar.prefix; //
//
const log = message => {
  //
  console.log(`${message}`); //
};

client.commands = new Discord.Collection(); //
client.aliases = new Discord.Collection(); //
fs.readdir("./komutlar/", (err, files) => {
  //
  if (err) console.error(err); //
  log(`${files.length} komut yüklenecek.`); //
  files.forEach(f => {
    //
    let props = require(`./komutlar/${f}`); //
    log(`Yüklenen komut: ${props.help.name}.`); //
    client.commands.set(props.help.name, props); //
    props.conf.aliases.forEach(alias => {
      //
      client.aliases.set(alias, props.help.name); //
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "787645506343927869"
  );

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gecen = moment
    .duration(kurulus)
    .format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]`);

  var kontrol;
  if (kurulus < 1296000000) kontrol = "";
  if (kurulus > 1296000000) kontrol = "";
  moment.locale("tr");
  kanal.send(
    " <a:sinirsiz:790593963090116609> **Sunucumuza Hoş Geldin** <@" +
      member +
      "> \n\n <a:sinirsiz:790593963090116609> **Hesabın** " +
      gecen +
      " **Önce Oluşturulmuş** " +
      kontrol +
      " \n\n <a:sinirsiz:790593963090116609> **Sunucu kurallarımız** <#787645513486303232> **kanalında yazıyor. Sunucuya geen herkez kurallari okumuş sayılır.** \n\n <a:sinirsiz:790593963090116609> **Seninle beraber **" +
      member.guild.memberCount +
      " **kişi olduk**\n\n<a:sinirsiz:790593963090116609> **Tagımızı alarak ` र ` bizlere destek olabilirsin.**\n\n<a:sinirsiz:790593963090116609> **Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor.**\n\n<a:sinirsiz:790593963090116609> **Kayit ekibimiz** <@&787645426873663538>  **seninle ilgilenecektir.**"
  );
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

//------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(7, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    const kytsz = member.guild.roles.cache.find(
      r => r.id === "787645445576458260"
    );
    var rol = member.guild.roles.cache.get("787645453251903488"); // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
    var kayıtsız = member.guild.roles.cache.get(kytsz); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
    member.roles.add(rol);
    member.roles.remove(kytsz);

    member.user.send(
      "Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır."
    );
    setTimeout(() => {}, 1000);
  } else {
  }
});
//------------------------------------------------------------------------------------------------------------------------------------\\

//-----------------------TAG-ROL----------------------\\

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("787339522705719307"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "र"; // Buraya Ekip Tag
  var tagrol = "787645436855844875"; // Buraya Ekip Rolünün ID
  var logKanali = "789918939009777684"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.cache.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(
        `**Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.**`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `${yeni} **Adlı üye tagımızı alarak aramıza katıldı!**`
            )
        );
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.cache.filter(
          rol => rol.position >= sunucu.roles.cache.get(tagrol).position
        )
      );
      await uye.send(
        `**Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı\n\n **Tagımızı tekrar alıp aramıza katılmak istersen;**\n**Tagımız:** ${tag}`
      );
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              `${yeni} **Adlı kullanıcı tagımızı bırakarak aramızdan ayrıldı**`
            )
        );
    } catch (err) {
      console.error(err);
    }
  }
});

//----------------------TAG-KONTROL----------------------\\

client.on("guildMemberAdd", member => {
  let sunucuid = "787339522705719307"; //Buraya sunucunuzun IDsini yazın
  let tag = "र"; //Buraya tagınızı yazın
  let rol = "789918939009777684"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  if (member.user.username.includes(tag)) {
    member.roles.add(rol);
    const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> **Adlı kullanıcı zaten tagımızdaymış**`)
      .setTimestamp();
    client.channels.cache.get("789918939009777684").send(tagalma);
  }
});

//-----------------------TAG-KONTROL----------------------\\

//BOTU SESE SOKMA
client.on("ready", async function() {
  const voiceChannel = "789535294872354846";
  client.channels.cache
    .get(voiceChannel)
    .join()
    .catch(err => {
      throw err;
    });
});


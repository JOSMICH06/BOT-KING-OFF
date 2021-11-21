const { WAConnection, 
       MessageType, 
       Mimetype, 
      } = require('@adiwajshing/baileys');
const fs = require('fs');
const prefix = '.'
const conn = require("./lib/index")
conn.connect()
const client = conn.client
//
 client.on('group-participants-update', async (anu) => {
      const _welcom = JSON.parse(fs.readFileSync('./src/welkom.json'))
          if (!_welcom.includes(anu.jid)) return
          try {
              const mdata = await  client.groupMetadata(anu.jid)
              console.log(anu)
              if (anu.action == 'add') {
                  num = anu.participants[0]
                  try {
                      ppimg = await  client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
                  } catch {
                      ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                  }
                  teks = `Hola @${num.split('@')[0]}\nBienvenido/a al Grupo ${mdata.subject}`
                  
                  let buff = await getBuffer(ppimg)
                   client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
}                   
                else if (anu.action == 'promote') {
                  num = anu.participants[0]
                  try {
                      ppimg = await  client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
                  } catch {
                      ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                  }
                  teks = `≡ NUEVO ADMIN
  ┌──────────────
  ├ Nombre : @${num.split('@')[0]}
  ├ Número : ${num.replace('@s.whatsapp.net', '')}
  ├ Mensaje : Admin nuevo.
  └──────────────`
                  let buff = await getBuffer(ppimg)
                   client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
                  } else if (anu.action == 'demote') {
                  num = anu.participants[0]
                  try {
                      ppimg = await  client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
                  } catch {
                      ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                  }
                  teks = `≡ ADMIN DEGRADADO
  ┌──────────────
  ├
  ├ Nombre : @${num.split('@')[0]}
  ├ Número : ${num.replace('@s.whatsapp.net', '')}
  ├ Mensaje : Un admin menos.
  └──────────────`
                  let buff = await getBuffer(ppimg)
                   client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
              } else if (anu.action == 'remove') {
                  num = anu.participants[0]
                  try {
                      ppimg = await  client.getProfilePicture(`${num.split('@')[0]}@c.us`)
                  } catch {
                      ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                  }
                  teks = `Adios @${num.split('@')[0]} no se te extrañara :D`
                  let buff = await getBuffer(ppimg)
                   client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
              }
          } catch (e) {
              console.log('Error : %s', color(e, 'red'))
          }
      })
client.on('chat-update', async (mek) => {
try {	  
if (!mek.hasNewMessage) return
if (!mek.messages) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return

mek = mek.messages.all()[0]
if (!mek.message) return
global.blocked
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]        
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const typeQuoted = Object.keys(quoted)[0]
const content = JSON.stringify(mek.message)
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const body = mek.message.conversation || mek.message[type].caption || mek.message[type].text || ""
chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
budy = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''

if (prefix != "") {
if (!body.startsWith(prefix)) {
cmd = false
comm = ""
} else {
cmd = true
comm = body.slice(1).trim().split(" ").shift().toLowerCase()
}
} else {
cmd = false
comm = body.trim().split(" ").shift().toLowerCase()
}
        
const command = comm

const arg = chats.slice(command.length + 2, chats.length)
const args = budy.trim().split(/ +/).slice(1)
const isCmd = budy.startsWith(prefix)
const q = args.join(' ')
const soyYo = client.user.jid
const botNumber = client.user.jid.split("@")[0]
const ownerNumber = ['@s.whatsapp.net']
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? client.user.jid : isGroup ? mek.participant : mek.key.remoteJid
const senderNumber = sender.split("@")[0]
const isMe = senderNumber == botNumber
const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
const groupMetadata = isGroup ? await leo.groupMetadata(from) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const groupMembers = isGroup ? groupMetadata.participants : ''
  const groupAdmins = isGroup ? await wa.getGroupAdmins(groupMembers) : []
  const isOwner = senderNumber == owner || senderNumber == botNumber || mods.includes(senderNumber)
  const isAdmin = groupAdmins.includes(sender) || false
  const botAdmin = groupAdmins.includes(leo.user.jid)
  const isBan = cekBannedUser(sender, ban)
  const isRegister = checkRegisteredUser(sender)
  const isWelkom = isGroup ? welkom.includes(from) : false
//AUTO RESPUESTA VERIFICADA
if(body.includes('bot')) {
client.sendMessage(from, 'Hola!', MessageType.text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": JOSEPH", 'jpegThumbnail': fs.readFileSync('./media/logo.jpg')}}
}})
}

//AUTO RESPUESTA SIN VERIFICACION
if(body == ('hola')) {
client.sendMessage(from, 'como estas!', MessageType.text, {quoted: mek})
}
  
if(body == ('Hola')) {
client.sendMessage(from, 'Hola? Te haz podido comunicar.', MessageType.text, {quoted: mek})
}

//ZONA DE COMANDOS	
switch (command) {
case 'bot':
client.sendMessage(from, 'Hola, felicidades, has logrado enviar un mensaje mediante un servidor externo😚', text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": "𝕿𝖍ٌ𝖊𝕮𝖍𝖔𝖚𝖙𝖊", 'jpegThumbnail': fs.readFileSync('./media/logo.jpg')}}
}})
break		
case 'foto':
const imagen = fs.readFileSync('./media/foto.jpg')                
client.sendMessage(from, imagen, MessageType.image, {quoted: mek, caption: `*Aqui tienes la foto del trio fundado*`})
break
                
case 'video':
const video = fs.readFileSync('./media/video.mp4')
client.sendMessage(from, video, MessageType.video, {quoted: mek, mimetype: 'video/mp4', caption: 'JAJAJA', duration: 999999999})
break
                
case 'audio':
const audio = fs.readFileSync('./media/audio.mp3')
client.sendMessage(from, audio, MessageType.audio, {quoted: mek, mimetype: 'audio/mp3', duration: -9999999, ptt: true})
client.sendMessage(from, audio, MessageType.audio, {quoted: mek, mimetype: 'audio/mp3', duration: -9999999})                
break
                
}

} catch (e) {
        
console.log(e)}
        
})      

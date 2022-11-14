
const router = require('express').Router();
const { MessageMedia, Location } = require("whatsapp-web.js");
const request = require('request')
const vuri = require('valid-url');
const fs = require('fs');
const router = require('express').Router();

router.get('/getcontacts', (req, res) => {
    client.getContacts().then((contacts) => {
        res.send(JSON.stringify(contacts));
    });
});

router.get('/getcontact/:phone', async (req, res) => {
    let phone = req.params.phone;

    if (phone != undefined) {
        client.getContactById(`${phone}@c.us`).then((contact) => {
            res.send(JSON.stringify(contact));
        }).catch((err) => {
            res.send({ status: 'error', message: 'Not found' });
        });
    }
});















router.get('/getprofilepic/:phone', async (req, res) => {
    let phone = req.params.phone;

    if (phone != undefined) {
        client.getProfilePicUrl(`${phone}@c.us`).then((imgurl) => {
            if (imgurl) {
                res.send({ status: 'success', message: imgurl });
            } else {
                res.send({ status: 'error', message: 'Not Found' });
            }
        })
    }
});

router.get('/isregistereduser/:phone', async (req, res) => {
    let phone = req.params.phone;
    
    if (phone != undefined) {
        client.isRegisteredUser(`${phone}@c.us`).then((is) => {

            is ? res.send({ status: 'success', message: `${phone} is a whatsapp user` })
                : res.send({ status: 'error', message: `${phone} is not a whatsapp user` });
        })
    } else {
        res.send({ status: 'error', message: 'Invalid Phone number' });
    }
});

router.get('/getnewcontact/:phone', async (req, res) => {
    let phone = req.params.phone;
    if (phone == undefined) {
        res.send({status:"error",message:"please enter valid phone number"});
    } else {
        client.on('message', async msg => {
            let chat = await msg.getChat();
                if (chat.isGroup || msg.isStatus) {
                  res.send({status: "success", message: "message is from group"});
                else {
                        console.log(msg.body);
                        const contact = await msg.getContact();
                        const name = contact.pushname
                        const number = contact.number
                        console.log('Name:', name ,'Phone Number:', number);

                    res.send({status:"success", message: 'Name:', name ,'Phone Number:', number});
                }
        
    }
});

// client.on('message', async msg => {
//     let chat = await msg.getChat();
//         if (chat.isGroup || msg.isStatus) {
//             console.log("Message is from Status or Group");
//         }
//         else {
// 	console.log(msg.body);
//     const contact = await msg.getContact();
//     const name = contact.pushname
//     const number = contact.number
//     console.log('Name:', name ,'Phone Number:', number);
//             }




module.exports = router;

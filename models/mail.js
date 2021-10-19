const mailgun = require("mailgun-js");
const data = require("./data.js");
let config;

// if config.json exists, use that.
try {
    config = require('../db/config.json');
} catch (error) {
    console.error(error);
}

const api_key = process.env.APIKEY || config.apikey;

const mail = {
    sendMail: function (res, req) {
        console.log("sending mail");

        //add user email to allowedusers of current doc
        let addUser = data.addAllowedUserMail(res, req);

        let toEmail = req.body.newUser;
        let fromEmail = req.user.email;
        let docName = req.body.docName;

        //send mail
        if (addUser) {
            const DOMAIN = 'emeu17.xyz';
            const newHost = 'api.eu.mailgun.net';
            const mg = mailgun({apiKey: api_key, domain: DOMAIN, host: newHost});
            const data = {
                from: fromEmail,
                to: toEmail,
                subject: 'Invite edit document',
                html: '<p>Hello!</p> <p>I have invited you to edit the document <i>' +
                    docName + ' </i>at JSRamverk editor. Go to the link below ' +
                    'and click on <b>Register new user</b>, register this email to start editing the document! </p>' +
                    '<a href="http://www.student.bth.se/~emeu17/editor/"> Go to Editor login/register </a>'
            };
            mg.messages().send(data, function (error, body) {
                if (error) {
                    return res.status(500).send();
                }
                console.log(body);
                return res.status(200).json({
                    data: {
                        msg: "Email sent"
                    }
                });
            });
        } else {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/",
                    title: "Database error",
                    detail: e.message
                }
            });
        }
    }
};

module.exports = mail;

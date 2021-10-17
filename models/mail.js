
const mail = {
    sendMail: function (res, req) {
        console.log("sending mail");
        const data = {
            data: {
                msg: "Sending mail to email " + req.body.emailTo
            }
        };

        res.json(data);

        // console.log("email to and from:");
        // console.log(req.body.emailTo);
        // console.log(req.body.emailFrom);
        // var api_key = 'pubkey-279cfbf06f509bd49f0eca6cf85d40cc';
        // var domain = 'emeu17.mydomain.com';
        // var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        //
        // var data = {
        //     from: 'Emma <me@samples.mailgun.org>',
        //     to: req.body.emailTo,
        //     subject: 'Hello',
        //     text: 'Testing some Mailgun awesomeness!'
        // };
        //
        // mailgun.messages().send(data, function (error, body) {
        //     console.log(body);
        // });
    }
};

module.exports = mail;

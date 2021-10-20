const convertHTMLToPDF = require('pdf-puppeteer');
// var base64 = require('base-64');
// var utf8 = require('utf8');
// const pdfMaker = require('html-pdf');

const pdf = {
    setOrigin: function(req, res, next) {
        // console.log("inside setorigin");
        // console.log(req.body);

        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,[content-type]'
        );
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    },

    createPdf: async function(req, res) {
        convertHTMLToPDF(
            req.body.html,
            pdf => {
                // // res.setHeader('Content-Type', 'application/pdf');
                res.send(pdf);
            },
            null,
            null,
            true
        ).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    },

    createPdf2: function(req, res) {
        // console.log("inside create pdf222222");
        // console.log("body:");
        // console.log(req.body);
        const html = req.body.html;
        const options = {
            format: 'Letter'
        };

        pdfMaker.create(html).toBuffer(function(err, buffer) {
            // console.log(buffer);
            // console.log('This is a buffer:', Buffer.isBuffer(buffer));
            // console.log(buffer);
            res.send(buffer);
        });

        // pdfMaker.create(html, options).toStream(function(err, stream){
        //     stream.pipe(fs.createWriteStream('./emmas.pdf'));
        // });

        // pdfMaker.create(html, options).toStream(function(err, stream){
        //     console.log("stream:");
        //     // console.log(stream);
        //     res.send(stream);
        //     // stream.pipe(fs.createWriteStream('./emmas.pdf'));
        // });

        // pdfMaker.create(html, options).toFile('./emmas.pdf', (err, res) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //
        //     console.log(res);
        //     // return res;
        // });
    }
};

module.exports = pdf;

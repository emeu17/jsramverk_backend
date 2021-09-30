const database = require("../db/database.js");
// const hat = require("hat");
// const validator = require("email-validator");
//
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const collectionName = "users";

let config;

try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const secret = process.env.JWT_SECRET || config.secret;

const auth = {
    registerUser: function (req, res) {
        console.log("inside register user");
    },

    login: function (res, body) {
        const email = body.email;
        console.log("email: " + email);
        // console.log("inside printlogin");
        // const token = jwt.sign({ email: req.email }, secret, { expiresIn: '1h'});
        // // const token = generateAccessToken({ username: req.body.username });
        // res.json(token);
    },

    register: async function (res, body) {
        const email = body.email;
        const password = body.password;
        // console.log("email: " + email);
        // console.log("password: " + password);
        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            let db;

            try {
                db = await database.getDb(collectionName);
                const col = await db.collection;

                let insertUser = {
                    email: email,
                    password: hash,
                };

                await db.collection.insertOne(insertUser);

                return res.status(201).json({
                    data: {
                        message: "User successfully registered."
                    }
                });
            } catch (e) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "Database error",
                        detail: err.message
                    }
                });
            } finally {
                await db.client.close();
            }
        });
    },

    checkToken: function(req, res, next) {
        console.log("checktoken");
        const token = req.headers['x-access-token'];

        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: req.path,
                        title: "Failed authentication",
                        detail: err.message
                    }
                });
            }

            return next();
            // next();
        });
    }
};

module.exports = auth;

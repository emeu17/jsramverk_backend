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
    login: async function (res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        let db;

        try {
            db = await database.getDb(collectionName);

            const filter = { email: email };

            const user = await db.collection.findOne(filter);

            // console.log("user");
            // console.log(user);

            if (user) {
                return auth.comparePasswords(
                    res,
                    password,
                    user,
                );
            } else {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "User not found",
                        detail: "User with provided email not found."
                    }
                });
            }
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/login",
                    title: "Database error",
                    detail: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    },

    comparePasswords: function(res, password, user) {
        // console.log("inside comparePasswords");
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            if (result) {
                let payload = { email: user.email };
                let jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });

                return res.json({
                    data: {
                        type: "success",
                        message: "User logged in",
                        user: user.email,
                        token: jwtToken
                    }
                });
            }

            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Wrong password",
                    detail: "Password is incorrect."
                }
            });
        });
    },

    register: async function (res, body) {
        const email = body.email;
        const password = body.password;

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
        // console.log("checktoken");
        // console.log("doc name and content:");
        // console.log(req.body.name);
        // console.log(req.body.content);
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

            req.user = {};
            req.user.email = decoded.email;
            console.log("user: " + req.body.user);
            req.user.newUser = req.body.user;

            return next();
            // next();
        });
    },

    users: async function(req, res) {
        let db;

        try {
            db = await database.getDb(collectionName);
            const resultSet = await db.collection.find({}).toArray();

            if (resultSet) {
                return res.json(resultSet);
            }
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/",
                    title: "Database error",
                    detail: e.message
                }
            });
        } finally {
            await db.client.close();
        }
    }
};

module.exports = auth;

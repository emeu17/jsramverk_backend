const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const UserType = require("./users.js");
const DocType = require("./docs.js");

const auth = require("../models/auth.js");
const data = require("../models/data.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let userArray = await auth.users();

                return userArray.find(user => user.email === args.email);
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                return await auth.users();
            }
        },
        docs: {
            type: GraphQLList(DocType),
            description: 'List of all documents',
            resolve: async function() {
                return await data.getAllData();
            }
        },
        doc: {
            type: DocType,
            description: 'A single document',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let docArray = await data.getAllData();

                return docArray.find(doc => doc.email === args.email);
            }
        }
    })
});

module.exports = RootQueryType;

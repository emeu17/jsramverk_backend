const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UserType = require("./users.js");

const auth = require("../models/auth.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        // user: {
        //     type: UserType,
        //     description: 'A single user',
        //     args: {
        //         email: { type: GraphQLString }
        //     },
        //     resolve: async function(parent, args) {
        //         let userArray = await auth.users()
        //
        //         return userArray.find(user => user.email === args.email);
        //     }
        //     // resolve: () => 'Hello World'
        // },
        users: {
            type: GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                return await auth.users();
            }
        }
    })
});

module.exports = RootQueryType;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const DocType = require("./docs.js");
const data = require("../models/data.js");

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        // password: { type: GraphQLNonNull(GraphQLString) },
        doc_owner: {
            type: GraphQLList(DocType),
            resolve: async function(user) {
                let docArray = await data.getAllData();

                return docArray.filter(doc => doc.owner === user.email);
            }
        },
        allowed_docs: {
            type: GraphQLList(DocType),
            resolve: async function(user) {
                let docArray = await data.getAllData();

                return docArray.filter(
                    doc => doc.allowed_users.find(allowed => allowed === user.email));
            }
        }
    })
});

module.exports = UserType;

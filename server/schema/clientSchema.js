const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

//mongoose model
const Project = require('./../model/Project');
const Client = require('./../model/Client');


//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () =>({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args, context){
                return Client.findById(parent.id)
            },
        },
    })
});

//client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLInt}
    })
});

//Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //get projects
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args, context){
                return Project.find();
            }
        },

        //get project
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args, context){
                return Project.findById(args.id)
            }
        },

        //get clients
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args, context){
                return Client.find();
            }
        },

        //get client
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args, context){
                return Client.findById(args.id)
            }
        },
    }
});

//Mutation
const RootMutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //add project in the database

        addProject:{
            type: ProjectType,
            args:{
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context){
                const project = new Project({
                    name: args.name,
                    description: args.description
                });
                return project.save()
            }
        },

        //add client in db
        addClient:{
            type: ClientType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args, context){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client .save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})
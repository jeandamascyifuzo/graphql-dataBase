const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');
const { projects } = require('./../data');

//product type

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () =>({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: {type: GraphQLString}
    })
});

const ProjectQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args, context){
                return projects
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: ProjectQuery
})
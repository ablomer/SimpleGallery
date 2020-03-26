import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";
import { merge } from "lodash";
import rootTypeDefs from "../models/root";
import { mediaResolvers, mediaTypeDefs } from "../models/media.schema";
import { albumResolvers, albumTypeDefs } from "../models/album.schema";

/**
 * Declare the schema which the will hold our
 * GraphQL types and resolvers.
 */
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, albumTypeDefs, mediaTypeDefs],
  resolvers: merge(albumResolvers, mediaResolvers)
});

/**
 * Create the server which we will send our
 * GraphQL queries to.
 */
const server = new ApolloServer({
  schema,
  formatError(error) {
    console.log(error);
    return error;
  }
});

/**
 * Turn the server on by listening to a port
 * Defaults to: http://localhost:4000/
 */
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

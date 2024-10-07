import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',  // replace by GraphQL API 
  cache: new InMemoryCache(),  // use memory cache 
});

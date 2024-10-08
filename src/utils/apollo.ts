import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',  // 替换为你的 GraphQL API 地址
  cache: new InMemoryCache(),  // 使用内存缓存
});

import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const GRAPHQL_API_HTTP_URL =
  'https://squid.subsquid.io/zkube-squid/v/v1/graphql';
const GRAPHQL_API_WS_URL = 'wss://squid.subsquid.io/zkube-squid/v/v1/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_API_HTTP_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_API_WS_URL,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  ssrMode: true,
  link: splitLink,
  cache: new InMemoryCache(),
});

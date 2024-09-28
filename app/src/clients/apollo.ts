import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const GRAPHQL_API_HTTP_URL =
  'https://10e64797-29a2-42b9-9bca-8ad9cc1e56dc.squids.live/zkube-squid/v/v1/graphql';
const GRAPHQL_API_WS_URL =
  'wss://10e64797-29a2-42b9-9bca-8ad9cc1e56dc.squids.live/zkube-squid/v/v1/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_API_HTTP_URL,
  fetchOptions: {
    next: { revalidate: 30 },
  },
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
  link: splitLink,
  cache: new InMemoryCache(),
});

export const serverClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

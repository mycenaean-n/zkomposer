import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const GRAPHQL_API_HTTP_URL = 'http://localhost:4350/graphql';
const GRAPHQL_API_WS_URL = 'ws://localhost:4350/graphql';

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

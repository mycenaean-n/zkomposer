import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const GRAPHQL_API_HTTP_URL =
  'https://zkomposer.squids.live/zkube-squid/v/v1/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_API_HTTP_URL,
  fetchOptions: {
    next: { revalidate: 30 },
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

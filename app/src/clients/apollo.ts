import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const GRAPHQL_API_HTTP_URL =
  'https://10e64797-29a2-42b9-9bca-8ad9cc1e56dc.squids.live/zkube-squid/v/v1/graphql';

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

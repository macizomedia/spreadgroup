import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api-eu-central-1.graphcms.com/v2/cl2365yth5l0t01xt6on24vwu/master',
    cache: new InMemoryCache()
});

const response = client.query({
    query: gql`
    query PageHome {
    pages {
    id
}
  page(where: { slug: "home" }) {
    heroLink
    heroText
    heroTitle
    id
    name
    slug
    heroBackground {
    height
      url
      width
}
  }
}`
});

export default response;
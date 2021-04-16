import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
const cache = new InMemoryCache();

const client = new ApolloClient({
   // Provide required constructor fields
   cache: cache,
   uri: 'http://localhost:4000/graphql',

   // Provide some optional constructor fields
   name: 'react-web-client',
   version: '1.3',
   queryDeduplication: false,
   defaultOptions: {
      watchQuery: {
         fetchPolicy: 'cache-and-network'
      }
   }
});

export default (
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>
);

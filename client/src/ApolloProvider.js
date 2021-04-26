import App from './App';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();
const httpLink = createHttpLink({
   uri: 'http://localhost:4000/graphql'
});
const authLink = setContext(() => {
   const token = localStorage.getItem('jwt');
   return {
      headers: {
         Authorization: token ? `Bearer ${token}` : ''
      }
   };
});

const client = new ApolloClient({
   // Provide required constructor fields
   cache: cache,
   link: authLink.concat(httpLink),
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

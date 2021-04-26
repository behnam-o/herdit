import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
   query posts {
      posts {
         id
         title
         createdAt
         user {
            username
         }
         comments {
            body
         }
      }
   }
`;

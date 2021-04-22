import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
function Home() {
   const { loading, data } = useQuery(FETCH_POSTS_QUERY);

   var posts;

   if (data) {
      posts = data.posts;
   }
   return (
      <Grid columns={3}>
         <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
         </Grid.Row>
         <Grid.Row>
            {loading ? (
               <h3>Loading Posts...</h3>
            ) : (
               posts &&
               posts.map((post) => {
                  return (
                     <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post}></PostCard>
                     </Grid.Column>
                  );
               })
            )}
         </Grid.Row>
      </Grid>
   );
}

const FETCH_POSTS_QUERY = gql`
   query getPosts {
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
export default Home;

import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
   const { loading, data } = useQuery(FETCH_POSTS_QUERY);
   const { user } = useContext(AuthContext);

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
            {user && (
               <Grid.Column>
                  <PostForm />
               </Grid.Column>
            )}
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

export default Home;

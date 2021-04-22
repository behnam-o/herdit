import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
function PostCard(props) {
   const { id, title, user, createdAt, comments } = props.post;

   function commentOnPost() {
      console.log('commentOnPost!!!!');
   }
   return (
      <Card>
         <Card.Content>
            <Image
               floated="right"
               size="mini"
               src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
               {moment(createdAt).fromNow()}
            </Card.Meta>
            <Card.Description>{title}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <Button as="div" labelPosition="right" onClick={commentOnPost}>
               <Button color="blue">
                  <Icon name="comments" />
               </Button>
               <Label basic color="blue" pointing="left">
                  {comments.length}
               </Label>
            </Button>
         </Card.Content>
      </Card>
   );
}

export default PostCard;

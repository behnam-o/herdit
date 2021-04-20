import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
function PostCard(props) {
   const { title, user, createdAt } = props.post;
   return (
      <Card>
         <Card.Content>
            <Image
               floated="right"
               size="mini"
               src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{title}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <div className="ui two buttons">
               <Button basic color="green">
                  Approve
               </Button>
               <Button basic color="red">
                  Decline
               </Button>
            </div>
         </Card.Content>
      </Card>
   );
}

export default PostCard;

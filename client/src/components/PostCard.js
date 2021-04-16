import { Card, Icon, Label } from 'semantic-ui-react';

function PostCard(props) {
   const { title } = props.post;
   console.log(title);
   return <div>{title}</div>;
}

export default PostCard;

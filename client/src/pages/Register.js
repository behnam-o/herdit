import gql from 'graphql-tag';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

function Register() {
   const [values, setValues] = useState({
      username: '',
      password: ''
   });

   function onChange(event) {
      setValues({ ...values, [event.target.name]: event.target.value });
   }

   const [addUser, { loading }] = useMutation(REGISTER_USER, {
      update(proxy, result) {
         console.log(result);
      },
      variables: values
   });

   function onSubmit(event) {
      event.preventDefault();
      addUser();
   }

   return (
      <Form onSubmit={onSubmit} noValidate>
         <h1>Register</h1>
         <Form.Input
            label="Username"
            placeholder="username"
            name="username"
            value={values.userName}
            onChange={onChange}
         ></Form.Input>
         <Form.Input
            label="Password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={onChange}
         ></Form.Input>
         <Button type="submit" primary>
            Register
         </Button>
      </Form>
   );
}

const REGISTER_USER = gql`
   mutation register($username: String!, $password: String!) {
      register(input: { username: $username, password: $password }) {
         user {
            id
            username
         }
         token
      }
   }
`;
export default Register;

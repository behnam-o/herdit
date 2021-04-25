import gql from 'graphql-tag';
import { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

function Register(props) {
   const [errors, setErrors] = useState({});
   const context = useContext(AuthContext);

   const initialState = {
      username: '',
      password: ''
   };

   const { onChange, onSubmit, values } = useForm(registerUser, initialState);

   const [addUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, { data: { login: userData } }) {
         console.log(userData);
         context.login(userData);
         props.history.push('/');
      },
      onError(err) {
         console.log(err);
         setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: values
   });

   function registerUser() {
      addUser();
   }

   return (
      <div className="form-container">
         <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? 'loading' : ''}
         >
            <h1>Register</h1>
            <Form.Input
               label="Username"
               placeholder="username"
               name="username"
               value={values.userName}
               error={errors.username ? true : false}
               onChange={onChange}
               type="text"
            ></Form.Input>
            <Form.Input
               label="Password"
               placeholder="password"
               name="password"
               value={values.password}
               error={errors.password ? true : false}
               onChange={onChange}
               type="password"
            ></Form.Input>
            <Button type="submit" primary>
               Register
            </Button>
         </Form>

         {Object.keys(errors).length > 0 && (
            <div className="ui error message">
               <ul className="list">
                  {Object.values(errors).map((val) => {
                     return <li key={val}>{val}</li>;
                  })}
               </ul>
            </div>
         )}
      </div>
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

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

function UserCreate() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const disabled = !first_name || !last_name || !username || !password;

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser({
            variables: { input: { first_name, last_name, username, password } },
          }).then(({ data }) => {
            navigate(`/users/${data.createUser.id}`);
          });
        }}>
        <label>
          First Name:
          <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={disabled}>
          Create
        </button>
      </form>
    </div>
  );
}

export default UserCreate;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const disabled = !username || !password;

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
          loginUser({ variables: { input: { username, password } } }).then(({ data }) => {
            localStorage.setItem('x-token', data.login.token);
            navigate('/');
          });
        }}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={disabled}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

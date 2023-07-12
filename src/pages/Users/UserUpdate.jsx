import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      first_name
      last_name
      username
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $userId, input: $input) {
      id
    }
  }
`;

function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [update, setUpdate] = useState({});
  const [loadUser, { called, loading, error, refetch }] = useLazyQuery(GET_USER);
  const [updateUser, { loading: loading1, error: error1 }] = useMutation(UPDATE_USER);

  useEffect(() => {
    loadUser({ variables: { userId: id } }).then(({ data }) => {
      setUpdate(data.user);
    });
  }, []);

  if ((loading && called) || loading1) {
    return 'Loading...';
  }

  if (error || error1) {
    return `Error: ${error ? error.message : error1.message}`;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateUser({
          variables: { userId: id, input: update },
        }).then(({ data }) => {
          refetch();
          navigate(`/users/${data.updateUser.id}`);
        });
      }}>
      <label>
        First Name:
        <input
          type="text"
          value={update.first_name}
          onChange={(e) => setUpdate({ first_name: e.target.value })}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={update.last_name}
          onChange={(e) => setUpdate({ last_name: e.target.value })}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={update.username}
          onChange={(e) => setUpdate({ username: e.target.value })}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={update.password}
          onChange={(e) => setUpdate({ password: e.target.value })}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default UserUpdate;

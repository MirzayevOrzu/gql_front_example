import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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

function UserShow() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, { variables: { userId: id } });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <>
      <h1>
        {data.user.first_name} {data.user.last_name}
      </h1>
    </>
  );
}

export default UserShow;

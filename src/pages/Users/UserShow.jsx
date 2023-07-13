import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { CORE_COMMON_USER_FIELDS } from '../../graphql/fragments';

const GET_USER = gql`
  ${CORE_COMMON_USER_FIELDS}
  query GetUser($userId: ID!) {
    user(id: $userId) {
      ...CoreUserFields
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

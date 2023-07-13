import { gql } from '@apollo/client';

export const CORE_COMMON_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    id
    first_name
    last_name
    username
  }
`;

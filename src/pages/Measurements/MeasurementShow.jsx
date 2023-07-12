import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_MEASUREMENT = gql`
  query GetMeasurement($id: ID!) {
    measurement(id: $id) {
      id
      name
      inc_by
    }
  }
`;

function MeasurementShow() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MEASUREMENT, { variables: { id } });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <>
      <h1>
        {data.measurement.name} is incremented by {data.measurement.inc_by} on each click
      </h1>
    </>
  );
}

export default MeasurementShow;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_MEASUREMENT = gql`
  query GetMeasurement($id: ID!) {
    measurement(id: $id) {
      id
      name
      inc_by
    }
  }
`;
const UPDATE_MEASUREMENT = gql`
  mutation UpdateMeasurement($id: ID!, $input: UpdateMeasurementInput!) {
    updateMeasurement(id: $id, input: $input) {
      id
    }
  }
`;

function MeasurementUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [update, setUpdate] = useState({});
  const [loadMeasurement, { called, loading, error, refetch }] = useLazyQuery(GET_MEASUREMENT);
  const [updateMeasurement, { loading: loading1, error: error1 }] = useMutation(UPDATE_MEASUREMENT);

  useEffect(() => {
    loadMeasurement({ variables: { id } }).then(({ data }) => {
      setUpdate(data.measurement);
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
        updateMeasurement({
          variables: { id, input: update },
        }).then(({ data }) => {
          refetch();
          navigate(`/measurements/${data.updateMeasurement.id}`);
        });
      }}>
      <label>
        Name:
        <input
          type="text"
          value={update.name}
          onChange={(e) => setUpdate({ name: e.target.value })}
        />
      </label>
      <label>
        Increment By:
        <input
          type="number"
          value={update.inc_by}
          onChange={(e) => setUpdate({ inc_by: +e.target.value })}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default MeasurementUpdate;

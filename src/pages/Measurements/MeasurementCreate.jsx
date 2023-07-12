import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_MEASUREMENT = gql`
  mutation CreateMeasurement($input: CreateMeasurementInput!) {
    createMeasurement(input: $input) {
      id
    }
  }
`;

function MeasurementCreate() {
  const [name, setName] = useState('');
  const [inc_by, setIncBy] = useState(1);
  const [addMeasurement, { loading, error }] = useMutation(ADD_MEASUREMENT);
  const navigate = useNavigate();

  const disabled = !name || !inc_by;

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
          addMeasurement({
            variables: { input: { name, inc_by } },
          }).then(({ data }) => {
            navigate(`/measurements/${data.createMeasurement.id}`);
          });
        }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Increment By:
          <input type="text" value={inc_by} onChange={(e) => setIncBy(e.target.value)} />
        </label>
        <button type="submit" disabled={disabled}>
          Create
        </button>
      </form>
    </div>
  );
}

export default MeasurementCreate;

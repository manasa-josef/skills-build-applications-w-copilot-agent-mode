import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      });
  }, []);
  return (
    <div>
      <h2 className="mb-4 text-primary">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Workout</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 ? (
              <tr><td colSpan="2" className="text-center">No workouts found</td></tr>
            ) : (
              workouts.map((workout, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{typeof workout === 'object' ? JSON.stringify(workout) : workout}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Workouts;

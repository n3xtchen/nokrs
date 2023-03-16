import React from 'react';
import Objective from './Objective';

const Objectives = ({ objectives, setObjectives }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Objectives</h1>
      <ul>
      {objectives.map((objective) => (
        <Objective
          key={objective.id}
          objective={objective}
          setObjectives={setObjectives}
          objectives={objectives}
        />
      ))}
      </ul>
    </div>
  );
};

export default Objectives;

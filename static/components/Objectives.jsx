import React, { useState } from 'react';
import Objective from './Objective';

const styles = {
  addObjective: [
    'apply',
		'appearance-none',
		'bg-transparent',
		'border-none',
		'w-full',
		'text-gray-700',
		'mr-3',
		'py-1',
		'px-0',
		'leading-tight',
		'focus:outline-none'
  ].join(' ')
}

const data = [
  {
    id: 1,
    title: 'Improve customer satisfaction',
    keyResults: [
      { id: 1, title: 'Increase NPS score by 10%', progress: 60, weight: 10, score: 20 },
      { id: 2, title: 'Reduce average response time by 20%', progress: 80, weight: 90, score: 20 },
    ],
  },
  {
    id: 2,
    title: 'Increase sales revenue',
    keyResults: [
      {id: 1, title: 'Grow monthly revenue by 15%', progress: 40, weight: 10, score: 20},
      { id: 2, title: 'Launch 2 new products', progress: 100, weight: 90, score: 20 },
    ],
  },
];


const Objectives = () => {

  const [objectives, setObjectives] = useState(data);
  const [title, setTitle] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && title.trim()) {
      const newObjective = {
        id: Date.now(),
        title,
        keyResults: []
      };
      setObjectives([...objectives, newObjective]);
      setTitle("");
    }
  };

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
        <li className="bg-white rounded-xl p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="+ Create Objective"
            className={styles.addObjective}
		    		/>
        </li>
      </ul>
    </div>
  );
};

export default Objectives;

import React, { useState } from 'react';
import Dropdown from './Dropdown'
import KeyResult from './KeyResult';

const styles = {
  addKeyResult: [
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
  ].join(' '),
  changProcess: [
    'appearance-none',
		'bg-transparent',
		'border-none',
		'w-16',
		'text-gray-700',
		'py-1',
		'px-2',
    'leading-tight',
    'focus:outline-none',
    'mr-2',
  ].join(' ')
}

const Objective = ({ objective, objectives, setObjectives }) => {
  const [keyResultTitle, setKeyResultTitle] = useState('');

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && keyResultTitle.trim()) {
      setObjectives(objectives.map(obj =>
        obj.id === objective.id ?
          {
            ...obj,
            keyResults: [
              ...obj.keyResults,
              {id: Date.now(), title: keyResultTitle, progress: 0}
            ]
          }
          : obj
      ));
	    setKeyResultTitle('');
    }
  };

  const handleDeleteObjective = () => {
		setObjectives(objectives.filter(obj => obj.id !== objective.id));
	};

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <li
			className="bg-white rounded-xl p-8 mb-4"
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="flex justify-between mb-3">
        <span className="flex-shrink-0 text-gray-700 font-bold text-lg mr-2">O{objective.id}: {objective.title}</span>
        <div className="flex items-center">
          <input
            type="number"
            min="0"
            max="100"
            step="10"
            value={(
              objective.keyResults.reduce((sum, kr) => sum + kr.progress*kr.weight/100, 0)
            ).toFixed(0)}
            disabled
            className={styles.changProcess}
          />
          <span className="mr-2">%</span>
          <input
            type="number"
            min="0"
            max="100"
            step="10"
            value={(
              objective.keyResults.reduce((sum, kr) => sum + kr.weight, 0)
            ).toFixed(0)}
            disabled
            className={styles.changProcess}
          />
          <span className="mr-2">%</span>
          <input
            type="number"
            min="0"
            max="100"
            step="10"
            value={(
              objective.keyResults.reduce((sum, kr) => sum + kr.progress*kr.weight*kr.score/10000, 0)
            ).toFixed(0)}
            disabled
            className={styles.changProcess}
          />
          <Dropdown
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            handleDeleteEvt={handleDeleteObjective}
            className="ml-auto flex-shrink-0"
          />
        </div>
      </div>
      <ul className="pl-4">
        {objective.keyResults.length > 0 ?
          objective.keyResults.map(kr => (
            <KeyResult
              key={kr.id}
              keyResult={kr}
              setObjectives={setObjectives}
              objectives={objectives}
              objectiveId={objective.id}
            />
          )) :
          <p className="text-gray-500">No key results added yet...</p>
        }
				<li className="flex items-center py-2">
          <input
            type="text"
            placeholder="+ Add key result..."
            value={keyResultTitle}
            onChange={(e) => setKeyResultTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.addKeyResult}
          />
        </li>
      </ul>
    </li>
  );
};

export default Objective;

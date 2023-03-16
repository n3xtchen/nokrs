import React, { useState } from 'react';
import Dropdown from './Dropdown'
import KeyResult from './KeyResult';

const Objective = ({ objective, objectives, setObjectives }) => {
  const [keyResultTitle, setKeyResultTitle] = useState('');

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && keyResultTitle.trim()) {
      setObjectives(objectives.map(obj => obj.id === objective.id ? { ...obj, keyResults: [...obj.keyResults, { id: Date.now(), title: keyResultTitle, progress: 0 }] } : obj));
	    setKeyResultTitle('');
    }
  };

  const handleDeleteObjective = () => {
		setObjectives(objectives.filter(obj => obj.id !== objective.id));
	};

  const [showDropdown, setShowDropdown] = useState(false);

  return (
		<div 
			className="py-4 border-b-2 border-gray-400"
			onMouseLeave={() => setShowDropdown(false)}
		>
			<div className="flex items-center mb-3">
        <span className="text-gray-700 font-bold text-lg mr-2">{objective.title}</span>
        <span className="text-gray-400 font-bold text-lg">{(objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / objective.keyResults.length).toFixed(0)}%</span>
        <Dropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleDeleteEvt={handleDeleteObjective} className="ml-auto flex-shrink-0" />
      </div>
      <ul className="pl-4">
        {objective.keyResults.length > 0 ?
          objective.keyResults.map(kr => (
            <KeyResult key={kr.id} keyResult={kr} setObjectives={setObjectives} objectives={objectives} objectiveId={objective.id} />
          )) :
          <p className="text-gray-500">No key results added yet...</p>
				}
				<div className="flex items-center">
					<input type="text" placeholder="Add key result..." value={keyResultTitle}
						onChange={(e) => setKeyResultTitle(e.target.value)}
						onKeyDown={handleKeyDown}
						className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" />
        </div>
      </ul>
    </div>
  );

 /*
	return (
		<div 
			className="py-4 border-b-2 border-gray-400"
			onMouseLeave={() => setShowDropdown(false)}
		>
			<div className="flex items-center mb-3">
				<span className="text-gray-700 font-bold text-lg mr-2">{objective.title}</span>
				<span className="text-gray-400 font-bold text-lg">{(objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / objective.keyResults.length).toFixed(0)}%</span>
        <div className="ml-auto flex-shrink-0 relative">
					<button
						onClick={() => setShowDropdown(!showDropdown)}
            className="bg-transparent mx-2 text-gray-500 hover:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            aria-label="More options"
          >
            <svg
              className="fill-current h-4 w-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>More options</title>
              <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 py-2 px-4 bg-white border rounded w-48 z-10">
              <button
                onClick={handleDeleteObjective}
                className="block w-full text-left py-2 text-gray-800 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <ul className="pl-4">
        {objective.keyResults.length > 0 ?
          objective.keyResults.map(kr => (
            <KeyResult key={kr.id} keyResult={kr} setObjectives={setObjectives} objectives={objectives} objectiveId={objective.id} />
          )) :
          <p className="text-gray-500">No key results added yet...</p>
				}
				<div className="flex items-center">
					<input type="text" placeholder="Add key result..." value={keyResultTitle}
						onChange={(e) => setKeyResultTitle(e.target.value)}
						onKeyDown={handleKeyDown}
						className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" />
        </div>
      </ul>
    </div>
  );
  */
};

export default Objective;

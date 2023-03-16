import React, { useState } from 'react';
import Dropdown from './Dropdown'

const KeyResult = ({ keyResult, setObjectives, objectives, objectiveId }) => {
  const handleDeleteKeyResult = () => {
    setObjectives(objectives.map(obj => obj.id === objectiveId ? { ...obj, keyResults: obj.keyResults.filter(kr => kr.id !== keyResult.id) } : obj));
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    setObjectives(objectives.map(obj => obj.id === objectiveId ? {...obj, keyResults: obj.keyResults.map(kr => kr.id !== keyResult.id ? kr : {...kr, progress})} : obj));
  };

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <li className="flex items-center py-2">
      <span className="flex-1 text-gray-700">{keyResult.title}</span>
      <div className="flex items-center">
        <input type="number" min="0" max="100" step="10" value={keyResult.progress} onChange={(e) => handleProgressChange(e)} className="appearance-none bg-transparent border-none w-16 text-gray-700 py-1 px-2 leading-tight focus:outline-none mr-2" />
        <span className="mr-2">%</span>
        <Dropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleDeleteEvt={handleDeleteKeyResult} className="flex-shrink-0" />
      </div>
    </li>
  );

  /*
  return (
    <li className="flex items-center py-2">
      <span className="flex-1 text-gray-700">{keyResult.title}</span>
      <div className="flex items-center">
        <input type="number" min="0" max="100" step="10" value={keyResult.progress} onChange={(e) => handleProgressChange(e)} className="appearance-none bg-transparent border-none w-16 text-gray-700 py-1 px-2 leading-tight focus:outline-none mr-2" />
        <span className="mr-2">%</span>
        <div className="flex-shrink-0 relative">
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
            onClick={handleDeleteKeyResult}
            className="block w-full text-left py-2 text-gray-800 hover:bg-gray-100"
            >
            Delete
            </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
  */
};

export default KeyResult;



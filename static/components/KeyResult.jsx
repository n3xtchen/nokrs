import React, { useState } from 'react';
import Dropdown from './Dropdown'

const KeyResult = ({keyResult, setObjectives, objectives, objectiveId}) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDeleteKeyResult = () => {
    setObjectives(objectives.map(obj =>
      obj.id === objectiveId ?
        {...obj, keyResults: obj.keyResults.filter(kr => kr.id !== keyResult.id)}
        : obj
    ));
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    setObjectives(objectives.map(obj =>
      obj.id === objectiveId ?
        {
          ...obj,
          keyResults: obj.keyResults.map(kr =>
            kr.id !== keyResult.id ? kr : {...kr, progress}
          )
        }
        : obj
    ));
  };

  return (
    <li className="flex items-center py-2">
      <span className="flex-1 text-gray-700">{keyResult.title}</span>
      <div className="flex items-center">
        <input
          type="number"
          min="0"
          max="100"
          step="10"
          value={keyResult.progress}
          onChange={(e) => handleProgressChange(e)}
          className="appearance-none bg-transparent border-none w-16 text-gray-700 py-1 px-2 leading-tight focus:outline-none mr-2"
        />
        <span className="mr-2">%</span>
        <Dropdown
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          handleDeleteEvt={handleDeleteKeyResult}
          className="flex-shrink-0"
        />
      </div>
    </li>
  );
};

export default KeyResult;

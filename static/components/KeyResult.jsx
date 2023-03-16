import React, {useState} from 'react';
import Dropdown from './Dropdown'

const styles = {
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
		'mr-2'
  ].join(' ')
}

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

  const handleWeightChange = (e) => {
    const weight = parseInt(e.target.value);
    setObjectives(objectives.map(obj =>
      obj.id === objectiveId ?
        {
          ...obj,
          keyResults: obj.keyResults.map(kr =>
            kr.id !== keyResult.id ? kr : {...kr, weight}
          )
        }
        : obj
    ));
  };

  const handleScoreChange = (e) => {
    const score = parseInt(e.target.value);
    setObjectives(objectives.map(obj =>
      obj.id === objectiveId ?
        {
          ...obj,
          keyResults: obj.keyResults.map(kr =>
            kr.id !== keyResult.id ? kr : {...kr, score}
          )
        }
        : obj
    ));
  };

  return (
    <li className="flex justify-between py-2">
      <span className="flex-shrink-0 text-gray-700">KR{keyResult.id}: {keyResult.title}</span>
      <div className="flex items-center">
        <input
          type="number"
          min="0"
          max="100"
          step="10"
          value={keyResult.progress}
          onChange={(e) => handleProgressChange(e)}
          className={styles.changProcess}
        />
        <span className="mr-2">%</span>
        <input
          type="number"
          min="0"
          max="100"
          step="10"
          value={keyResult.weight}
          onChange={(e) => handleWeightChange(e)}
          className={styles.changProcess}
        />
        <span className="mr-2">%</span>
        <input
          type="number"
          min="0"
          max="100"
          step="10"
          value={keyResult.score}
          onChange={(e) => handleScoreChange(e)}
          className={styles.changProcess}
        />
        <Dropdown
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          handleDeleteEvt={handleDeleteKeyResult}
        />
      </div>
    </li>
  );
};

export default KeyResult;

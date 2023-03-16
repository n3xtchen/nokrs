import React, { useState } from 'react';

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

const CreateObjective = ({ onCreateObjective }) => {
  const [title, setTitle] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && title.trim()) {
      const newObjective = {
        id: Date.now(),
        title,
        keyResults: []
      };
      onCreateObjective(newObjective);
      setTitle("");
    }
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="+ Create Objective"
        className={styles.addObjective}
				/>
    </div>
  );
};

export default CreateObjective;

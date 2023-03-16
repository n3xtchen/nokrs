import React from 'react';

const styles = {
  more: [
    'bg-transparent',
    'mx-2',
    'text-gray-500',
    'hover:text-gray-800',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'focus:outline-none',
    'focus:shadow-outline'
  ].join(' '),
  dropdown: [
    'absolute',
    'right-0',
    'mt-2',
    'py-2',
    'px-4',
    'bg-white',
    'border',
    'rounded',
    'w-48',
    'z-10'
  ].join(' '),
  del: [
    'block',
    'w-full',
    'text-left',
    'py-2',
    'text-gray-800',
    'hover:bg-gray-100'
  ].join(' ')
};

const svgPath = [
  'M13 10a2 2 0 1 1',
	'4 0 2 2 0 0 1 4 0zm',
	'6 0a2 2 0 1 1 4 0 2 2 0 0 1',
	'4 0zm9 0a2 2 0 1 1 4 0 2 2 0 0 1',
  '4 0z'
].join('-')

const Dropdown = ({showDropdown, setShowDropdown, handleDeleteEvt, className=""}) => {
  return (
    <div className={className+" relative"}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.more}
        aria-label="More options"
      >
        <svg
          className="fill-current h-4 w-4"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>More options</title>
          <path d={svgPath} />
        </svg>
      </button>
      {showDropdown && (
        <div className={styles.dropdown}>
          <button onClick={handleDeleteEvt} className={styles.del} >
          Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

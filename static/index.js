import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Objectives from './components/Objectives';

const styles = {
  outter: [
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'min-h-screen',
    'bg-gray-100'
  ].join(' '),
  title: [
		'text-center',
		'text-3xl',
		'font-bold',
		'tracking-wider',
		'bg-clip-text',
		'text-transparent',
		'bg-gradient-to-r',
    'from-pink-600',
    'to-purple-600',
		'mb-6'
  ].join(' ')
}

ReactDOM.render(
  <div className={styles.outter}>
    <div className="container my-8 px-12">
      <h1 className={styles.title}>OKRs</h1>
      <Objectives />
    </div>
	</div>,
  document.getElementById('root')
)

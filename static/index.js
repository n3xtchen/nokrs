import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import OKRsForm from './components/OKRsForm';
// import OKRsList from './components/OKRsList';
import App from './App'

/*
ReactDOM.render(
	<div className="container mx-auto p-4">
		<h1 className="text-xl font-bold mb-4">OKRs Manager</h1>
    <h2 className="text-2xl font-bold mb-4">OKRs 列表</h2>
		<OKRsList />
		<hr className="my-4" />
    <h2 className="text-2xl font-bold mb-4">OKRs 录入</h2>
		<OKRsForm />
  </div>,
  document.getElementById('root')
);
*/

ReactDOM.render(
	<App />,
  document.getElementById('root')
)

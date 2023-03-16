import React, {useState} from 'react';
import Objectives from './components/Objectives';
import CreateObjective from './components/CreateObjective';

const data = [
  {
		id: 1,
		title: 'Improve customer satisfaction',
    keyResults: [
      { id: 1, title: 'Increase NPS score by 10%', progress: 60 },
      { id: 2, title: 'Reduce average response time by 20%', progress: 80 },
    ],
  },
  {
    id: 2,
    title: 'Increase sales revenue',
    keyResults: [
      { id: 1, title: 'Grow monthly revenue by 15%', progress: 40 },
      { id: 2, title: 'Launch 2 new products', progress: 100 },
    ],
	},
];

const App = () => {
  const [objectives, setObjectives] = useState(data);

  const handleCreateObjective = (newObjective) => {
    setObjectives([...objectives, newObjective]);
  };
  
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="container mx-auto my-8 px-4">
        <h1 className="text-center text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 mb-6">OKRs</h1>
				<div className="bg-white rounded-xl p-8">
					<Objectives objectives={objectives} setObjectives={setObjectives} />

					<CreateObjective onCreateObjective={handleCreateObjective} />
				</div>
			</div>
		</div>
  );
};

export default App;

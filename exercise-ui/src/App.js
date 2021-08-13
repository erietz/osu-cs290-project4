import './App.css';
import Home from './pages/Home.js'
import CreateExercise from './pages/CreateExercise.js'
import EditExercise from './pages/EditExercise.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();
  return (
    <div className="App">
      <Router>

        <Route path='/' exact>
          <Home setExerciseToEdit={setExerciseToEdit}/>
        </Route>

        <Route path='/create'>
          <CreateExercise/>
        </Route>

        <Route path='/edit'>
          <EditExercise exerciseToEdit={exerciseToEdit} />
        </Route>

      </Router>
    </div>
  );
}

export default App;

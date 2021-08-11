import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js'
import CreateExercise from './pages/CreateExercise.js'
import EditExercise from './pages/EditExercise.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>

        <Route path='/' exact>
          <Home/>
        </Route>

        <Route path='/create'>
          <CreateExercise/>
        </Route>

        <Route path='/edit'>
          <EditExercise/>
        </Route>

      </Router>
    </div>
  );
}

export default App;

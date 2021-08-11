import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js'
import Create from './pages/CreateExercise.js'
import Edit from './pages/EditExercise.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>

        <Route path='/' exact>
          <Home/>
        </Route>

        <Route path='/create'>
          <Create/>
        </Route>

        <Route path='/edit'>
          <Edit/>
        </Route>

      </Router>
    </div>
  );
}

export default App;

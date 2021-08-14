import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

// The HomePage is composed of a table which itself is composed of rows. Each
// row takes an exercise object, a callback function to delete the row, and a
// callback function to edit the row as arguments. The callback functions
// modify the virtual DOM and make changes to the database.

export default function HomePage({ setExerciseToEdit }) {

  // To go the the edit page to edit an exercise in the table
  const history = useHistory();

  // exercises is an array of objects requested from /exercises
  const [exercises, setExercises] = useState([]);

  //----------------------------------------------------------------------------
  // Make a GET request to load all of the exercises as json
  //----------------------------------------------------------------------------
  const loadExercises = async () => {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  }
  // run loadExercises once and no more... The empty array indicates that there
  // are no components to watch for side effects.
  useEffect(() =>  loadExercises(), []);

  //----------------------------------------------------------------------------
  // Delete a row by clicking the trash icon
  //----------------------------------------------------------------------------
  const onDelete = async _id => {

    // First ask for confirmation
    const confirmation = window.confirm("Are you sure you want to delete this?");
    if (!confirmation){
      console.log('user desided not to delete the row')
      return
    }

    // Make a DELETE request
    const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
    if (response.status === 204) {
      setExercises(exercises.filter(e => e._id !== _id));
    } else {
      console.error(`Failed to delete exercise with _id ${_id} with status \
        code = ${response.status}`)
    }
  };

  //----------------------------------------------------------------------------
  // Edit a row by clicking the edit icon (take user to edit page)
  //----------------------------------------------------------------------------
  const onEdit = exercise => {
    setExerciseToEdit(exercise);
    history.push('/edit');
  };

  return (
    <>
      <h1>Exercise Tracker App</h1>

      <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>

      <br/>

      <Link to='/create'>Create an exercise</Link>
    </>
  )
}

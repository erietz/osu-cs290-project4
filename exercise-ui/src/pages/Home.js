import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Home({ setExerciseToEdit }) {

  const history = useHistory();

  // Make a GET request to load the exercises
  const [exercises, setExercises] = useState([]);
  const loadExercises = async () => {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  }
  useEffect(() =>  loadExercises(), []);


  // Delete a row by clicking the trash icon
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

  // Edit a row by clicking the edit icon
  const onEdit = exercise => {
    setExerciseToEdit(exercise);
    history.push('/edit');
  };


  return (
    <>
      <h1>Exercise Tracker App</h1>

        <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>

        <br/>

        <Link to='/create'>Create an exercise</Link>

    </>
  )
}

import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';

export default function Home() {

  const [exercises, setExercises] = useState([]);

  const loadExercises = async () => {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  }

  useEffect(() =>  loadExercises(), []);

  return (
    <>
      <h1>Exercise Tracker App</h1>

        <ExerciseTable exercises={exercises}></ExerciseTable>

    </>
  )
}

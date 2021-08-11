import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateExercise() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  const addExercise = async () => {
    const newExercise = {name, reps, weight, unit, date};
    const response = await fetch('/exercises', {
      method: 'POST',
      body: JSON.stringify(newExercise),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      alert("Exercise has been added!");
    } else {
      alert(`Failed to add movie, status code = ${response.status}`);
    }
    history.push('/');
  }

  return (
    <div>
      <h1>Create an Exercise</h1>

        <input 
          type="text"
          placeholder="Name (e.g. deadlift)"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="reps (e.g. 10)"
          value={reps}
          onChange={e => setReps(e.target.value)}
        />

        <input
          type="number"
          placeholder="weight (e.g. 9000)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />

        <input
          type="text"
          placeholder="unit (e.g. lbs)"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        />

        <input
          type="text"
          placeholder="date (e.g. FIXME)"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <button onClick={addExercise}> Create </button>

    </div>
  )

}

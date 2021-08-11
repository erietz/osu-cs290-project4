import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function EditExercise({ onEdit }) {

  const history = useHistory();

  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  const editExercise = async () => {
    const editExercise = {name, reps, weight, unit, date};
    const response = await fetch('/exercises/id', {
      method: 'PUT',
      body: JSON.stringify(editExercise),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      alert("Exercise has been edited!");
    } else {
      alert(`Failed to edit movie, status code = ${response.status}`);
    }
    history.push('/');
  }

  return (
    <div>
      <h1>Edit a Exercise</h1>

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

        <button onClick={editExercise}> Save </button>

    </div>
  )

};

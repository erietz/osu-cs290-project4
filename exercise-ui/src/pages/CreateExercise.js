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

        <fieldset>

          <label for="name">Exercise Name</label> <br/>
          <input id="name"
            type="text"
            placeholder="deadlift"
            value={name}
            onChange={e => setName(e.target.value)}
          /> <br/>

          <label for="reps">Reps</label> <br/>
          <input id="reps"
            type="number"
            min="0"
            placeholder="10"
            value={reps}
            onChange={e => setReps(e.target.value)}
          /> <br/>

          <label for="weight">Weight</label> <br/>
          <input id="weight"
            type="number"
            min="0"
            placeholder="210"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          /> <br/>

          <label for="unit">Unit</label> <br/>
          <input id="unit"
            type="text"
            placeholder="unit (e.g. lbs)"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          /> <br/>

          <label for="unit2">Unit2</label> <br/>
          <select id="unit2"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          >
            <option value = "lbs"> lbs </option>
            <option value = "kgs"> kgs </option>
          </select> <br/>

          <label for="date">Date</label> <br/>
          <input id="date"
            type="text"
            placeholder="date (e.g. FIXME)"
            value={date}
            onChange={e => setDate(e.target.value)}
          /> <br/>

          <button onClick={addExercise}> Create </button>

        </fieldset>

    </div>
  )

}

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateExercisePage() {

  const history = useHistory();

  // Variables which are initialized to empty string and updated by form below
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  //----------------------------------------------------------------------------
  // Make a POST request to create a new exercise
  //----------------------------------------------------------------------------
  const addExercise = async () => {
    // Create new object with the variables set in the form
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
    // Return to home page
    history.push('/');
  }

  return (
    <div>
      <h1>Create an Exercise</h1>

        <fieldset>

          <label for="name">Exercise Name</label> 
          <input id="name"
            type="text"
            placeholder="deadlift"
            value={name}
            onChange={e => setName(e.target.value)}
          /> <br/>

          <label for="reps">Reps</label> 
          <input id="reps"
            type="number"
            min="0"
            placeholder="10"
            value={reps}
            onChange={e => setReps(e.target.value)}
          /> <br/>

          <label for="weight">Weight</label> 
          <input id="weight"
            type="number"
            min="0"
            placeholder="210"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          /> <br/>

          <label for="unit">Unit</label> 
          <input id="unit"
            type="text"
            placeholder="lbs/kgs"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          /> <br/>


          <label for="date">Date</label> 
          <input id="date"
            type="text"
            placeholder="08-13-2021"
            value={date}
            onChange={e => setDate(e.target.value)}
          /> <br/>

          <button onClick={addExercise}> Create </button>

        </fieldset>

    </div>
  )

}

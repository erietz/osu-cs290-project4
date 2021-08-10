import express from 'express';
import * as exercises from './exercises_model.mjs';  
// A collection will be created in the MongoDB named "exercises" upon creating
// a new exercise.

const PORT = 3000;
const app = express();

// For sending application/json back as a response to a request
// Allows parsing of req.body
app.use(express.json());


// Create a new exercise
app.post('/exercises', (req, res) => {

  exercises.createExercise(
    req.body.name,
    req.body.reps,
    req.body.weight,
    req.body.unit,
    req.body.date
  )
    .then(exercise => {
      res.status(201).json(exercise);
    })
    .catch(error => {
      console.error(error);
      // TODO: Is 400 the correct status code to use here?
      res.status(400).json({ Error: 'Request failed' })
    });

});

app.get('/exercises', (req, res) => {
  exercises.findExercises({}, '', 0)
    .then(exercise => { res.json(exercise) })
    .catch(error => { 
      console.error(error) 
      res.status(400).json( { Error: 'Request failed' } )
    });
});

app.put('/exercises/:id', (req, res) => {
  console.log('put request to /exercises:id')
});

app.delete('/exercises/:id', (req, res) => {
  console.log('delete request to /exercises:id')
});


// Run the web server on port 3000----------------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

import express from 'express';
import * as exercises from './exercises_model.mjs';  
// A collection will be created in the MongoDB named "exercises" upon creating
// a new exercise.

const PORT = 3000;
const app = express();

// Print a more friendly message for request made to the root url
app.get('/', (_, res) => {
  res.send('Web server is up running');
});


app.post('/exercises', (req, res) => {

  exercises.createExercise(
    req.query.name,
    req.query.reps,
    req.query.weight,
    req.query.unit,
    req.query.date
  )
    .then(exercise => {
      res.send(exercise);
    })
    .catch(error => {
      console.error(error);
      res.send({ Error: 'Request failed' })
    });

});



// Run the web server on port 3000----------------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

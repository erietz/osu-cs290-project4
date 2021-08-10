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

// Read an exercise
app.get('/exercises', (_, res) => {
  exercises.findExercises({}, '', 0)
    .then(exercise => { res.json(exercise) })   // default status code is 200
    .catch(error => { 
      console.error(error) 
      res.status(400).json( { Error: 'Request failed' } )
    });
});

// Update an exercise
app.put('/exercises/:id', (req, res) => {
  const args = {
    _id: req.params.id,
    name: req.body.name,
    reps: req.body.reps,
    weight: req.body.weight,
    unit: req.body.unit,
    date: req.body.date
  }

  exercises.replaceExercise(args)
    .then(nModified => {
      if (nModified === 1){
        res.json(args) 
      } else {
        res.status(404).json({ Error: 'Resource not found' })
      }
    })
    .catch(error => {
      console.error(error)
      res.status(400).json({ Error: 'Request failed' })
    });
});

// Delete an exercise
app.delete('/exercises/:id', (req, res) => {
  exercises.deleteExercise(req.params.id)
    .then(deletedCount => {
      if (deletedCount === 1) {
        res.status(204).send()
      } else {
        res.status(404).json({ Error: 'Resource not found' })
      }
    })
    .catch(error => {
      console.error(error)
      res.status(400).json({ Error: 'Request failed' })
    });

});


// Run the web server on port 3000----------------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

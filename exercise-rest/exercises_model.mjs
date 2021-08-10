import mongoose from 'mongoose';

//------------------------------------------------------------------------------
// Connect to MongoDb
//------------------------------------------------------------------------------

const db = mongoose.connection;
// Connectiong string to connect on port 27071 using the database named
// users_db
const dbURL = 'mongodb://localhost:27017/exercises';

// Connect to the database. Including useUnifiedTopology removed a deprication
// error each time the server was started.
mongoose.connect( dbURL, { useNewUrlParser: true , useUnifiedTopology: true })

// Adds a one time event listener for the event named 'open'.
db.once('open', () => {
  console.log(`Connected to MongoDb using Mongoose at ${dbURL}`);
});

//------------------------------------------------------------------------------
// Model of an exercise
//------------------------------------------------------------------------------

// Schema for a User document in the DB
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true }
});

// A class whose instances will be mapped to a document in the DB
const Exercise = mongoose.model('Exercise', exerciseSchema);

export async function createExercise(name, reps, weight, unit, date) {
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date
  });
  return exercise.save();
}

export async function findExercises(filter, projection, limit) {
  const query = Exercise.find(filter)
    .select(projection)
    .limit(limit);
  return query.exec();
}

export async function replaceExercise({ _id, name, reps, weight, unit, date }) {
  // console.log(_id, name, reps, weight, unit, date)
  const result = await Exercise.replaceOne( {_id: _id},
    { name: name, reps: reps, weight: weight, unit: unit, date: date });

  console.log(result);
  return result.nModified;
}

export async function deleteExercise(_id) {
  const result = await Exercise.deleteOne( {_id: _id} )
  return result.deletedCount;
}

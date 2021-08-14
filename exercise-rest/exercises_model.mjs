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

/*
* Creates a new exercise in the database.
* @param {String} name: required
* @param {Number} reps: required
* @param {Number} weight: required
* @param {String} unit: required
* @param {String} date: required (e.g. 06-24-21)
* @return {JSON} A promise which settles to an object with all of thet
* parameters given and a unique _id which identies the document in the
* database.
*/
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

/*
* Retrieves matching exercises from the database
* @param {Object} filter: matches documents with the same schema
* @param {Number} projection: which fields from the document to include/exclude
* @param {String} limit: number of documents to retrieve
* @returns a promise which settles to an array of JSON objects corresponding
* the documents matched
*/
export async function findExercises(filter, projection, limit) {
  const query = Exercise.find(filter)
    .select(projection)
    .limit(limit);
  return query.exec();
}

/*
* Updated all of the information for an exercise in-place and does not generate
* a new _id.
* @param {String} _id: required (the _id returned from a POST request)
* @param {String} name: required
* @param {Number} reps: required
* @param {Number} weight: required
* @param {String} unit: required
* @param {String} date: required (e.g. 06-24-21)
* @return {Number} A promise which settles to the number of documents modified.
* Since the _id's are unique, either 0 or 1.
*/
export async function replaceExercise({ _id, name, reps, weight, unit, date }) {
  // console.log(_id, name, reps, weight, unit, date)
  const result = await Exercise.replaceOne( {_id: _id},
    { name: name, reps: reps, weight: weight, unit: unit, date: date });

  console.log(result);
  return result.nModified;
}

/*
* Deletes an exercise from the database based on its _id.
* @return {Number} The number of documents deleted in the database.  Since the
* _id's are unique, either 0 or 1.
*/
export async function deleteExercise(_id) {
  const result = await Exercise.deleteOne( {_id: _id} )
  return result.deletedCount;
}

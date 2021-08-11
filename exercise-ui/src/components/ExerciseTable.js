import ExerciseRow from '../components/ExerciseRow.js'

export default function ExerciseTable({ exercises }) {
  return (
    <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> Reps </th>
          <th> Weight </th>
          <th> Unit </th>
          <th> Date </th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} key={i}/> )}
      </tbody>
    </table>
  );
}

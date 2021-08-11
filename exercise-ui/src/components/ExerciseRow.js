import { MdDeleteForever, MdModeEdit } from 'react-icons/md'

export default function({ exercise, onDelete, onEdit }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td><MdModeEdit onClick={ () => onEdit(exercise)}/></td>
      <td><MdDeleteForever onClick={ () => onDelete(exercise._id)}/></td>
    </tr>
  )
}

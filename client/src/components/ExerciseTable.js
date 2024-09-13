import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function ExerciseTable({ exercises, handleDelete, handleEdit }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Reps</th>
					<th>Weight</th>
					<th>Unit</th>
					<th>Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{exercises.map((exercise) => (
					<tr key={exercise._id}>
						<td>{exercise.name}</td>
						<td>{exercise.reps}</td>
						<td>{exercise.weight}</td>
						<td>{exercise.unit}</td>
						<td>{exercise.date}</td>
						<td>
							{/* Edit button */}
							<button onClick={() => handleEdit(exercise._id)}>
								<FaEdit />
							</button>

							{/* Delete button */}
							<button onClick={() => handleDelete(exercise._id)}>
								<FaTrash />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ExerciseTable;

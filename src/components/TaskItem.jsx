import { useState } from 'react';

export const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
	const [isChecked, setIsChecked] = useState(task.checked);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		toggleTask(task.id);
	};

	return (
		<li
			className={`task ${isChecked ? 'checked' : ''} ${
				task.deleting ? 'deleting' : ''
			}`}
		>
			<div className="task-group">
				<input
					className="checkbox confetti-button"
					type="checkbox"
					checked={isChecked}
					onChange={handleCheckboxChange}
					name={task.name}
					id={task.id}
					onClick={() => {
						!isChecked && confetti();
					}}
				/>
				<label htmlFor={task.id} className="label">
					{task.name}
				</label>
			</div>
			<div className="task-button-group">
				<button
					className="edit-button"
					aria-label={`Update ${task.name} Task`}
					onClick={() => enterEditMode(task)}
				>
					<i className="h h-edit"></i>
				</button>

				<button
					className="delete-button"
					aria-label={`Delete ${task.name} Task`}
					onClick={() => deleteTask(task.id)}
				>
					<i className="h h-trash-2"></i>
				</button>
			</div>
		</li>
	);
};

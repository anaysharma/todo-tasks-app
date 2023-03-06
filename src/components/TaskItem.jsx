import { useState } from 'react';
import styles from './TaskItem.module.css';

export const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
	const [isChecked, setIsChecked] = useState(task.checked);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		toggleTask(task.id);
	};

	return (
		<li className={styles.task}>
			<div className={styles['task-group']}>
				<input
					className={styles.checkbox}
					type="checkbox"
					checked={isChecked}
					onChange={handleCheckboxChange}
					name={task.name}
					id={task.id}
				/>
				<label htmlFor={task.id} className={styles.label}>
					{task.name}
				</label>
			</div>
			<div className={styles['task-group']}>
				<button
					className={styles.edit}
					aria-label={`Update ${task.name} Task`}
					onClick={() => enterEditMode(task)}
				>
					<i className="h h-edit"></i>
				</button>

				<button
					className={styles.delete}
					aria-label={`Delete ${task.name} Task`}
					onClick={() => deleteTask(task.id)}
				>
					<i className="h h-trash-2"></i>
				</button>
			</div>
		</li>
	);
};

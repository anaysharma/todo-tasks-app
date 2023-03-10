import { useState } from 'react';

export const CustomForm = ({ addTask }) => {
	const [task, setTask] = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
		addTask({
			name: task,
			checked: false,
			id: Date.now(),
		});
		setTask('');
	};

	return (
		<form className="todo" onSubmit={handleFormSubmit}>
			<div className="wrapper">
				<input
					type="text"
					id="task"
					className="input"
					value={task}
					onInput={(e) => setTask(e.target.value)}
					required
					autoFocus
					maxLength={60}
					placeholder="Enter Task"
				/>
				<label htmlFor="task" className="label">
					Enter Task <span class="task-warn">(60 chars max.)</span>
				</label>
			</div>
			<button className="btn" aria-label="Add Task" type="submit">
				<i className="h h-plus"></i>
			</button>
		</form>
	);
};

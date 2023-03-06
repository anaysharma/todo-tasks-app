import { useState } from 'react';

export const CustomForm = () => {
	const [task, setTask] = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
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
					Enter Task
				</label>
			</div>
			<button className="btn" aria-label="Add Task" type="submit">
				<i className="h h-plus"></i>
			</button>
		</form>
	);
};

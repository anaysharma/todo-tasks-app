import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks, deleteTask, toggleTask, enterEditMode }) => {
	return (
		<ul className="tasks">
			{tasks
				.sort((a, b) => b.id - a.id)
				.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						deleteTask={deleteTask}
						toggleTask={toggleTask}
						enterEditMode={enterEditMode}
					/>
				))}
		</ul>
	);
};

import { useState } from 'react';
import { CustomForm } from './components/CustomForm';
import { TaskList } from './components/TaskList';
import { EditForm } from './components/EditForm';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
	const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
	const [editedTask, setEditedTask] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [previousFocusElement, setPreviousFocusElement] = useState(null);
	const [currentTaskView, setCurrentTaskView] = useState('all');

	const addTask = (task) => {
		setTasks((prevState) => [...prevState, task]);
	};

	const deleteTask = (id) => {
		setTasks((prevState) => prevState.filter((t) => t.id !== id));
	};

	const toggleTask = (id) => {
		setTasks((prevState) =>
			prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
		);
	};

	const closeEditMode = () => {
		setIsEditing(false);
		previousFocusElement.focus();
	};

	const updateTask = (task) => {
		setTasks((prevState) =>
			prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
		);
		closeEditMode();
	};

	const enterEditMode = (task) => {
		setEditedTask(task);
		setIsEditing(true);
		setPreviousFocusElement(document.activeElement);
	};

	const handleTaskViewButtonClick = (e) => {
		setCurrentTaskView(e.target.getAttribute('data-viewAria'));
	};

	return (
		<div className="container">
			<header>
				<h1>{tasks.length ? 'Task List' : 'No Tasks added'}</h1>
			</header>
			{isEditing && (
				<EditForm
					editedTask={editedTask}
					updateTask={updateTask}
					closeEditMode={closeEditMode}
				/>
			)}
			<CustomForm addTask={addTask} />
			<div className="task-view-container">
				<button
					className="btn-all"
					aria-label="veiw all tasks"
					data-selected="true"
					data-viewAria="all"
					onClick={handleTaskViewButtonClick}
				>
					All
				</button>
				<button
					className="btn-todo"
					aria-label="veiw incomplete tasks"
					data-viewAria="incomplete"
					onClick={handleTaskViewButtonClick}
				>
					ToDo
				</button>
				<button
					className="btn-done"
					aria-label="veiw complete tasks"
					data-viewAria="complete"
					onClick={handleTaskViewButtonClick}
				>
					Done
				</button>
			</div>
			{tasks &&
				(currentTaskView === 'all' ? (
					<TaskList
						tasks={tasks}
						deleteTask={deleteTask}
						toggleTask={toggleTask}
						enterEditMode={enterEditMode}
					/>
				) : currentTaskView === 'incomplete' ? (
					<TaskList
						tasks={tasks.filter((task) => !task.checked)}
						deleteTask={deleteTask}
						toggleTask={toggleTask}
						enterEditMode={enterEditMode}
					/>
				) : (
					<TaskList
						tasks={tasks.filter((task) => task.checked)}
						deleteTask={deleteTask}
						toggleTask={toggleTask}
						enterEditMode={enterEditMode}
					/>
				))}
		</div>
	);
}

export default App;

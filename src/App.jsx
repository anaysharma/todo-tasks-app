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
		setTasks((prevState) =>
			prevState.map((t) => (t.id === id ? { ...t, deleting: true } : t))
		);
		setTimeout(() => {
			setTasks((prevState) => prevState.filter((t) => t.id !== id));
		}, 190);
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
		document.querySelectorAll('.view-button').forEach((item) => {
			item.setAttribute('selected', 'false');
		});
		e.target.setAttribute('selected', 'true');
	};

	return (
		<div className="container">
			<header>
				<h1>{tasks.length ? 'TASKS LIST' : 'NO TASK ADDED'}</h1>
				<div className="task-view-container">
					<div className="task-button-box">
						<button
							className="btn-all view-button"
							aria-label="veiw all tasks"
							data-viewaria="all"
							onClick={handleTaskViewButtonClick}
						>
							All
						</button>
						<button
							className="btn-todo view-button"
							aria-label="veiw incomplete tasks"
							data-viewaria="incomplete"
							onClick={handleTaskViewButtonClick}
						>
							Todo
						</button>
						<button
							className="btn-done view-button"
							aria-label="veiw complete tasks"
							data-viewaria="complete"
							onClick={handleTaskViewButtonClick}
						>
							Done
						</button>
					</div>
				</div>
			</header>
			{isEditing && (
				<EditForm
					editedTask={editedTask}
					updateTask={updateTask}
					closeEditMode={closeEditMode}
				/>
			)}
			<CustomForm addTask={addTask} />

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

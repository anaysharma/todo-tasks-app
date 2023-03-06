import { useEffect } from 'react';
import { useState } from 'react';

export const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
	const [updatedTaskName, setupdatedTaskName] = useState(editedTask.name);

	useEffect(() => {
		const closeModelOnEsc = (e) => {
			e.key === 'Escape' && closeEditMode();
		};
		window.addEventListener('keydown', closeModelOnEsc);

		return () => {
			window.removeEventListener('keydown', closeModelOnEsc);
		};
	}, [closeEditMode]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateTask({ ...editedTask, name: updatedTaskName });
	};

	return (
		<div
			role="dialog"
			aria-labelledby="editTask"
			onClick={(e) => {
				e.target === e.currentTarget && closeEditMode();
			}}
		>
			<form className="editForm" onSubmit={handleFormSubmit}>
				<div className="wrapper">
					<input
						type="text"
						id="editTask"
						className="input"
						value={updatedTaskName}
						onInput={(e) => setupdatedTaskName(e.target.value)}
						required
						autoFocus
						maxLength={60}
						placeholder="Update Task"
					/>
					<label htmlFor="editTask" className="label">
						Update Task
					</label>
				</div>
				<button
					className="btn"
					aria-label={`confirm edited task to now read ${updatedTaskName}`}
					type="submit"
				>
					<i className="h h-check"></i>
				</button>
			</form>
		</div>
	);
};

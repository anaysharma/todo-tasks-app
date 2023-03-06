export const CustomForm = () => {
	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<form className="todo" onSubmit={handleFormSubmit}>
			<div className="wrapper">
				<input type="text" id="task" className="input" />
			</div>
		</form>
	);
};

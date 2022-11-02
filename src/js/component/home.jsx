import React, { useState } from "react";

//create your first component
export function Home() {
	
	const [tasklist, setTaskList] = useState([]);
	const [task, setTask] = useState("");
	const [hoverTask, setHoverTask] = useState(false);

	
	const handleOnKeyPress = e => {
		
		if (e.key === "Enter" && task !== "") {
			e.preventDefault();
			
			const newTask = {
				id: new Date().getTime(),
				description: task
			};
			
			setTaskList([...tasklist].concat(newTask));
			
			setTask("");
		} else if (e.key === "Enter" && task == "") {
			alert("The input cannot be empty");
		}
	};

	const genList = () => {
		
		return tasklist.map(task => (
			<li
				key={task.id}
				className="list-group-item"
				onMouseEnter={() => setHoverTask(task.id)}>
				<p className="d-inline-block text-secondary ml-4 fs-3 align-middle ">
					{task.description}
				</p>
				{task.id == hoverTask ? (
					<button
						type="button"
						className="delete btn text-muted"
						onClick={() => deleteTask(task.id)}>
						<i className="fa-regular fa-trash-can"></i>
					</button>
				) : null}
			</li>
		));
	};

	
	const deleteTask = id => {
		const updateTaskList = [...tasklist].filter(task => task.id !== id);
		setTaskList(updateTaskList);
	};

	
	return (
		<div className="container">
			<h1 className="title text-muted text-center">Todos</h1>
			<div className="tasker">
			<input
				type="text"
				placeholder="Type a new task"
				className="tasker2 text-muted"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyPress={e => handleOnKeyPress(e)}
			>

			</input>
			</div>
			<ul className="list-group">
				{genList()}
				<div>
					<label htmlFor="list-group-item">
						<p className="text-muted ml-5 mt-2">
							{tasklist.length == 0
								? " No tasks, add a task"
								: tasklist.length + " item left"}
						</p>
					</label>
				</div>
			</ul>
		</div>
	);
}
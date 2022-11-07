import React, { useEffect, useState } from "react";

//create your first component
export function Home() {
	
	const [tasklist, setTaskList] = useState([]);
	const [task, setTask] = useState("");
	const [hoverTask, setHoverTask] = useState(false);

	useEffect(() => {
		getTaskList();
	}, []);

	const getTaskList = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kamiwey",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setTaskList(result))
			.catch(error => console.log("error", error));
	};
	
	const handleOnKeyPress = e => {
		
		if (e.key === "Enter" && task !== "") {
			e.preventDefault();
			
			const newTask = {
				label: task,
				done: false
			};
			if (tasklist.length == 1 && tasklist [0].done == true) {
				putTaskList([newTask]);
				setTask("");
			} else {
				const updateTaskList = [...tasklist].concat([newTask]);
				setTask("");
				putTaskList(updateTaskList);
			}	
		} else if (e.key === "Enter" && task == "") {
			alert("The input cannot be empty");
		}
	};

	function putTaskList(updateTaskList) {
		var myHeaders = new Headers();
		myHeaders.append("content-Type", "application/json");
		var raw = JSON.stringify(updateTaskList);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kamiwey",
			requestOptions
		)
			.then(response => response.text())
			.then(setTaskList(updateTaskList))
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	const handleOnClickDelete = id => {
		let updateTaskList = [...tasklist];
		updateTaskList.splice(id, 1);
		if (updateTaskList.length > 0) {
			putTaskList(updateTaskList);
		} else {
			putTaskList(defTask);
		}
	};

	const defTask = [
		{
			label: 
				"No more Tasks, you are a HERO!!",
			done: true
		}
	];


	const genList = () => {
		
		return tasklist.map((task, index) => {
			return (
				<li
					key={index}
					className="list-group-item"
					onMouseEnter={() => setHoverTask(index)}>
					<p className="d-inline-block text-secondary ml-4 fs-3 align-middle">- 
						{task.label}
					</p>
					{index == hoverTask && task.done == false ? (
						<button
							type="button"
							className="delete btn text-muted"
							onClick={() => handleOnClickDelete(index)}>
							<i className="fa-regular fa-trash-can"></i>
						</button>
					) : null}
				</li>
			);
		});
	};

	
	return (
		<div className="container">
			<h1 className="title text-muted text-center">Todos</h1>
			<div className="tasker d-flex flex-row">
			<input
				type="text"
				placeholder="  Type a new task"
				className="tasker2 text-muted"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyPress={e => handleOnKeyPress(e)}
			>

			</input>
			<button
					type="button"
					className="deleteAll btn text-muted col-md-auto rounded-0"
					onClick={() => putTaskList(defTask)}>	
					All tasks 
					<i className="borratodo fa-regular fa-trash-can"></i>
				</button>


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
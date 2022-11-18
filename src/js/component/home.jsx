import React, { useEffect, useState } from "react";

//create your first component
export function Home() {
	
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const [mouseHover, setMouseHover] = useState(false);

	useEffect(() => {
		getTodoList();
	}, []);

	const PutTodoList =(updateTaskList) => {
		var myHeaders = new Headers();
		myHeaders.append("content-Type", "application/json");
		var raw = JSON.stringify(updateTaskList);
		var rawData = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kamiwey",
			rawData
		)
			.then(response => response.text())
			.then(setTodos(updateTaskList))
			.catch(error => console.error("Error", error));
	}

	const getTodoList = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
			var request = {
			method: "GET",
			headers: myHeaders,
			};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/kamiwey",
			request
		)
			.then(response => response.json())
			.then(result => setTodos(result))
			.catch(error => console.log("error", error));
	};
	
	const KeyPress = (e) => {
		
		if (e.key === "Enter" && inputValue !== "") {
			e.default();
			
			const newTodo = {
				label: task,
				done: false
			};
			if (todos.length == 1 && todos [0].done == true) {
				PutTodoList([newTodo]);
				setInputValue("");
			} else {
				const updateTaskList = [...todos].concat([newTodo]);
				setInputValue("");
				PutTodoList(updateTaskList);
			}	
		} else if (e.key === "Enter" && inputValue == "") {
			alert("Please type a task");
		}
	};

	

	const KeyPressDelete = id => {
		let updateTaskList = [...todos];
		updateTaskList.splice(id, 1);
		if (updateTaskList.length > 0) {
			PutTodoList(updateTaskList);
		} else {
			PutTodoList(TodoDefault);
		}
	};

	const TodoDefault = [
		{
			label: 
				"No more Tasks, you are a HERO!!",
			done: true
		}
	];


	const GetTodoList = () => {
		
		return todos.map((inputValue, index) => {
			return (
				<li
					key={index}
					className="list-group-item"
					onMouseEnter={() => setMouseHover(index)}>
					<p className="d-inline-block text-secondary ml-4 fs-3 align-middle">- 
						{inputValue.label}
					</p>
					{index == mouseHover && inputValue.done == false ? (
						<button
							type="button"
							className="delete btn text-muted"
							onClick={() => KeyPressDelete(index)}>
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
				placeholder="  Add your task here."
				className="tasker2 text-muted"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyPress={(e) => KeyPress(e)}
			>

			</input>
			<button
					type="button"
					className="deleteAll btn text-muted col-md-auto rounded-0"
					onClick={() => PutTodoList(defTask)}>	
					All tasks 
					<i className="borratodo fa-regular fa-trash-can"></i>
				</button>


			</div>
			<ul className="list-group">
				{GetTodoList()}
				<div>
					<label htmlFor="list-group-item">
						<p className="text-muted ml-5 mt-2">
							{todos.length == 0
								? " No tasks, add a new one."
								: todos.length + " item left"}
						</p>
					</label>
				</div>
			</ul>
		</div>
	);
}

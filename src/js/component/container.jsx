import React from "react";
import { useState, useEffect} from "react";

//create component
const Container = (props) => {
    

	const url = 'https://assets.breatheco.de/apis/fake/todos/user/vej'
	
	//hooks 
	const [taskList, setTaskList] = useState(
		[
			//{ label: "Make the bed", done: false },
			//{ label: "Walk the dog", done: false },
			//{ label: "Do the replits", done: false }
		]
	)
	const [inputItem, setInputItem] = useState('')
	
	//fetch	for GET
	const options = {
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
		
	};
	
	console.log (taskList)

	useEffect(()=>{
		fetch(url, options)
  		.then(response => response.json())
  		.then(response => setTaskList(response))
 		.catch(error => console.error(error));
	},[]
	);

	///fetch for PUT, en este caso este actua como un controlador.
	const updateList =async ()=>{
		try{
			const fetchcall = await fetch(url, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(taskList)
			})
			const response = await fetchcall.json()	
			console.log(response)		

		} catch (error) {console.log(error)}
	} 

	useEffect(()=>{
		updateList()
	},[taskList])

//funciones para todo
	const inputOnList = (e) => {
		setInputItem(e.target.value);
	};

	const whenEnter = (e) => {
		if (e.key === "Enter"){
			setTaskList(taskList.concat([{label: inputItem, done:false}]));
			
			console.log(taskList)
			setInputItem("")
		} else {null}
		
	};
	function whenclick () {
		setTaskList(taskList.concat([{label: inputItem, done:false}]));
		setInputItem("")
	}


	const deleteItem = (id) => {
		let eliminados = []
		eliminados = taskList.filter((item, index) => {
			if (index !== id){
				return item
			}
		})
		setTaskList(eliminados)
	}

	
	return (
	
		<div className="container">
			
			<h1 >Todos</h1>
				<input type="text" placeholder="What needs to be done?" onChange={inputOnList} value={inputItem} onKeyDown={whenEnter}></input>
				<button className="boton" onClick={whenclick}>Add to list</button>
				<ul>
					
					{taskList.map((task,i) => (
						<li key={i}>{task.label}
						<button onClick={()=> deleteItem(i)}> x 
						</button>
						</li>						
					)
					)}
					
				</ul>
				<div> {taskList.length} Items Left</div>
			
		</div>
	);
	
	

};

export default Container;
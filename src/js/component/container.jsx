import React from "react";
import { useState, useEffect} from "react";

//create your first component
const Container = (props) => {
    

	const url = 'https://assets.breatheco.de/apis/fake/todos/user/vej'
	
	//hooks 
	const [body, setBody] = useState(
		[
			{ label: "Make the bed", done: false },
			{ label: "Walk the dog", done: false },
			{ label: "Do the replits", done: false }
		]
	)
	const [inputItem, setInputItem] = useState('')
	
	//fetch	
	const options = {
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
		
	  };
	
	options.method = 'PUT'  
	options.body = JSON.stringify(body)

	console.log (body)

	/*EJEMPLO DE COMO USAR EL AWAIT PARA HACER EL FETCH Y CAPTURAR UN ERROR
	
	const llamadoApi = async () => {
		try {
			const fetchcall = await fetch(url, options)
			const response = await fetchcall.json()
			console.log(response)
			
		} catch (error) { console.log(error)
			
		}
		
	}*/
	
	useEffect(()=>{
		fetch(url, options)
  		.then(response => response.json())
  		.then(response => console.log(response))
 		.catch(error => console.error(error));
	/*
	SI SE USA EL AWIAT SE LLAMARIA A LA FUNCION DONDE ESTA EL AWAIT Y NO SE USARIA EL THEN
	
	llamadoApi()
	*/

	},[]
	);

//funciones para todo
	const inputOnList = (e) => {
		setInputItem(e.target.value);
	};

	const whenEnter = (e) => {
		if (e.key === "Enter"){
			setBody(body.concat([{label: inputItem, done:false}]));
			setInputItem("")
		} else {null}
		
	};
	function whenclick () {
		setBody(body.concat([{label: inputItem, done:false}]));
		setInputItem("")
	}


	const deleteItem = (id) => {
		let eliminados = []
		eliminados = body.filter((item, index) => {
			if (index !== id){
				return item
			}
		})
		setBody(eliminados)
	}

	
	return (
	
		<div className="container">
			
			<h1 >Todos</h1>
				<input type="text" placeholder="What needs to be done?" onChange={inputOnList} value={inputItem} onKeyDown={whenEnter}></input>
				<button className="boton" onClick={whenclick}>Add to list</button>
				<ul>
					
					{body.map((task,i) => (
						<li key={i}>{task.label}
						<button onClick={()=> deleteItem(i)}> x 
						</button>
						</li>						
					)
					)}
					
				</ul>
				<div> {body.length} Items Left</div>
			
		</div>
	);
	
	

};

export default Container;
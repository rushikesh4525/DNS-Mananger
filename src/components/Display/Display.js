import React, { useEffect, useState } from 'react'

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import Add from '../Add/Add';

function Display() {
    const [allTodos, setTodos] = useState([]);  //Main DNS
    
    const [currentEdit, setCurrentEdit] = useState('');     //For DNS saveing
    const [currentEditedItem, setCurrentEditedItem] = useState('');   // For adding in DNS
    const [isCompleteScreen, setIsCompleteScreen]=useState(false);  


  
   //Handle Import data JSON API
   const importData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            // Filter 
            const todoItems = data.filter(item => !item.completed);
            
  
            // Get existing DNS from local storage
            let existingTodos = JSON.parse(localStorage.getItem('todolist')) || [];
            
  
            // Add new DNS to existing todos
            existingTodos = [...existingTodos, ...todoItems];
           
  
            // Save updated DNS to local storage
            localStorage.setItem('todolist', JSON.stringify(existingTodos));
            
  
            // Update state with imported data
            setTodos(existingTodos);
           
  
            console.log('Todos added to local storage:', existingTodos);
            
        })
        .catch(error => console.error('Error:', error));
  };
  
   
  
  const clearData = () => {
    localStorage.clear();
    setTodos([]);
    
  };
  
    //Add new DNS
    const handleAddTodo = (title) => {
      let newTodoItem = { title };
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    };
  
   
    //To delete list
    const handleDeleteTodo=(index)=>{
    let reducedTodo =[...allTodos];
    reducedTodo.splice(index,1);    // remove item at specific index
  
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  
    };
  
   
  
  
    // for local storage
    useEffect(()=>{
      let savedTodo= JSON.parse(localStorage.getItem('todolist'))
    
      if(savedTodo){
        setTodos(savedTodo);
      }
     
    },[])
  
    
  
 
  
  
    //for handle edit
    const handleEdit=(ind,item)=>{
      setCurrentEdit(ind);
      setCurrentEditedItem(item);
  
    };
    const handleUpdatetitle=(value)=>{
      setCurrentEditedItem((prev)=>{
        return {...prev, title:value}
      })
  
    };
  
    //Edit Handle Button
    const handleUpdateTodo=()=>{
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
    };

  return (
    <>
    <h1>DNS Mananger</h1>
      <div className="todo-wrapper">
        <Add addTodo={handleAddTodo} />
        

   {/* Button DNS Completed and Import Data and Clear */}
  <div className="button-area">
  <div className="button-group">
    <button
      className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
      onClick={() => setIsCompleteScreen(false)}
    >
      All DNS
    </button>
  
  </div>
  <div className="button-group1">
    <button className="secondaryBtn" type="button" onClick={importData}>
      Import DNS List
    </button>
    <button className="secondaryBtn" type="button" onClick={clearData}>
      Clear All DNS
    </button>
  </div>
</div>



      {/*If we is not in Complete screen  */}
      <div className="todo-list">
      {isCompleteScreen=== false && allTodos.map((item,index)=>{
       if( currentEdit===index )
       {
        return(
          <div className="edit__wrapper" key={index}>
          <input placeholder='Updated Title' 
          onChange={(e)=>handleUpdatetitle(e.target.value)} 
          value={currentEditedItem.title} rows={4}/>
           <button type='button' onClick={handleUpdateTodo} className='primary-button'>Update</button>
          
        </div>
        )
       }
       else{
       
        return(
          <div className="todo-list-item" key={index}>
          <h4>{item.title}</h4>
          <div>

        {/*DNS Lists Delete Button  */}
        <AiOutlineDelete 
        className='icon' 
        onClick={()=>handleDeleteTodo(index)}
         title='delete?'></AiOutlineDelete>

     
        
        {/* DNS List Edit Button */}
        <AiOutlineEdit className='check-icon' 
        title='Edit?' 
        onClick={()=>handleEdit(index,item)}>
        </AiOutlineEdit>

        </div>
      </div>
        )
      }
      })}

      {/* If we are in Complete Screen */}
    
      </div>
      </div>
      </>
  )
}

export default Display

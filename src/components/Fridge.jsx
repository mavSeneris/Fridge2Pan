import React from 'react'
import { useState , useEffect} from 'react'


export default function Fridge(){

    const [inputVal, setInputVal] = useState('')
    const [items, setItems] = useState([])

    function handleInputUpdate(event){
        const rawInput = event.target.value
        const formattedInput = rawInput.charAt(0).toUpperCase() + rawInput.slice(1).toLowerCase();
        setInputVal(formattedInput)
    }

    function add(e) {
        e.preventDefault();
        if(!inputVal){
            alert('Input required')
            return
        } else if (items.includes(inputVal)){
            alert('Item already added');
            return;
        } else {
            setItems(prevItems => [...prevItems, inputVal]);
            setInputVal('');
            document.getElementById("input-field").value = "";
        }
      }

    function submitItem(e){
        e.preventDefault()
    }

    function deleteItem(item) {
        setItems(prevItems => prevItems.filter(prevItem => prevItem !== item));
    }

    const fridgeItems = items.map(item => (
        <div key={item}>
          {item}
          <button type="button" onClick={() => deleteItem(item)}>Delete</button>
        </div>
      ));


    return (
        <div>
        <form action="">
            <div>
                <h2>{inputVal ? inputVal : 'Whats on your fridge?'}</h2>
            </div>
            <div>{fridgeItems}</div>
            <input
                type="text"
                onChange={handleInputUpdate}
                id="input-field"
            />
            <button type="button" onClick={add}>Add</button>
            <button type="submit" onSubmit={submitItem}>Submit</button>
        </form>
        </div>
    )
}


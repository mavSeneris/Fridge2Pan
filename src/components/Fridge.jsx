import React from 'react'
import { useState , useEffect} from 'react'


export default function Fridge(){

    const [inputVal, setInputVal] = useState('')
    const [items, setItems] = useState([])

    function handleInputUpdate(event){
        setInputVal(event.target.value)
    }

    function addItem(e){
        e.preventDefault()
        setItems((prevItems) => {
            return [
                ...prevItems,
                inputVal
            ]
        })
        setInputVal('')
        document.getElementById("inputField").value = "";
    }

    function submitItem(e){
        e.preventDefault()
    }

    function deleteItem(item){
        setItems(prevItems => prevItems.filter(prevItem => prevItem !== item));
    }

    const fridgeItems = items.map((item) => {
        return (
            <div key={item} >{item}<button type="button" onClick={() => deleteItem(item)}>delete</button></div>
        )
    })


    return (
      <div>
        <form action="">
            <div>
                <h2>{inputVal ? inputVal : 'Whats on your fridge?'}</h2>
            </div>
            <div>
                {fridgeItems}
            </div>
            <input
                 type="text" 
                 onChange={handleInputUpdate}
                 id='inputField'
            />
            <button 
                type='button'
                onClick={addItem}
            >Add</button>
            <button
                type='button'
                onSubmit={submitItem}  
            >Submit</button>
        </form>
      </div>
    )
}


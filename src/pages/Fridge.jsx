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

    function addItem(event) {
        event.preventDefault();
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
        setInputVal("")
    }

    function submitItem(event){
        event.preventDefault()
    }

    function deleteItem(item) {
        setItems(prevItems => prevItems.filter(prevItem => prevItem !== item));
    }

    function clearAll(event){
        event.preventDefault()
        setItems([])
    }

    const fridgeItems = items.map(item => (
        <div key={item} className='fridge__items'>
          {item}
          <button type="button" onClick={() => deleteItem(item)}>Delete</button>
        </div>
      ));


    return (
        <div className="submit-wrapper">
            <div className="fridge">
                <form action="" className="fridge__form">
                    <div className="fridge__header">
                        <h2 className="fridge__title">{inputVal ? inputVal : 'Whats on your fridge?'}</h2>
                    </div>
                    <div className='fridge__controls'>
                        <input
                            type="text"
                            onChange={handleInputUpdate}
                            id="input-field"
                            className="fridge__input"
                        />
                        <button type="button" onClick={addItem} className="fridge__button fridge__button--add">Add</button>
                        <button type="button" onClick={clearAll} className="fridge__button fridge__button--clear">Clear</button>
                    </div>
                    <button type="submit" onSubmit={submitItem} className="fridge__button fridge__button--submit">Submit</button>
                    <div className="fridge__list">{fridgeItems}</div>
                </form>
            </div>
        </div>
    )
}


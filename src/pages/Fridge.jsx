import React, { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState"
import DeleteIcon from "../assets/DeleteIcon.svg"


export default function Fridge() {
  const [inputVal, setInputVal] = useState("");
  const [items, setItems] = useState([]);
  const [response, setResponse] = useState("");

  console.log('page rendered')
  function handleInputUpdate(event) {
    const rawInput = event.target.value;
    const formattedInput =
      rawInput.charAt(0).toUpperCase() + rawInput.slice(1).toLowerCase();
    setInputVal(formattedInput);
  }

  async function addItem(event) {
    event.preventDefault();
    if (!inputVal) {
      alert("Input required");
      return;
    } else if (items.includes(inputVal)) {
      alert("Item already added");
      return;
    } else {
      setItems((prevItems) => [...prevItems, inputVal]);
      setInputVal("");
    }
  }

  function submit(){
    fetchChatGPTResponse(items);
  }

  function deleteItem(item) {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  }

  function clearAll(event) {
    event.preventDefault();
    setItems([]);
  }

  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem(event);
      setInputVal("");
    }
  };

  const showButton  = {
    display: items.length > 0 ? 'block' : 'none'
    
  }
    
  const fetchChatGPTResponse = async (items) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `, // Replace with your actual API key
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You: What can I cook with " + items.join(", ") + " only." },
          { role: "user", content: "Suggest recipes" },
        ],
        model: "gpt-3.5-turbo", 
      }),
    });

    const data = await response.json();
    const message = data.choices[0]?.message?.content || "";
    setResponse(message.replace("AI:", "").trim());
  };

  useEffect(() => {submit}, [items]);
  
  console.log(response)

  const fridgeItems = items.map((item) => (
    <div key={item} className="fridge__items">
      {item}
      <button className="fridge__button--delete" type="button" onClick={() => deleteItem(item)}>
        <img className="delete-icon" src={DeleteIcon} alt="" />
      </button>
    </div>
  ));

  return (
    <section>
      <div className="fridge">
        <div className="fridge__scroll-wrapper">
          <div className="fridge__list">{fridgeItems}</div>
          {items.length < 1  && <EmptyState IngredientState={true} />}  
        </div>
        <form action="" className="fridge__form">
          <div className="fridge__controls">
            <input
              type="text"
              placeholder="What's in your fridge?"
              value={inputVal}
              onChange={handleInputUpdate}
              onKeyDown={handleKeyDown}
              id="input-field"
              className="fridge__input"
            />
            <button
              type="button"
              onClick={addItem}
              className="fridge__button fridge__button--add"
            >
            Add
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="fridge__button fridge__button--clear"
            >
            Clear
            </button>
            <button
              style={showButton}
              type="button"
              onClick={submit}
              className="fridge__button fridge__button--submit"
            >
              Look for Recipe
            </button>
          </div>
          
        </form>
      </div>
      {/* <h1>Secret key: {import.meta.env.VITE_OPENAI_KEY}</h1> */}
    </section>
  );
}

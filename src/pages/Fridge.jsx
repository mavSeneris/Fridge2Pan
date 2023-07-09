import React, { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState";
import DeleteIcon from "../assets/DeleteIcon.svg";

export default function Fridge() {
  const [inputVal, setInputVal] = useState("");
  const [items, setItems] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  function submit() {
    if (!response) {
      fetchChatGPTResponse(items);
    } else {
      fetchChatGPTResponse(["show me another recipe"]);
    }
  }

  function deleteItem(item) {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  }

  function clearAll(event) {
    event.preventDefault();
    setItems([]);
    setResponse("");
  }

  function back() {
    setResponse("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem(event);
      setInputVal("");
    }
  };

  const fetchChatGPTResponse = async (messages) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer `,
            organization: "org-2fIccQkIhVpzTF83cBXhZsHF",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You: Show me a recipe for " + items.join(", ") + " only.",
              },
              { role: "user", content: messages[0] },
            ],
            model: "gpt-3.5-turbo",
          }),
        }
      );

      const data = await response.json();
      const message = data.choices[0]?.message?.content || "";
      setResponse(message.replace("AI:", "").trim());
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    submit;
  }, [items]);

  console.log(response);

  const fridgeItems = items.map((item) => (
    <div key={item} className="fridge__items">
      {item}
      <button
        className="fridge__button--delete"
        type="button"
        onClick={() => deleteItem(item)}
      >
        <img className="delete-icon" src={DeleteIcon} alt="" />
      </button>
    </div>
  ));

  const fridgeListCard = (
    <div className="submit-wrapper">
      <div className="fridge-list-card">
        <h3 className="fridge-list__title">
          {/* *****Mav***** */}
          {!response ? "Ingredients" : "Recipe:"}
        </h3>
        {!response ? (
          <div className="fridge-list">{fridgeItems}</div>
        ) : (
          <div className="recipe">
            <p className="recipe-content">{response}</p>
          </div>
        )}
        {/* *****changes ends here***** */}
      </div>

      <div className="fridge-card-controls">
        <button
          type="button"
          onClick={submit}
          className="fridge__button fridge__button--submit"
        >
          {!response ? "Get recipe" : "New"}
        </button>

        {response && (
          <>
            <button
              type="button"
              onClick={back}
              className="fridge__button fridge__button--clear"
            >
              Back
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="fridge__button fridge__button--clear"
            >
              Discard
            </button>
          </>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-card">
        <div className="loading-text">
          <img
            src={
              "https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f9d0/u1f9d0_u1f336-ufe0f.png"
            }
          />
          <h2>Searching Recipe...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-card">
        <div className="error-text">
          <img
            src={
              "https://www.gstatic.com/android/keyboard/emojikitchen/20230301/u1f62d/u1f62d_u1f336-ufe0f.png"
            }
          />
          {/* <h3>There was an error: {error.message}</h3>; */}
          <h3>Aww... No recipe found :( </h3>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="fridge">
        {items.length == 0 ? (
          <EmptyState IngredientState={true} />
        ) : (
          fridgeListCard
        )}

        <form className="fridge__form">
          <div className="fridge__controls">
            <input
              type="text"
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
          </div>
        </form>
      </div>
      {/* <h1>Secret key: {import.meta.env.VITE_OPENAI_KEY}</h1> */}
    </section>
  );
}

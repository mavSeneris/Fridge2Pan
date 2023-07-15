import React, { useState, useEffect } from "react";
import MarkdownView from "react-showdown";
import EmptyState from "../components/EmptyState";
import ContentLoader from "../components/contentLoader"
import DeleteIcon from "../assets/DeleteIcon.svg";

export default function Fridge() {
  const [inputVal, setInputVal] = useState("");
  const [items, setItems] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_REACT_API_URL;
  const apiKey = import.meta.env.VITE_REACT_API_KEY;
  const apiOrg = import.meta.env.VITE_REACT_API_ORG;
  const apiModel = import.meta.env.VITE_REACT_API_MODEL

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

  function deleteItem(item) {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  }

  function submit() {
    if (!response) {
      fetchChatGPTResponse(items);
    } else {
      fetchChatGPTResponse(["show me another recipe"]);
    }
  }

  function clearAll(event) {
    event.preventDefault();
    setItems([]);
    setResponse("");
  }

  function back() {
    setResponse("");
    setError(false)
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
      const response = await fetch(`${apiURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          organization: `${apiOrg}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You: Show me a recipe for " +
                items.join(", ") +
                " only. Strictly in markdown format.",
            },
            { role: "user", content: messages[0] },
          ],
          model: `${apiModel}`,
        }),
      });

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

  const fridgeList = (
    <div className="fridge-list">{fridgeItems}</div>
  )
  
  const recipe = (
      <div className="recipe">
      {/* <p className="recipe-content">{response}</p> */}
        <MarkdownView
          className="markdown-component"
          markdown={response}
          // options={{
          //   tables: true,
          //   emoji: true,
          //   tasklists: true,
          //   simpleLineBreaks: true,
          // }}
        />
      </div>
  )

  const fridgeListCard = (
    <div className="submit-wrapper">
      <div className="fridge-card">
        <h3 className="fridge-card__title">
          {!response ? "Ingredients" : "Recipe:"}
        </h3>
        {!response ? fridgeList : recipe}
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
    return <ContentLoader back={back} fridgeView={true} isLoading={true}/>
  }

  if (error){
    return <ContentLoader back={back} fridgeView={true} isLoading={false}/>
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
    </section>
  );
}

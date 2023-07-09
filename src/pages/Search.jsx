import React, { useState } from "react";
import EmptyState from "../components/EmptyState";

export default function Search() {
  const [inputVal, setInputVal] = useState("");
  const [recipe, setRecipe] = useState("");
  const [response, setResponse] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const messages = [
        {
          role: "system",
          content: "You: Show me a recipe for " + inputVal,
        },
        { role: "user", content: inputVal },
      ];
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer `,
            organization: "",
          },
          body: JSON.stringify({
            messages: messages,
            model: "gpt-3.5-turbo",
          }),
        }
      );
      const data = await response.json();
      console.log(data.choices[0].message.content);
      setRecipe(data.choices[0].message.content);
      setResponse(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function handleInputUpdate(event) {
    const userInput = event.target.value;
    setInputVal(userInput);
  }

  if (loading) {
    return (
      <div className="loading-card">
        <div className="loading-text">
          <img
            src={
              "https://www.gstatic.com/android/keyboard/emojikitchen/20220815/u1f602/u1f602_u1f957.png"
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
              "https://www.gstatic.com/android/keyboard/emojikitchen/20220815/u1f97a/u1f97a_u1f957.png"
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
      <div className="search-wrapper">
        <div className="search">
          <div className="search__header">
            <h2 className="search__title"> What do you want to cook?</h2>
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                className="search-form__input"
                type="text"
                onChange={handleInputUpdate}
              />
              <button type="submit">Search</button>
            </form>
            {recipe && (
              <div className="recipe-card">
                <h3>Recipe for: {inputVal}</h3>
                {recipe}
              </div>
            )}
            {response && <EmptyState RecipeState={response} />}
          </div>
        </div>
      </div>
    </section>
  );
}

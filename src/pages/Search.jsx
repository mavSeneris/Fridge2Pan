import React, { useState } from "react";
import EmptyState from "../components/EmptyState";
import ContentLoader from "../components/contentLoader";
import MarkdownView from "react-showdown";

export default function Search() {
  const [inputVal, setInputVal] = useState("");
  const [dish, setDish] = useState("");
  const [recipe, setRecipe] = useState("");
  const [response, setResponse] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_REACT_API_URL;
  const apiKey = import.meta.env.VITE_REACT_API_KEY;
  const apiOrg = import.meta.env.VITE_REACT_API_ORG;
  const apiModel = import.meta.env.VITE_REACT_API_MODEL;

  function back(){
    setError(false)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const messages = [
      {
        role: "system",
        content:
          "You: Show me a recipe for " +
          inputVal +
          "strictly in markdown format.",
      },
      { role: "user", content: inputVal },
    ];
    setDish(inputVal);
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
          messages: messages,
          model: `${apiModel}`,
        }),
      });
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
<<<<<<< HEAD

  function saveRecipe(){
    
  }

=======
>>>>>>> 7a95512e0774f1ea9118e727a5d6221a5955ea8e
  if (loading) {
    return <ContentLoader back={back}  fridgeView={false} isLoading={true}/>
  }

  if (error){
    return <ContentLoader back={back} fridgeView={false} isLoading={false}/>
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
                {/* <h3>Recipe for {dish}:</h3> */}
                <button className="save-recipe-btn">save</button>
                <MarkdownView
                  className="markdown-component"
                  markdown={recipe}
                />
              </div>
            )}
            {response && <EmptyState RecipeState={response} />}
          </div>
        </div>
      </div>
    </section>
  );
}

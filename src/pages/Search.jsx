import React, { useState } from "react";
import EmptyState from "../components/EmptyState"


export default function Search() {
  const [inputVal, setInputVal] = useState("");
  const isRecipe = true;

  function handleInputUpdate(event) {
    const userInput = event.target.value;
    setInputVal(userInput);
  }

  return (
    <section>
      <div className="search">
        <div className="search__header">
          <h2 className="search__title"> What do you want to cook?</h2>
          <form action="">
            <input type="text" onChange={handleInputUpdate} />
            <button>Search</button>
          </form>
        </div>
        {isRecipe && <EmptyState RecipeState={true} />}
      </div>
    </section>
  );
}

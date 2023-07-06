import React from "react";
import BasketImage from "../assets/EmptyBasket.png";
import RecipeImage from "../assets/EmptyRecipe.png";

export default function EmptyState({IngredientState, RecipeState}) {
  return (
    <div className="empty-state">
      {IngredientState && <img src={BasketImage}/>}
      {RecipeState && <img src={RecipeImage}/>}
      {IngredientState && <p>No ingredients :(</p>}
      {RecipeState && <p>No recipes found :(</p>}
    </div>
  );
}
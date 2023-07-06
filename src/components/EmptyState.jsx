import React from "react";
import BasketImage from "../assets/EmptyBasket.png";
import RecipeImage from "../assets/EmptyRecipe.png";

export default function EmptyState({IngredientState, RecipeState}) {
  return (
    <div className="empty-state">
      {IngredientState && <img src={BasketImage} alt="Basket" className="empty-state__image empty-state__image--basket" />}
      {RecipeState && <img src={RecipeImage} alt="Recipe" className="empty-state__image empty-state__image--recipe" />}
      {IngredientState && <p className="empty-state__ingredients-message">Your basket is <span className="empty-message">Empty</span></p>}
      {IngredientState && <p className="empty-state__ingredients-message">Add items to get started</p>}
      {RecipeState && <p className="empty-state__message">No recipes found :(</p>}
    </div>
  );
}
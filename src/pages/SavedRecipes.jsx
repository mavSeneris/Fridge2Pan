import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";

export default function SavedRecipe() {
  const [saveRecipes, setSaveRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = auth.currentUser.displayName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "recipes", "recipes");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // console.log("Retrieved data:", data); 
          setSaveRecipes(data.recipes);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRecipes = saveRecipes.filter(
    (recipe) => recipe.uid === auth.currentUser.uid
  );

  const saveRecipeEls = filteredRecipes.map((recipe) => (
    <div key={recipe.recipeId} className="saved-recipe-card">
      <Link to={`/saved-recipes/${recipe.recipeId}`}>
        <h3>{recipe.name}</h3>
      </Link>
    </div>
  ));

  return (
    <div className="saved-recipe">
      <h2>{username}'s Saved recipes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="saved-recipe-wrapper">{saveRecipeEls}</div>
      )}
    </div>
  );
}

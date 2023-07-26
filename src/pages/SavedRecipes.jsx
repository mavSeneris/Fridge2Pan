import React, { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";

export default function SavedRecipe() {
  const [saveRecipes, setSaveRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [editedRecipeName, setEditedRecipeName] = useState(""); // State to store edited recipe name
  const [editedRecipeId, setEditedRecipeId] = useState(null); // State to store the recipe ID being edited
  const username = auth.currentUser.displayName;

  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "recipes", "recipes");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
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

  const handleDelete = async (recipeId) => {
    try {
      const docRef = doc(db, "recipes", "recipes");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedRecipes = data.recipes.filter(
          (recipe) => recipe.recipeId !== recipeId
        );

        await deleteDoc(docRef);
        await setDoc(docRef, { recipes: updatedRecipes });
        setSaveRecipes(updatedRecipes);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  const handleEdit = async (recipeId) => {
    try {
      const docRef = doc(db, "recipes", "recipes");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedRecipes = data.recipes.map((recipe) => {
          if (recipe.recipeId === recipeId) {
            return { ...recipe, name: editedRecipeName };
          }
          return recipe;
        });

        await deleteDoc(docRef);
        await setDoc(docRef, { recipes: updatedRecipes });
        setSaveRecipes(updatedRecipes);
        setEditedRecipeId(null); // Reset the edited recipe ID to null after saving
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error updating recipe:", error);
    }
  };

  const handleCancelEdit = () => {
    // Reset the edited recipe name and exit edit mode
    setEditedRecipeName("");
    setEditedRecipeId(null);
  };

  const filteredRecipes = saveRecipes.filter(
    (recipe) => recipe.uid === auth.currentUser.uid
  );

  const saveRecipeEls = filteredRecipes.map((recipe) => (
    <div key={recipe.recipeId} className="saved-recipe-card">
      {editedRecipeId === recipe.recipeId ? (
        // If the recipe is being edited, show the input field and "Save" and "Cancel" buttons
        <>
          <input
            type="text"
            value={editedRecipeName}
            onChange={(e) => setEditedRecipeName(e.target.value)}
          />
          <button onClick={() => handleEdit(recipe.recipeId)}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        // If the recipe is not being edited, show the recipe name and the "Edit" button
        <>
          <Link to={`/saved-recipes/${recipe.recipeId}`}>
            <h3>{recipe.name}</h3>
          </Link>
          <button onClick={() => setEditedRecipeId(recipe.recipeId)}>Edit</button>
        </>
      )}

      <button className="saved-recipes-btn" onClick={() => handleDelete(recipe.recipeId)}>DELETE</button>
    </div>
  ));

  return (
    <div className="saved-recipe">
      <h2>{capitalizedUsername}'s Saved recipes</h2>
      <Link to="/">	&larr; Back to Homepage</Link>
      {loading ? (
        <p>Loading...</p>
      ) : saveRecipeEls.length > 0 ? (
        <div className="saved-recipe-wrapper">{saveRecipeEls}</div>
      ) : (
        <p>No saved recipes found.</p>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useParams } from "react-router-dom";
import MarkdownView from "react-showdown";

export default function SaveRecipeDetail() {
  const [saveRecipe, setSaveRecipe] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "recipes", "recipes");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // console.log("Retrieved data:", data);
          setSaveRecipe(data.recipes);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, []);

  const saveRecipeEls = saveRecipe.map((item) => {
    if (id === item.recipeId) {
      return (
        <div key={item.recipeId} className="save-recipe-wrapper">
          <MarkdownView className="markdown-component" markdown={item.recipe} />
        </div>
      );
    }
  });

  return <div>{saveRecipeEls}</div>;
}

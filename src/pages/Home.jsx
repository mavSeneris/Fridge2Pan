import React, { useEffect, useState } from "react";
import MealTime from "../components/MealTime";
import { auth } from "../firebase";
import { useOutletContext } from "react-router-dom";


export default function Home({btnDarkTheme}) {
  const [displayName, setDisplayName] = useState("");


  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName);
    }
  }, []);

  const capitalizedUsername =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <section>
      <div className="hero">
        {!displayName ? (
          <h2>Introducing Fridge2Pan</h2>
        ) : (
          <h2>Welcome {capitalizedUsername}!</h2>
        )}
        <p>
          Your ultimate recipe and meal planning app! Discover recipes, search
          by available ingredients in your fridge, and efficiently plan your
          meals. Reduce food waste and improve your cooking with Fridge2Pan.
        </p>
        <MealTime btnDarkTheme={btnDarkTheme}/>
      </div>
    </section>
  );
}

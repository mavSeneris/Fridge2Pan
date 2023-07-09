import React from "react";
import MealTime from '../components/MealTime';

export default function Home() {
  return (
    <section>
      <div className="hero">
        <h2>Introducing Fridge2Pan </h2>
        <p>
          Your ultimate recipe and meal planning app! Discover recipes, search
          by available ingredients in your fridge, and efficiently plan your
          meals. Reduce food waste and improve your cooking with Fridge2Pan.
          Download now and embark on a culinary adventure!
        </p>
        <MealTime/>
      </div>
    </section>
  );
}

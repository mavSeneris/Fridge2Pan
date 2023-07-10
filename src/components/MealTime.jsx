import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MealTime = () => {
  const [meal, setMeal] = useState("");

  useEffect(() => {
    const getCurrentMeal = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= 5 && currentHour < 11) {
        setMeal("Breakfast");
      } else if (currentHour >= 11 && currentHour < 17) {
        setMeal("Lunch");
      } else if (currentHour >= 17 || currentHour < 5) {
        setMeal("Dinner");
      }
    };

    getCurrentMeal();

    const intervalId = setInterval(getCurrentMeal, 60000); // Update every minute

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <div>
      <Link to="meal" className="meal-button">
        Try this for {meal}!
      </Link>
    </div>
  );
};

export default MealTime;

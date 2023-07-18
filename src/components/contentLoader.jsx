import React from "react";

export default function contentLoader(props) {
  console.log(props);

  const loadingRow = (
    <div class="load-row">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

  const loadingState = (
    <div className="loading-card">
      <div className="loading-text">
        {loadingRow}
        <h2>Searching Recipe...</h2>
      </div>
    </div>
  );

  const errorState = (
    <div className="error-card">
      <div className="error-text">
        <h3>Aww... No recipe found :( </h3>
        <button className="fridge__button" onClick={props.back}>
          Back
        </button>
      </div>
    </div>
  );
  return <>{props.isLoading ? loadingState : errorState}</>;
}

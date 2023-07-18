import React from "react"

export default function contentLoader(props){
  console.log(props)

  const fridgeLoadingImg = [
    "https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f9d0/u1f9d0_u1f336-ufe0f.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20230301/u1f62d/u1f62d_u1f336-ufe0f.png"
  ]
  const searchLoadingImg = [
    "https://www.gstatic.com/android/keyboard/emojikitchen/20220815/u1f602/u1f602_u1f957.png",
    "https://www.gstatic.com/android/keyboard/emojikitchen/20220815/u1f97a/u1f97a_u1f957.png"
  ]

  const loadingRow = (
    <div class="load-row">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </div>
  )

      const loadingState = (
        <div className="loading-card">
            <div className="loading-text">
              {loadingRow}
              <h2>Searching Recipe...</h2>
            </div>
          </div>
    )
    
    const errorState = (
        <div className="error-card">
            <div className="error-text">
              <img
                src={props.fridgeView ? fridgeLoadingImg[1] : searchLoadingImg[1]}
              />
              {/* <h3>There was an error: {error.message}</h3>; */}
              <h3>Aww... No recipe found :( </h3>
                <button
                  className="fridge__button"
                  onClick={props.back}
                >
                  Back
                </button>
            </div>
          </div>
    )
    return (
      <>
       {props.isLoading ? loadingState : errorState}
      </>
    )
}
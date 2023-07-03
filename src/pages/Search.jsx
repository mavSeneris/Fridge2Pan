import React, {useState}  from "react";

export default function Search(){
    const [inputVal, setInputVal] = useState('')

    function handleInputUpdate(event){
        const userInput = event.target.value
        setInputVal(userInput)
    }

    return (
        <div className="search">
            <div className="search__header">
                <h2 className="search__title"> What do you want to cook?</h2>
                <form action="">
                    <input 
                        type="text" 
                        onChange={handleInputUpdate}
                    />
                    <button>Search</button>
                </form>
            </div>
        </div>
    )
}
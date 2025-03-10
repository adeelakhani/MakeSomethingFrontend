export default function IngredientsList(props) {
    return (
        <>
            <ul className="ingredientsList">{props.ingredientsLists}</ul>
            {props.numIngredients > 0 ?(
            <div className="readyBox" ref={props.ref}>
                <h1>Ready to submit? (May take a couple seconds to load)</h1>
                <button onClick={props.showRecipe}>See recipe</button>
            </div>):(
            <div className="readyBox">
                <h1 id="notReady">Enter some ingredients to see a recipe!</h1>
            </div>)
            }
            
        </>
        
    )
}
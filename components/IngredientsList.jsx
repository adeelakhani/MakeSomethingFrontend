import { TbChefHat, TbLoader } from "react-icons/tb";

export default function IngredientsList(props) {
    return (
        <>
            <ul className="ingredientsList">{props.ingredientsLists}</ul>
            {props.numIngredients > 0 ? (
                <div className="readyBox" ref={props.ref}>
                    <div className="readyBox-content">
                        <TbChefHat className="readyBox-icon" />
                        <h1>Ready to create something delicious?</h1>
                        <p>We'll generate a recipe using your ingredients. This may take a few seconds.</p>
                    </div>
                    <button 
                        onClick={props.showRecipe} 
                        disabled={props.isLoading}
                        className={props.isLoading ? 'loading' : ''}
                    >
                        {props.isLoading ? (
                            <>
                                <TbLoader className="spinning" />
                                Creating Recipe...
                            </>
                        ) : (
                            'Generate Recipe'
                        )}
                    </button>
                </div>
            ) : (
                <div className="readyBox">
                    <div className="readyBox-content">
                        <TbChefHat className="readyBox-icon" />
                        <h1 id="notReady">Start by adding some ingredients!</h1>
                        <p>Add ingredients to your list and we'll create a delicious recipe for you.</p>
                    </div>
                </div>
            )}
        </>
    );
}
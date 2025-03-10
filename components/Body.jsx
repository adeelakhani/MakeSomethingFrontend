import { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import axios from "axios";

export default function Body() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const scrollSection = useRef(null);


  useEffect(() => {
    if(recipe && scrollSection.current){
        scrollSection.current.scrollIntoView({behavior: "smooth"});
    }
  },[recipe]);
  const ingredientsLists = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  let numIngredients = ingredients.length;
  function handleSubmitting(formData) {
    const getIngredient = Object.fromEntries(formData);
    setIngredients((prev) => [...prev, getIngredient.ingredient]);
  }
  async function showRecipe(){
    const getRecipe = await axios.post("https://makesomethingbackend-1.onrender.com/api/getrecipe", {ingredients});
    setRecipe(getRecipe.data.recipe);
  }
  function reset(e){
    e.preventDefault();
    setIngredients([]);
    setRecipe("");
  }
  return (
    <main>
      <form action={handleSubmitting} className="body">
        <input
          type="input"
          name="ingredient"
          aria-label="add an ingredient"
          placeholder="e.g. cheese"
        />
        <button>+ Add Ingredient</button>
        <button onClick={reset}>Reset</button>
      </form>
      <section>
        <h2 className="ingredientsHeader">Ingredients(so far)</h2>
        <IngredientsList ref={scrollSection} ingredientsLists={ingredientsLists} numIngredients={numIngredients} showRecipe={showRecipe} />
      </section>
      <section aria-live="polite">
        <Recipe recipe={recipe} />
      </section>
      
      
    </main>
  );
}

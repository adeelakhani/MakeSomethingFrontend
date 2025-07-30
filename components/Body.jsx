import { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe";
import axios from "axios";
import { TbPlus, TbRefresh, TbLoader } from "react-icons/tb";

export default function Body() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const getRecipe = await axios.post("https://makesomethingbackend-1.onrender.com/api/getrecipe", {ingredients});
      setRecipe(getRecipe.data.recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setIsLoading(false);
    }
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
          placeholder="e.g. chicken, rice, tomatoes..."
        />
        <button type="submit">
          <TbPlus />
          Add Ingredient
        </button>
        <button onClick={reset} type="button">
          <TbRefresh />
          Reset
        </button>
      </form>
      
      <section>
        <h2 className="ingredientsHeader">Your Ingredients</h2>
        <IngredientsList 
          ref={scrollSection} 
          ingredientsLists={ingredientsLists} 
          numIngredients={numIngredients} 
          showRecipe={showRecipe}
          isLoading={isLoading}
        />
      </section>
      
      <section aria-live="polite">
        <Recipe recipe={recipe} />
      </section>
    </main>
  );
}

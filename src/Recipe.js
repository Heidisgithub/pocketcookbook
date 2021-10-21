import { useParams } from "react-router-dom";
import { useState, useEffect, setPage } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function Recipe() {
  let { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const query = `
        {
            receipe(id: "${recipeId}"){
              sys{id}
              name
              course
              instructions
              picture {url}
              ingredients {json}
            }
          }
        `;
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/ol9s80ljg83u/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer 6DE_q2O6hOkSWOrOL7qZAEDHlcSHWDvL0PsiSbcuzPM",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setRecipe(data.receipe);
        console.log(data);
      });
  }, []);
  if (!recipe) {
    return "Loading";
  }

  return (
    <div className="container">
      <h2>{recipe.name}</h2>
      <img className="recipeImg"src={recipe.picture.url} />
      <div>
      <h2>Ingredients</h2>
      {documentToReactComponents(recipe.ingredients.json)}
      </div>
      <p className="instructions">{recipe.instructions}</p>
      <footer className="footer">
        <div><strong>HARE Kitchen</strong></div>
        <div>Copyright ©HARE Kitchen. All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default Recipe;

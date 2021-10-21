import { useState, useEffect} from 'react';
import {
  Link,
} from "react-router-dom";


const query=`
{receipeCollection{items{
  sys {id}
  name,
  instructions,
  course,
  picture {url},
  ingredients{json}
}}}`

function RecipeList(){
    const [recipe, setRecipe]=useState(null)

    useEffect(() => {
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
            setRecipe(data.receipeCollection.items);
          });
      }, []);
      if (!recipe){
        return'Loading'
      }
return(
    <div>
        <ul className="ingredients">
          {
           recipe.map((r) => {
             return( <li key={r.sys.id}>
               <Link to={`/recipe/${r.sys.id}`}>{r.name}</Link></li>
               )}) 
          }
        </ul>
      </div>
)
}

export default RecipeList
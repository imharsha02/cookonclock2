import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import useForm from "../hooks/useForm";
import {Button} from '../components/ui/button'

function validate(values) {
  let nameRule = /^[a-z A-Z]([-']?[a-z A-Z]+)*( [a-z A-Z]([-']?[a-z A-Z]+)*)*$/;
  let errors = {};
  if (!values.item) {
    errors.item = "Enter an ingredient or food item to search for";
  } else if (!nameRule.test(values.item)) {
    errors.item = "item is invalid";
  }
  return errors;
}
function RecipeList(props) {
  const [res, setRes] = useState({});
  const [error, setError] = useState("");
  const [searchState, setSearchState] = useState("toSearch");
  const [mostSearched, setMostSearched] = useState([]);
  const getData = async () => {
    setSearchState("loading");
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${values.item}&app_id=67e0e669&app_key=401c79fd1cbca14687587eea063de9ae&ingr=1-8`
    )
      .then((response) => {
        setSearchState("success");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRes(data);
      })
      .catch((error) => {
        setSearchState("error");
        setError(`${error}`);
      });
  };
  const { values, errors, handleSubmit, handleChange } = useForm(
    getData,
    validate
  );
  console.log(errors.item);

  const fetchRecipes = async () => {
    await fetch("/api/newUser/most")
      .then((res) => res.json())
      .then((data) => {
        setMostSearched(data.data);
      });
  };

  useEffect(() => {
    if (res && values && values.item) {
      fetch(`/api/newUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ name: values.item }),
      }).then((res) => {
        return res.json();
      });
    }
  }, [res, values]);
  useEffect(() => {
    fetchRecipes();
  }, []);
  console.log(mostSearched);
  return (
    <>
      <h1 className="text-6xl font-black text-center p-12">
        Cook on Clock: Online recipe app
      </h1>
      <div className="m-12">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center space-x-4"
        >
          <input
            className="px-4 py-2 w-80 border-2 rounded-md"
            name="item"
            placeholder="pizza"
            value={values.item || ""}
            onChange={handleChange}
          ></input>
          {errors.item && (
            <h4 className="text-red-600 text-sm">{errors.item}</h4>
          )}
          <button
            type="submit"
            className="bg-pink-200 p-2 hover:bg-pink-100 rounded-md"
          >
            Go
          </button>
        </form>
      </div>
      {searchState !== "toSearch" &&
        (Object.keys(res).length == 0 ? (
          error == "" ? (
            <>
              <p className="text-center font-bold text-4xl">LOADING...</p>
            </>
          ) : (
            <p>{error}</p>
          )
        ) : (
          <div>
            {console.log(res)}
            {res.hits && res.hits.length > 0 && (
              <div className="flex flex-wrap gap-8 justify-around">
                {res.hits.map((obj) => (
                  <div key={obj.recipe.url}>
                    <RecipeCard obj={obj} />{" "}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default withRouter(RecipeList);

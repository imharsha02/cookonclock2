import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import useForm from "../hooks/useForm";
import { Button } from "../components/ui/button";
import { TypographyH2 } from "../components/ui/typographyH2";
import { TypographyH3 } from "../components/ui/TypographyH3";
import { Input } from "../components/ui/input";
import { TypographyH4 } from "../components/ui/typographyH4";

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
function RecipeList() {
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
    <div className="max-w-7xl mx-auto my-20 space-y-5">
      <TypographyH2>Cook on Clock: Online recipe app</TypographyH2>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center space-x-4"
      >
        <Input
          name="item"
          placeholder="pizza"
          value={values.item || ""}
          onChange={handleChange}
        />
        <Button type="submit">Go</Button>
      </form>
        {errors.item && <TypographyH4>{errors.item}</TypographyH4>}

      {searchState !== "toSearch" &&
        (Object.keys(res).length == 0 ? (
          error == "" ? (
            <>
              <TypographyH3>LOADING...</TypographyH3>
            </>
          ) : (
            <TypographyH4>{error}</TypographyH4>
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
    </div>
  );
}

export default withRouter(RecipeList);

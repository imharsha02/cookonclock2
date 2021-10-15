import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function CookingApp() {
const api_id = "67e0e669";
const api_key = "401c79fd1cbca14687587eea063de9ae";
  const [searchedDish, setSearchedDish] = useState("");
  const [dish, setDish] = useState();
  const handleChange = (e) => {
    setSearchedDish(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDish(searchedDish);
  };

  const fetchData=async () => {
    let req = await fetch(`https://api.edamam.com/search?app_id=${api_id}&app_key=${api_key}&q=${dish}`);
    let parsedRequest = await req.json();
    let IngredientsList=parsedRequest.hits.map((recipe) => {
      return (
        recipe.ingredientLines
      )
    })
  }

  const result= fetchData();

  return (
    <>
      <Head>
        <title>Ingredients Quantity</title>
        <meta charSet="utf-8" />
      </Head>
      <div className={styles.header}>
        <h1>Cook on Clock</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name of Dish"
              onChange={handleChange}
              value={searchedDish}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className={styles.body}>
        <p>{result}</p>
      </div>
    </>
  );
}
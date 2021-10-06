import Head from "next/head";
import { useState } from "react";
import Recipes from "../components/Recipies";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function CookingApp({ foodDish }) {
  const [searchedDish, setSearchedDish] = useState("");
  const [dish, setDish] = useState();
  const handleChange = (e) => {
    setSearchedDish(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDish(searchedDish);
  };
  return (
    <>
      <Head>
        <title>Ingredients Quantity</title>
        <meta charSet="utf-8" />
      </Head>
      <div className={styles.header}>
        <h1>Ingredient Quantity</h1>
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
        <h2>
          <Recipes recipe={foodDish.hits[1].label} />
        </h2>
        <Recipes
          recipe={foodDish.hits[1].recipe.ingredientLines.map((ingredient) => {
            return <p key={ingredient}>{ingredient}</p>;
          })}
        />
        Click to go to procedure:{" "}
        <Link href={`${foodDish.hits[0].recipe.url}`}>
          <a target="_blank">{`${foodDish.hits[1].recipe.url}`}</a>
        </Link>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const api_id = "67e0e669";
  const api_key = "401c79fd1cbca14687587eea063de9ae";
  const response = await fetch(
    `https://api.edamam.com/search?app_id=${api_id}&app_key=${api_key}&q=chapati`
  );
  const data = await response.json();
  console.log(data);
  return {
    props: {
      foodDish: data,
    },
  };
}

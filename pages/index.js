import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
export default function CookingApp(){
const [searchedDish,setSearchedDish]=useState('');
const [dish,setDish] = useState();
const handleChange = (e) => {
  setSearchedDish(e.target.value)
}
const handleSubmit = (e) =>{
  e.preventDefault();
  setDish(searchedDish);

}
  return (
    <>
      <Head>
        <title>Ingredients Quantity</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous"/>
      </Head>
      <div className={styles.header}>
        <div  className={styles.mainHeading}>
          <h1>
            Ingredient Quantity
          </h1>
        </div>
        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} placeholder="Dish name" value={searchedDish}/>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <p>{dish}</p>
    </>
  )
}
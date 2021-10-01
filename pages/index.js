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
      <div className={styles.header}>
        <div  className={styles.mainHeading}>
          <h1>
            Ingredient Quantity
          </h1>
        </div>
        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={searchedDish}/>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <p>{dish}</p>
    </>
  )
}
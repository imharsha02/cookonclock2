import styles from '../styles/Home.module.css'
export default function CookingApp(){
  return (
    <>
      <div className={styles.header}>
        <div  className={styles.mainHeading}>
          <h1>
            Ingredient Quantity
          </h1>
        </div>
        <div className={styles.search}>
          <form>
            <input type="text"/>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </>
  )
}
import styles from '../styles/Home.module.css'
export default function CookingApp(){
  return (
    <>
      <div className={styles.header}>
        <h1>Ingredient Quantity</h1>
        <div className={styles.search}></div>
      </div>
    </>
  )
}
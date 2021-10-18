import styles from '../styles/MiniProject.module.css'
import { useState } from 'react'
import SignUp from '../components/SignUp';
import { useRouter } from 'next/router';
export default function CookOnClock() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const [dish, setDish] = useState();
  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setDish(input);
    router.push({
      pathname:'/Home',
      query:{q:input}
    });

  }

  return (
    <>
      <div className={styles.header}>
        <h1>Cook on Clock</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Dish..." onChange={handleChange} value={input} />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className={styles.body}>
        <SignUp />
      </div>
    </>
  )
}
import styles from '../styles/signup.module.css'
export default function SignUp() {
    return (
        <>
            <div className={styles.header}>
                <h1>Cook on Clock</h1>
                <form>
                    <label>
                        Username:
                        <input type="text" />
                    </label>
                    <label>
                        Password:
                        <input type="password" />
                    </label>
                </form>
            </div>
        </>
    )
}
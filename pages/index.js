import styles from '../styles/signup.module.css'
export default function SignUp() {
    return (
        <>
            <div className={styles.header}>
                <h1>Cook on Clock</h1>
                <form>
                    <label>
                        <b>Username:</b>
                        <input type="text" />
                    </label>
                    <label>
                        <b>Password:</b>
                        <input type="password" />
                    </label>
                    <button>Sign in</button>
                </form>
            </div>

            <form className={styles.body}>
                <label>
                    Name: <input type="text"/>
                </label>
                <label>
                    Phone: <input type="text"/>
                </label>
                <label>
                    Email: <input type="email" placeholder="harsha@gmail.com"/>
                </label>
                <label>
                    Create Password: <input type="password"/>
                </label>
                <label>
                    Confirm password: <input type="password"/>
                </label>
                <button>Sign Up</button>
            </form>
        </>
    )
}
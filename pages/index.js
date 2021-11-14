// Import statements below
import styles from '../styles/signup.module.css'
import react, {useState} from 'react'
import {useRouter} from 'next/router'
//Start of component below
export default function SignUp() {
    //State variables and hooks below
    const router = useRouter();
    const [userName,setUserName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState();
    const [email,setEmail] = useState('');
    const [createPassword,setCreatePassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [storeSignupDetails,setStoreSignupDetails] = useState({});

    //Creating change handeling functions below
    function handleNameChange(e){
        setUserName(e.target.value)
    }
    function handleConfirmPassword(e){
        setConfirmPassword(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    function handleCreatingPassword(e){
        setCreatePassword(e.target.value)
    }
    function handlePhoneNumberChange(e){
        setPhoneNumber(e.target.value)
    }

    //Handling submit below
    function handleSubmit(e){
        e.preventDefault();
        let storedPassword='';
        if(createPassword===confirmPassword){
            storedPassword=confirmPassword
            router.push('/Home')
        }
        setStoreSignupDetails({
            personName:userName,
            personPhoneNumber:phoneNumber,
            personEmail:email,
            personPassword:storedPassword
        })
    }

    //Returning jsx below
    return (
        <>
            <div className={styles.header}>
                <h1>Cook on Clock</h1>
                {/*Sign in form below*/}
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
            {/*Sign up form below*/}
            <form className={styles.body} onSubmit={handleSubmit}>
                <label>
                    Name: <input type="text" value = {userName} onChange={handleNameChange}/>
                </label>
                <label>
                    Phone: <input type="text" value = {phoneNumber} onChange={handlePhoneNumberChange}/>
                </label>
                <label>
                    Email: <input type="email" placeholder="harsha@gmail.com" value = {email} onChange={handleEmailChange}/>
                </label>
                <label>
                    Create Password: <input type="password" value = {createPassword} onChange = {handleCreatingPassword}/>
                </label>
                <label>
                    Confirm password: <input type="password" value = {confirmPassword} onChange = {handleConfirmPassword}/>
                </label>
                <button>Sign Up</button>
            </form>
            <h1>{storeSignupDetails.personName}</h1>
            <h1>{storeSignupDetails.personPhoneNumber}</h1>
            <h1>{storeSignupDetails.personEmail}</h1>
            <h1>{storeSignupDetails.personPassword}</h1>
        </>
    )
}
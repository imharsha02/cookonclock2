// Import statements below

import styles from '../styles/indexpageStyles.module.css'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'

//Start of component below

export default function SignUp() {

    //State variables and hooks below

    const router = useRouter();
    const [form,setForm]= useState([{userName:'', phoneNumber:'', emailAddress:'', Password:'', confirmPassword:''},]);
    const [issubmited,setIsSubmited]=useState(false); 
    const [errors,setErrors]=useState({})

    useEffect(()=>{
        if(issubmited){
            if(Object.keys(errors).length===0){
                //addNewUser();
                alert("welcome user")
            }
            else{
                setIsSubmited(false)
            }
        }
    },[errors])

    function handleSubmit(e){
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmited(true);
    }
    function handleChange(e){
        setForm({
            ...form, [e.target.name]:e.target.value,
        })
    }
    function validate(){
        let err = {}
        if(!form.userName){
            err.userName="Enter a user name"
        }
        if(!form.phoneNumber){
            err.phoneNumber="Enter a phone number"
        }
        if(!form.emailAddress){
            err.emailAddress="Enter an email address"
        }
        if(!form.Password){
            err.Password="Enter a password with atleast 8 characters"
        }
        if(form.Password){
            if(form.confirmPassword!=form.Password){
                err.confirmPassword="Please make sure that both the passwords match so that you can sign up"
            }
        }
        return err;
    }

    return (
        <div>
            <Head>
                <title>CookonClock</title>
            </Head>
            <h1>Sign up to cook on clock</h1>
            <div style={{"textAlign":"center"}}>
                {
                     issubmited?router.push("/Home"):<form style={{"display":"grid", }} onSubmit={handleSubmit}>
                         <label style={{"margin":"5px"}}>
                            userName: <input type="text" name="userName" onChange = {handleChange}/>
                         </label>
                         <label style={{"margin":"5px"}}>
                            phoneNumber: <input type="text" name="phoneNumber" onChange = {handleChange}/> 
                         </label>
                         <label style={{"margin":"5px"}}>
                             Email: <input type="email" name="emailAddress" onChange = {handleChange}/>
                         </label>
                         <label style={{"margin":"5px"}}>
                             Password: <input type="password" name="loginPassword"  onChange = {handleChange}/>
                         </label>
                         <label style={{"margin":"5px"}}>
                             Confirm password: <input type="password" name="confirmPassword" onChange = {handleChange}/>
                         </label>
                         <button type="submit" style={{"maxWidth":"100px","padding":"10px", "marginLeft":"920px", "marginRight":"920px"}}>Sign UP</button>
                     </form>
                }
            </div>
        </div>
    )
}
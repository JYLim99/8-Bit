import React, { useRef, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch(error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                case "auth/email-already-exists":
                    setError(error.message);
                    break;
                case "auth/weak-password":
                    setError("Password must be at least six characters");
                    break;
                default:
            }
        }
        setLoading(false);
    }

    return (
        <div className={ styles.signUpContainer }>
            <form className= { styles.signUpForm } onSubmit={ handleSubmit }>
                <h2 className={ styles.header }> Join Us </h2>
                <input className={ styles.signUpInput } type="text" ref={ emailRef } placeholder="Email address" required /> 
                <br></br>
                <input className={ styles.signUpInput } type="password" ref={ passwordRef } placeholder="Password" required />
                <br></br>
                <button className={ styles.button }disabled={ loading } type="submit"> Sign Up </button>
                <p className={ styles.errorMsg }> { error } </p>
                <div className={ styles.redirect }>
                    <Link to="/Login" className={ styles.linkLogin }> Login </Link>
                </div>
            </form>
        </div>
    );
}
 
export default SignUp;
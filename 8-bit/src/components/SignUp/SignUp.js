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
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <>
            <form className= { styles.signUpForm } onSubmit={ handleSubmit }>
                <label for="email"> Email address: </label>
                    <input type="text" ref={ emailRef } placeholder="example@gmail.com" required /> 
                    <br></br>
                <label for="password"> Password: </label>
                    <input type="password" ref={ passwordRef } placeholder="At least six characters" required />
                    <br></br>
                <button disabled={ loading } type="submit"> Sign Up </button>
            </form>
            <p className={ styles.errorMsg }> { error } </p>
            <div className={ styles.redirect }>
                Already have an account? <Link to="/Login" className={ styles.linkLogin }> Login now! </Link>
            </div>
        </>
    );
}
 
export default SignUp;
import React, { useRef, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch(error) {
            switch (error.code) { 
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setError(error.message);
                    break;
                case "auth/wrong-password":
                    setError(error.message);
                    break;
                default:
            }
        }
        setLoading(false);
    }

    return (
        <>
            <form className= { styles.loginForm } onSubmit={ handleSubmit }>
                <label for="email"> Email address: </label>
                    <input type="text" ref={ emailRef } placeholder="example@gmail.com" required /> 
                    <br></br>
                <label for="password"> Password: </label>
                    <input type="password" ref={ passwordRef } required />
                    <br></br>
                <button disabled={ loading } type="submit"> Login </button>
            </form>
            <p className={ styles.errorMsg }> { error } </p>
            <div className={ styles.redirect }>
                No account? <Link to="/SignUp" className={ styles.linkSignUp }> Sign up now! </Link>
            </div>
        </>
    );
}
 
export default Login;
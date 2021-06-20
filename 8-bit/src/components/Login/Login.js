import React, { useRef, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import Google from '../../images/Google.png';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, googleLogin } = useAuth();
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

    async function handleGoogleLogin(event) {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await googleLogin();
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
        <div className={ styles.Container }>
            <form className= { styles.loginForm }>
                <h2 className={ styles.header }> Welcome back </h2>
                <input className={ styles.loginInput } type="text" ref={ emailRef } placeholder="Email address" required /> 
                <input className= { styles.loginInput } type="password" ref={ passwordRef } placeholder="Password"required />
                <button className= { styles.loginButton } disabled={ loading } onClick={ handleSubmit }> Login </button>
                <p className={ styles.errorMsg }> { error } </p>
                <Link to="/ForgetPassword" className={ styles.forgetPassLink }> Forgot Password </Link>
                <div className={ styles.googleBlock }>
                    <span className={ styles.googleTag }> Or sign in with </span>
                    <img 
                        className={ styles.googleIcon } 
                        src={ Google } 
                        alt="Google icon" 
                        onClick={ handleGoogleLogin }> 
                    </img>
                </div>
                <Link to="/SignUp" className={ styles.signUpLink }> Sign up </Link>
            </form>
        </div>
    );
}
 
export default Login;
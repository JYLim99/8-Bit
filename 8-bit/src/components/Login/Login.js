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
        <div className={ styles.Container }>
            <form className= { styles.loginForm } onSubmit={ handleSubmit }>
                <h2 className={ styles.header }> Welcome back </h2>
                <input className={ styles.loginInput } type="text" ref={ emailRef } placeholder="Email address" required /> 
                <input className= { styles.loginInput } type="password" ref={ passwordRef } placeholder="Password"required />
                <button className= { styles.loginButton } disabled={ loading } type="submit"> Login </button>
                <p className={ styles.errorMsg }> { error } </p>
                <Link to="/ForgetPassword" className={ styles.forgetPassLink }> Forgot Password </Link>
                <Link to="/SignUp" className={ styles.signUpLink }> Sign up </Link>
            </form>
        </div>
    );
}
 
export default Login;
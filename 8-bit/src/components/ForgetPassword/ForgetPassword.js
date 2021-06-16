import React, { useState, useRef } from 'react';
import styles from './ForgetPassword.module.css';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {

    const emailRef = useRef();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState('');
    const { forgotPassword } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setMsg('');
            setError('');
            setLoading(true);
            await forgotPassword(emailRef.current.value);
            setMsg('Please check your email');
        } catch {
            setError("Unable to reset password");
        }
        setLoading(false);
    }

    return (
        <div className={ styles.Container }>
            <form className= { styles.resetPassForm } onSubmit={ handleSubmit }>
                <h2 className={ styles.header }> Reset Password </h2>
                <input className= { styles.input } type="text" ref={ emailRef } placeholder="Email"required />
                <button className= { styles.button } type="submit"> Submit </button>
                <p className={ styles.msg }> { msg } </p>
                <Link to="/Login" className={ styles.loginLink }> Login </Link>
            </form>
        </div>
    );
}
 
export default ForgetPassword;
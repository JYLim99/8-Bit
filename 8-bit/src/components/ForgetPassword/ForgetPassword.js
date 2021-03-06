import React, { useState, useRef } from 'react'
import styles from './ForgetPassword.module.css'
import { auth } from '../../config/firebase'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const emailRef = useRef()
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      setMsg('')
      setError('')
      await forgotPassword(emailRef.current.value)
      setMsg('Please check your email')
    } catch {
      setError('Unable to reset password')
    }
  }

  return (
    <div className={styles.Container}>
      <form className={styles.resetPassForm} onSubmit={handleSubmit}>
        <h2 className={styles.header}> Reset Password </h2>
        <input
          className={styles.input}
          type='text'
          ref={emailRef}
          placeholder='Email'
          required
        />
        <button className={styles.button} type='submit'>
          {' '}
          Submit{' '}
        </button>
        <p className={styles.msg}> {msg} </p>
        <p className={styles.errorMsg}> {error} </p>
        <Link to='/Login' className={styles.loginLink}>
          Return to Login{' '}
        </Link>
      </form>
    </div>
  )
}

export default ForgetPassword

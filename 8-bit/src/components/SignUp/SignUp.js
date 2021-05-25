import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="A">Sign Up</h2>
                    {error && <Alert variant="danger">{ error }</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label> Email: </Form.Label>
                            <Form.Control type="email" ref={ emailRef }required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label> Password: </Form.Label>
                            <Form.Control type="password" ref={ passwordRef }required />
                        </Form.Group>
                        <Button disabled={ loading } className="B" type="submit"> Sign Up </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="Something">
                Already have an account? <Link to="/Login"> Login </Link> or sign in with Google 
            </div>
            <div> or, Login with Google </div>
        </>
    );
}
 
export default SignUp;
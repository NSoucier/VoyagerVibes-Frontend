import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import './UserForms.css' 

function Login({ login, setCurrentUser }) {
    const [ form, setForm ] = useState({username: '', password: ''});
    const navigate = useNavigate();

    useEffect(() => {
        // redirect to profile if loggedin user requests login page
        if (localStorage.user) navigate('/profile')
    }, []);

    // handles user input to login form
    function handleInput(evt) {
        evt.preventDefault();
        form[evt.target.name] = evt.target.value;
        setForm(form);
    }

    // authenticates user's login credentials
    async function handleClick (evt) {
        evt.preventDefault();
        // show loading spinner
        const spinner = document.getElementById('buffering');
        spinner.innerHTML = '<img src="https://www.jsfirm.com/resources/ajax-loader.gif" id="spinner"/>';
        // check credentials with db
        let status = await login(form);
        // if present, show errors
        if (!status.username) {
            const error = document.getElementById('error');
            error.innerText = status;
            spinner.innerHTML = '';
        } else {
            // set currentuser state
            setCurrentUser(status.username)
            localStorage.setItem('user', status.username);
            // redirect to explore page upon successful attempt
            navigate('/');
        }
    }

    return (
        <>
            { !localStorage.user ? (
                <Form id="loginForm">
                    <FormGroup floating>
                        <Input name="username" type="text" placeholder="" onChange={handleInput}/>
                        <Label for="username">Username</Label>
                    </FormGroup>{" "}
                    <FormGroup floating>
                        <Input name="password" type="password" placeholder="" onChange={handleInput}/>
                        <Label for="password">Password</Label>
                    </FormGroup>{" "}
                    <p id="error" style={{color: 'red'}}></p>
                    <Button color="success" onClick={handleClick}>Submit</Button>
                    <p id="message">Don't have an account yet? Sign up <Link to='/signup'>here</Link>!</p>
                    <div id="buffering"></div>
                </Form>

            ) : (
                <p>Invalid request.</p>
            )}
        </>     

    );
}

export default Login;

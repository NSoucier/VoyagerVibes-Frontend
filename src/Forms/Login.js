import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import './UserForms.css' 

function Login({ login, setCurrentUser }) {
    const [ form, setForm ] = useState({username: '', password: ''});
    const [ errorMsg, setErrorMsg ] = useState('');
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

        if(!form.username.length || !form.password.length) {
            setErrorMsg("Please enter username and password.");
        } else {
            // show loading spinner
            const spinner = document.getElementById('buffering');
            spinner.style.display = 'block';

            // check credentials with db
            let status = await login(form);
            // if present, show errors
            if (!status.username) {
                console.error('Error: ', status)
                setErrorMsg(status);
                spinner.style.display = 'none';
            } else {
                // set currentuser state
                setCurrentUser(status.username)
                localStorage.setItem('user', status.username);
                // redirect to explore page upon successful attempt
                navigate('/');
            }            
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
                    <p id="error" style={{color: 'red'}}>{errorMsg}</p>
                    <Button color="success" onClick={handleClick}>Submit</Button>
                    <p id="message">Don't have an account yet? Sign up <Link to='/signup'>here</Link>!</p>
                    <div id="buffering" style={{display: "none"}}>
                        <img src="https://www.jsfirm.com/resources/ajax-loader.gif" id="spinner"/>
                    </div>
                </Form>

            ) : (
                <p>Invalid request.</p>
            )}
        </>     

    );
}

export default Login;

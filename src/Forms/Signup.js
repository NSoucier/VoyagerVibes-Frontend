import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import './UserForms.css'

function Signup({ register, setCurrentUser }) {
    const [ form, setForm ] = useState({username: '', email: '', firstName:'', lastName: '', password: ''});
    const [ errorMsg, setErrorMsg ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // if user is already logged in, redirect to profile page
        if (localStorage.user) navigate('/profile')
    }, []);

    // update signup-form data with user inputs
    function handleInput(evt) {
        evt.preventDefault();
        form[evt.target.name] = evt.target.value;
        setForm(form);
    }

    // submit form data to API and register user
    async function handleClick (evt) {
        evt.preventDefault();
        // show loading spinner
        const spinner = document.getElementById('buffering');
        spinner.style.display = 'block';
    
        let status = await register(form);
        // if present, show errors
        if (!status.username) {
            setErrorMsg(status);
            spinner.style.display = 'none';
        } else {
            // set currentuser state
            setCurrentUser(status.username)
            // redirect to explore page upon successful registration
            navigate('/');
        }
    }

    return (
        <>
            <h2>Create an account</h2>
            <Form id="loginForm">
                <FormGroup floating>
                    <Input name="username" type="text" placeholder="" onChange={handleInput}/>
                    <Label for="username">Username</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                    <Input name="email" type="email" placeholder="" onChange={handleInput}/>
                    <Label for="email">Email</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                    <Input name="firstName" type="text" placeholder="" onChange={handleInput}/>
                    <Label for="firstName">First name</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                    <Input name="lastName" type="text" placeholder="" onChange={handleInput}/>
                    <Label for="lastName">Last name</Label>
                </FormGroup>{" "}
                <FormGroup floating>
                    <Input name="password" type="password" placeholder="" min={8} onChange={handleInput}/>
                    <Label for="password">Password</Label>
                </FormGroup>{" "}            
                <p id="error" style={{color: 'red'}}>{errorMsg}</p>
                <Button color="success" onClick={handleClick}>Submit</Button>
                <div id="buffering" style={{display: "none"}}>
                        <img src="https://www.jsfirm.com/resources/ajax-loader.gif" id="spinner"/>
                    </div>
            </Form>

        <div id="footer">
            <a href='https://soucier.vercel.app/' target="_blank" rel="noopener noreferrer">© Nathan Soucier</a>
        </div>            
      </>
    )
}

export default Signup;
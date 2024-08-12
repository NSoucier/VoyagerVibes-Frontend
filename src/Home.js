import React from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();

    // redirect to login page
    function handleClick() {
        navigate('/login')
    }

    return (
        <>
         <h2 className="welcome">Let the voyage begin!</h2>

         {( localStorage.user ) ?
         (<div>
            <p className="message">Where will you go next, {localStorage.user}?</p>
            <p className="message"><Link to='/explore'>Explore</Link> now!</p>
        </div>
         )
         : 
         (<Button color="success" id="home-login" onClick={handleClick}>Login</Button>)}
        </>
    )
}

export default Home;
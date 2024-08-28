import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Collapse, Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import TripHistory from "./TripHistory";
import './Profile.css';


function Profile({ currentUser, getUser, updateUser, getItineraries, removeItinerary }) {
    const [ profile, setProfile ] = useState({ email: '', firstName: '', lastName: '', picture: '' });
    const navigate = useNavigate();
    const toggleForm = document.getElementById('toggle-form');
    const statusMsg = document.getElementById('status');
    const [ trips, setTrips ] = useState();
    const [ isOpen, setIsOpen ] = useState(false);
    
    const toggle = () => setIsOpen(!isOpen);

    useEffect(function showProfile() {
        if (!currentUser) { // if no one is logged in, redirect to login page
            navigate('/login');
        } else {
            async function getProfile() {
                // get user details
                let userInfo = await getUser(currentUser);
                setProfile(userInfo);

                // get associated trip itineraries
                let history = await getItineraries(currentUser);
                setTrips(history);
            }

            getProfile();
        }
    }, []);

    // handles input to 'edit profile' form 
    function handleInput(evt) {
        evt.preventDefault();
        const { name, value } = evt.target;
        setProfile(data => ({
            ...data,
            [name]: value
        }));
    }

    // updates users profile with new inputs
    async function handleClick (evt) {
        evt.preventDefault();
        let update = profile;
        update.username = currentUser;
        let status = await updateUser(update);
        if (status.username) {
            toggleForm.className = 'collapse';
            statusMsg.innerHTML = 'Profile updated successfully.';
        }
    }

    // deletes trip itinerary from user profile
    async function deleteTrip(tripID) {
        let temp = trips.filter((trip) => String(trip.id) !== tripID);
        setTrips(temp);
        let status = await removeItinerary(tripID);
    }

    return (
        <> 
            { localStorage.user ? (
                <>
                    <div id="header">
                        <img alt="profile-picture" id="profile-picture" src={profile.picture}/>
                        <div id="profile">
                            <h5 id="username">Username: {currentUser}</h5>
                            <div id="editProfile">
                                <Button color="success" id="toggler">Edit profile</Button>
                                <Collapse isOpen={isOpen} id="toggle-form">
                                    <Card id="editForm">
                                    <CardBody>

                                        <Form>
                                            <FormGroup floating>
                                                <Input name="email" type="email" value={profile.email} onChange={handleInput}/>
                                                <Label for="email">Email</Label>
                                            </FormGroup>{" "}
                                            <FormGroup floating>
                                                <Input name="firstName" type="text" value={profile.firstName} onChange={handleInput}/>
                                                <Label for="firstName">First name</Label>
                                            </FormGroup>{" "}
                                            <FormGroup floating>
                                                <Input name="lastName" type="text" value={profile.lastName} onChange={handleInput}/>
                                                <Label for="lastName">Last name</Label>
                                            </FormGroup>{" "}
                                            <FormGroup floating>
                                                <Input name="picture" type="text" value={profile.picture} onChange={handleInput}/>
                                                <Label for="picture">Profile picture</Label>
                                            </FormGroup>{" "}                                                     
                                            <Button color="success" onClick={handleClick}>Update</Button>
                                        </Form>

                                    </CardBody>
                                    </Card>
                                </Collapse>
                                <p id="status" style={{ color: 'darkgreen', fontWeight: 'bold'}}></p>
                            </div>
                        </div>
                    </div>
                    <h4>My trips:</h4>
                    <p>Planning a trip? <Link to='/explore'>Explore</Link> now!</p>      
                    <TripHistory trips={trips} deleteTrip={deleteTrip}/>          
                </>
            ) : (<p>Invalid request.</p>) }
            
      </>
    )
}

export default Profile;
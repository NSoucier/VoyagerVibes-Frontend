import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import './Explore.css';

function Explore({ getItinerary, currentUser, saveItinerary }) {
    const [ itinerary, setItinerary ] = useState('');
    const [ form, setForm ] = useState({destination: 'mars', duration:  '3', activities: ''});
    const [ preferences, setPreferences ] = useState({});
    const navigate = useNavigate();
    // const save = '<Button id="save" onClick={handleInput}>Save itinerary</Button>';
    const [ button, setButton ] = useState(true);

    useEffect(() => {
        // redirect to login if page is incorrectly requested and user is not logged in
        if (!localStorage.user) {
            navigate('/login')
        }
    }, []);

    // generate itinerary based off user input
    async function generate() {
        document.getElementById('save').innerHTML = 'Save itinerary';
        const output = document.getElementById('output');

        // display loader/spinner while waiting for API
        let msg = `<img src="https://www.jsfirm.com/resources/ajax-loader.gif" id="loading"/>`;
        output.innerHTML = msg;
        setItinerary(msg);

        // turn form.preferences into a string
        let prefString = '';
        for (let pref in form.preferences) {
            prefString += `${pref}, `;
        }

        // make API request
        msg = await getItinerary(form.destination, form.duration, form.activities, prefString);
        if (msg[0] === '[') {
            console.debug('error from API:', msg)
            msg = 'Apologies for the delay, our AI is overloaded. Please try again later';
        }
        output.innerHTML = msg;
        setItinerary(msg);
        setButton(false);
    }

    // handles checkbox state in form 
    function handleCheckboxes(activity) {
        let temp = {...preferences};
        if (preferences[activity]) {
            // remove/uncheck preference
            delete temp[activity];
            // add/check preference
            setPreferences(temp);
        } else {
            // add preference to list
            temp[activity] = activity;
            setPreferences(temp);
        }
        setForm(input => ({
            ...input, 
            preferences: temp
        }));
    }

    // handles user input to form 
    function handleInput(evt) {
        // handle checkbox state differently than text inputs
        if (evt.target.role === 'checkbox') {
            handleCheckboxes(evt.target.name)
        } else {
            setForm(input => ({
                ...input, 
                [evt.target.name]: evt.target.value
            }));
        }
    }

    // save itinerary to user's profile
    async function hanldeSave() {
        await saveItinerary({username: currentUser, itinerary: itinerary, destination: form.destination, duration: form.duration});
        document.getElementById('save').innerHTML = 'Saved';   
        setButton(true);
    }

    return (
        <>
         { localStorage.user ? (
                <div className="itinerary">
                    <h2 id="title">Let our AI guide your way!</h2>
                    <Form id="exploreForm">
                        <FormGroup>
                            <Label for="destination">Destination</Label>
                            <Input name="destination" type="text" placeholder="City/town" onChange={handleInput}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">How many days: {form.duration}</Label>
                            <Input id="duration" name="duration" type="range" value={form.duration} min={1} max={10} onChange={handleInput}/>
                        </FormGroup>
                        <FormGroup switch inline>
                            <Input name="strict budget" type="switch" role="checkbox" onChange={handleInput}/>
                            <Label check for="strict budget">I'm on a strict budget</Label>
                        </FormGroup>
                        <FormGroup id="options">
                            <p id="preferences">Select your travel style below <span style={{display: "block"}}>(at least 2):</span></p>
                            <div>
                                <Input name="hiking" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="hiking">Hiking</Label>
                            </div>
                            <div>
                                <Input name="local food" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="local food">Local food</Label>    
                            </div>
                            <div>                
                                <Input name="live music" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="live music">Live music</Label>
                            </div>
                            <div>
                                <Input name="adrenaline rush" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="adrenaline rush">Adrenaline junkie</Label>
                            </div>
                            <div>
                                <Input name="cultural experiences" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="cultural experiences">Cultural experiences</Label>
                            </div>
                            <div>
                                <Input name="nightlife" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="nightlife">Nightlife</Label>
                            </div>
                            <div>
                                <Input name="shopping" type="checkbox" role="checkbox" onChange={handleInput}/>
                                <Label for="shopping">Shopping</Label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="activities">Not listed above? List some activities you would like to include:</Label>
                            <Input name="activities" type="text" placeholder="cooking class, hot springs, etc." onChange={handleInput}/>
                        </FormGroup>                
                        <Button color="success" id="generate" onClick={generate}>Generate</Button>
                        <Button color="primary" id="save" disabled={button} onClick={hanldeSave}>Save itinerary</Button>
                    </Form>
                    <div id="output">
                    </div>
                </div>
         ) : (<p>Invalid request.</p>) }
        </>
    )
}

export default Explore;
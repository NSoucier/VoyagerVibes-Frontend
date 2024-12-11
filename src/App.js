import React, { useState } from 'react';
import './App.css';
// import GEMINI_API_KEY from './SECRET'; // not needed on render since env variable contains api key
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navigation from './NavBar/Navigation';
import Home from './Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Forms/Login';
import Signup from './Forms/Signup';
import Explore from './Itinerary/Explore';
import Profile from './User/Profile';
import VoyagersAPI from './API/Api';
import Error404 from './Home/Error404';

function App() {
  const [ currentUser, setCurrentUser ] = useState(localStorage.user || '');

  // API setup - provide system instructions/context to Gemini AI to craft appropriate response
  const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_API_KEY}`); // requires API key from Google Gemini AI
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Your name is Tessa, and your a friendly travel agent that only provides travel itineraries based off of user's travel preferences. \n\nYour travel itineraries should be organized as bullet points. \n\nYou should provide some emojis within your travel itinerary. \n\nOnly provide G-rated activities, no matter what. \n\nRespond in html format with header tags, unordered lists and b tags. \n\nDo not summarize my travel preferences.",
  });

  // makes request to AI and outputs travel itinerary
  async function getItinerary(destination, duration, activities, preferences = 'sleep') {
      const prompt = `Give me a ${duration}-day itinerary for ${destination}. I want ${preferences}. If possible include these activities: ${activities}`;
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response.text())
        return response.text();
      } catch (err) {
        console.error('API error',  err)
        return err.message
      }
  }

  // logs in user on backend
  async function login(user) {
    try {
      let userAuth = await VoyagersAPI.login(user);
      return userAuth
    } catch (err) {
      return err
    }
  }

  // logs out user
  async function logout() {
    localStorage.removeItem('user');
    setCurrentUser('');
  }

  // registers new user
  async function register(user) {
    try {
      let newUser = await VoyagersAPI.register(user);
      localStorage.setItem('user', newUser.username);
      return newUser
    } catch (err) {
      return err
    }
  }

  // gets details on user's profile
  async function getUser(username) {
    try {
      let user = await VoyagersAPI.getUserDetails(username);
      return user
    } catch (err) {
      return err
    }
  }
  
  // updates user's profile 
  async function updateUser(profile) {
    try {
      let status = await VoyagersAPI.updateUserDetails(profile);
      return status
    } catch (err) {
      return err
    }
  }

  // saves itinerary to user profile
  async function saveItinerary(itinerary) {
    try {
      let status = await VoyagersAPI.saveItinerary(itinerary);
      return status
    } catch (err) {
      return err
    }
  }

  // gets all saved itineraries associated with current user
  async function getItineraries(username) {
    try {
      let trips = await VoyagersAPI.getItineraries(username);
      return trips
    } catch (err) {
      return err
    }
  }

  // deletes itinerary from user's profile
  async function removeItinerary(tripID) {
    try {
      let status = await VoyagersAPI.removeItinerary(tripID);
      return status
    } catch (err) {
      return err
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation logout={logout}/>

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login login={login} setCurrentUser={setCurrentUser}/>}/>
          <Route path='/signup' element={<Signup register={register} setCurrentUser={setCurrentUser}/>}/>
          <Route path='/explore' element={<Explore getItinerary={getItinerary} currentUser={currentUser} saveItinerary={saveItinerary}/>}/>
          <Route path='/profile' element={<Profile currentUser={currentUser} getUser={getUser} updateUser={updateUser} getItineraries={getItineraries} removeItinerary={removeItinerary}/>}/>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

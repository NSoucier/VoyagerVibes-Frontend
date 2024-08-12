import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class VoyagersAPI {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
    
    // Individual API routes //

    /** Register new user from signup form. */
    static async register(user) {
    let res = await this.request(`users`, user, 'post');
    return res
    }
    
    /** Get user profile details. */
    static async getUserDetails(username) {
    let res = await this.request(`users/${username}`);
    return res
    }   

    /** Authenticate user login credentials. */
    static async login(user) {
    let res = await this.request(`users/login`, user, 'post');
    return res
    }  
    
    /** Update user details. */
    static async updateUserDetails(user) {
        let res = await this.request(`users/${user.username}`, user, 'patch');
        return res
    }      

    /** Save itinerary to user's profile */
    static async saveItinerary(itinerary) {
        let res = await this.request(`users/${itinerary.username}/trips`, itinerary, 'post');
        return res
    }

    /** Get all itineraries from user's profile */
    static async getItineraries(username) {
        let res = await this.request(`users/${username}/trips`);
        return res
    } 
    
    /** Delete itinerary from user's profile */
    static async removeItinerary(tripID) {
        let res = await this.request(`users/trips/${tripID}`, {}, 'delete');
        return res
    }     
}

export default VoyagersAPI;
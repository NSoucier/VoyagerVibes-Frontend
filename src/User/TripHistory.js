import React, { useEffect } from "react";
import './TripHistory.css';
import { UncontrolledAccordion, AccordionItem, AccordionBody, AccordionHeader, Button } from "reactstrap";
import Parser from 'html-react-parser';

function TripHistory({ trips = [], deleteTrip }) {
    const history = {};

    useEffect(() => {
        // if trips contains itineraries, organize into object
        if (trips) {
            for (let trip of trips) {
                let location = trip.destination;
                if (history[location]) {
                    history[location].push(trip);
                } else {
                    history[location] = [trip];
                }
            }
        }
    }, []);

    // handles deletion of itinerary
    async function handleClick(evt) {
        await deleteTrip(evt.target.name);
    }

    return (
        <div id="trips">
            { trips ? 
            trips.map((trip) => (
                <UncontrolledAccordion id="history" key={`${trip.id}`} >
                    <AccordionItem>
                        <AccordionHeader targetId={`${trip.id}`}>
                            {trip.destination} - {trip.duration} day(s)
                        </AccordionHeader>
                        <AccordionBody accordionId={`${trip.id}`} name={`${trip.id}`} >
                            {Parser(trip.itinerary)}
                            <Button id="delete" name={`${trip.id}`} size="sm" onClick={handleClick}>Delete</Button>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>                   
            ))
            : ''}

        </div>
    )
}

export default TripHistory;
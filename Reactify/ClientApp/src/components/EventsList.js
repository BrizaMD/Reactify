﻿import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const EventsList = (props) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios
            .get("event")
            .then((res) =>
                setEvents(res.data)
            );
    }, []);

    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>band</th>
                        <th>date</th>
                        <th>venue</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event =>
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{event.band}</td>
                            <td>{event.date}</td>
                            <td>{event.venue}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    );

}

export default EventsList;

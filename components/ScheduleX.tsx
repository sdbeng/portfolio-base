'use client';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from "@schedule-x/calendar";
import '@schedule-x/theme-default/dist/index.css';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import {createEventModalPlugin} from '@schedule-x/event-modal';
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { useEffect, useState } from "react";

export default function CalendarApp() {
    // const plugins = [createEventsServicePlugin()];
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];// it initializes the plugin with the default options and returns the plugin instance

    const calendar = useNextCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        defaultView: "monthGrid",
        events: [
            {
                id: "1",
                title: "John W. - media @mass",
                start: "2024-09-28T07:00:00",
                end: "2024-09-28T08:00:00",
                people: ["John Winters"],
            },
            {
                id: "2",
                title: "Silvia/Sergio - media @mass",
                start: "2024-09-29T11:00:00",
                end: "2024-09-29T11:00:00",
                people: ["Silvia", "Sergio"],
            },
            {
                id: "3",
                title: "Silvia/Sergio - media @mass",
                start: "2024-10-06T11:00:00",
                end: "2024-10-06T11:00:00",
                people: ["Silvia", "Sergio"],
                calendarId: 'mediagroup',
            },
        ],
        calendars: {
            mediagroup: {
                colorName: 'mediagroup',
                lightColors: {
                    main: '#1c7df9',
                    container: "#d2e7ff",
                    onContainer: "#002859",
                },
                darkColors: {
                main: "#c0dfff",
                container: "#dee6ff",
                onContainer: "#426aa2",
                },
            },
        }        
    }, [createDragAndDropPlugin(), createEventModalPlugin(),eventsServicePlugin]);

    useEffect(() => {
        //get all mock events
        console.log('calendar instance===', JSON.stringify(calendar))
        calendar?.eventsService?.getAll();
        // calendar?.eventsService?.fetchEvents();
        // .then((events) => {
        //     console.log('LOG fetcher data===', JSON.stringify(events))
        // }
        //get all events from the database
        // const events = await getEventsJson();
        // console.log('LOG fetcher data===', JSON.stringify(events))
        // const parsedData = JSON.parse(events);
        // console.log('LOG fetcher PARSED data===', JSON.stringify(parsedData))
        // setEventsList(parsedData);

        // setView("monthGrid");
    }, []);

    return (
        <div>
        <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

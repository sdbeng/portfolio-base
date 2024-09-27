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
        events: [
            {
                id: "1",
                title: "11am mass",
                start: "2024-09-28T11:00:00",
                end: "2024-09-28T12:00:00",
                people: ["John Wintersx"],
            },
            {
                id: "2",
                title: "5pm mass",
                start: "2024-09-28T17:00:00",
                end: "2024-09-28T18:00:00",
                people: ["Virginia Fallx"],
            }
        ],        
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

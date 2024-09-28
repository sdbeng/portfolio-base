'use client';
import {
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
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
import { createResizePlugin } from '@schedule-x/resize'
import { useEffect, useState } from "react";

export default function CalendarApp() {
    // const plugins = [createEventsServicePlugin()];
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

    const calendar = useNextCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
            // viewDay,
            // viewWeek,
            // viewMonthGrid,
            // viewMonthAgenda,
        ],
        selectedDate: '2024-09-28',
        // defaultView: viewMonthGrid.name,
        events: [
            {
                id: "1",
                title: "John W. - media",
                start: "2024-09-28 09:00",
                end: "2024-09-28 10:00",
                people: ["John Winters"],
            },
            {
                id: "2",
                title: "Silvia/Sergio - media",
                description:"Media remote ctrl required",
                start: "2024-09-29 11:00",
                end: "2024-09-29 11:00",
                people: ["Silvia", "Sergio"],
                color: "green",
                // isEditable: true,
                calendarId: 'mediagroup',
            },
            {
                id: "3",
                title: "Silvia/Sergio - media",
                start: "2024-10-06 11:00",
                end: "2024-10-06 11:00",
                people: ["Silvia", "Sergio"],
                calendarId: 'mediagroup',
            },
            {
                id: "4",
                title: "Effie - media",
                start: "2024-10-12 17:00",
                end: "2024-10-12 18:00",
                people: ["Effie"],
                calendarId: 'testgroup',
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
        },
        plugins: [
            createDragAndDropPlugin(),
            createEventModalPlugin(),
            eventsServicePlugin,
            createResizePlugin(),
        ],       
    }, );

    useEffect(() => {        
        console.log('calendar instance===', JSON.stringify(calendar))
        calendar?.eventsService.getAll();
        // eventsServicePlugin.$app.config.weekOptions = {
        //     // @ts-ignore
        //     showWeekend: true,
        //     showWeekNumber: true,
        //     showCurrentTime: true,
        //     startDay: 7, // Sunday//not setting Sunday as first day of the week 
        // }
        
    }, []);

    //close the modal programmatically
    // const closeModal = () => {
    //     calendar?.eventModal?.close();
    // }
    

    return (
        <div>            
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

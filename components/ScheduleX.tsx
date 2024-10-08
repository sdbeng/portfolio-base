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
    const eventsService = createEventsServicePlugin();
    // const eventsService = useState(() => createEventsServicePlugin())[0];
    const viewMonthGrid = createViewMonthGrid();

    // Note:Schedule-X only supports time stamps in the form of YYYY-MM-DD or YYYY-MM-DD hh:mm, not the seconds

    const calendar = useNextCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),            
        ],
        selectedDate: '2024-09-29',
        firstDayOfWeek: 0,//0 is Sunday, 1 is Monday
        defaultView: viewMonthGrid.name,
        dayBoundaries: {
            start: '06:00',
            end: '22:00',
        },
        weekOptions: {
            eventWidth: 95,//leave small right margin
        },
        callbacks: {
            onClickDate(date) {
                console.log('onClickDate', date)
            },
            onEventClick(event) {
                console.log('onEventClick', event)
            },
        },
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
                // description:"Media remote ctrl required",
                start: "2024-09-29 11:00",
                end: "2024-09-29 11:00",
                people: ["Silvia", "Sergio"],
                // color: "green",
                // isEditable: true,
                calendarId: 'mediagroup',
            },
            {
                id: "3",
                title: "Andrew - media",
                start: "2024-10-06 11:00",
                end: "2024-10-06 11:00",
                people: ["Andrew"],
                calendarId: 'mediagroup',
            },
            {
                id: "4",
                title: "Eileen,Ariel,Lucy - media",
                start: "2024-10-05 17:00",
                end: "2024-10-05 18:00",
                people: ["Eileen,Ariel,Lucy"],
                calendarId: 'saturdaygroup',
            },
            {
                id: "5",
                title: "Effie - media",
                start: "2024-10-13 07:00",
                end: "2024-10-13 08:00",
                people: ["Effie"],
                calendarId: 'sun7amgroup',
            },
            {
                id: "6",
                title: "Ace,Darrel - media",
                start: "2024-10-12 17:00",
                end: "2024-10-12 18:00",
                people: ["Ace","Darrel"],
                calendarId: 'saturdaygroup',
            },
            {
                id: "7",
                title: "Lucy,Darrel - media",
                start: "2024-10-19 17:00",
                end: "2024-10-19 18:00",
                people: ["Lucy","Darrel"],
                calendarId: 'saturdaygroup',
            },
            {
                id: "8",
                title: "Jon(Sylvia) - media",
                start: "2024-10-26 17:00",
                end: "2024-10-26 18:00",
                people: ["Jon(Sylvia)"],
                calendarId: 'saturdaygroup',
            },
            {
                id: "9",
                title: "Evelyn/Oscar - media",
                start: "2024-10-06 07:00",
                end: "2024-10-06 08:00",
                people: ["Evelyn/Oscar"],
                calendarId: 'sun7amgroup',
            },
            {
                id: "10",
                title: "Marina - media",
                start: "2024-10-06 09:00",
                end: "2024-10-06 10:00",
                people: ["Marina"],
                calendarId: 'sun9amgroup',
            },
            {
                id: "11",
                title: "volunteer - media",
                start: "2024-10-06 17:00",
                end: "2024-10-06 18:00",
                people: ["volunteer"],
                calendarId: 'sun5pmgroup',
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
            saturdaygroup: {
                colorName: 'saturdaygroup',
                lightColors: {
                    main: '#f91c45',
                    container: '#ffd2dc',
                    onContainer: '#59000d',
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
            eventsService,
            createResizePlugin(),
        ],       
    }, );

    useEffect(() => {        
        //call set(events) to set all events in the calendar, override existing events with the new ones you pass it        
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if(!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                eventsService.set(data);
            }catch(error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();        

        // calendar.eventsService.add({
        //     title: 'Event 1',
        //     start: '2024-04-20',
        //     end: '2024-04-20',
        //     id: 1
        //   })
           
        //   calendar.eventsService.get(1) // { title: 'Event 1', start: '2024-04-20', end: '2024-04-20', id: 1 } 
                 
        //   calendar.eventsService.update({
        //     title: 'Real title',
        //     start: '2024-04-20',
        //     end: '2024-04-20',
        //     id: 1
        //   })
           
        //   calendar.eventsService.remove(1)
        
    }, []);

    if (!calendar) {
        return <div className="text-green-300 text-center">Loading...</div>;
    }

    return (
        <div>            
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

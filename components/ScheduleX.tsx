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
import fetchEventsDB from "@/utils/fetcheventsdb";

export default function CalendarApp() {
    // const plugins = [createEventsServicePlugin()];
    const eventsService = createEventsServicePlugin();
    // const eventsService = useState(() => createEventsServicePlugin())[0];

    // Note:Schedule-X only supports time stamps in the form of YYYY-MM-DD or YYYY-MM-DD hh:mm, not the seconds

    const calendar = useNextCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
            // viewDay,//old api for views
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
                    main: 'yellow',
                    container: "#000",
                    onContainer: "#ddd",
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
        console.log('calendar instance===', JSON.stringify(calendar))
        // calendar?.eventsService.getAll();
        //call set(events) to set all events in the calendar, override existing events with the new ones you pass it
        console.log('-----------------')
        console.log('Useff fetching data from supabase...')
        fetcher();        

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

    const fetcher = async () => {        
        try {
            const data = await fetchEventsDB();
            // console.log('LOG fetcher data===', JSON.stringify(data))
            if (Array.isArray(data)) {
                eventsService.set(data);
            } else {
                console.error('Fetched data is not an array of events:', data);
            }
            // const parsedData = JSON.parse(data);
            // console.log('LOG fetcher PARSED data===', JSON.stringify(parsedData))
        }catch(error) {
            console.log('LOG fetcher - error fetching evnets===', error)
        }
    }
    //this is done on the server side
    // const transformEventData = (events) => {
    //     return events.map(event => ({
    //         ...event,
    //         calendarId: event.calendar_id,
    //         // people: Array.isArray(event.people) ? event.people : [],
    //     }));
    // };

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

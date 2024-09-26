'use client';
import React,{use, useEffect, useState} from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { calendarEvents } from '@/lib/data';
import { getEventsJson, createEventJson } from '@/lib/query';
import { Button } from './ui/button';
import { supabase } from '@/lib/query';

const myEventsList = [
    {
        id: 1,
        title: "8am mass",
        start: new Date("September 27, 2024 08:00:00"),
        end: new Date("September 27, 2024 08:30:00"),
      },
      {
        id: 2,
        title: "10am school mass",
        start: new Date("September 27, 2024 10:00:00"),
        end: new Date("September 27, 2024 11:00:00"),
      },
      {
        id: 3,
        title: "14pm special mass",
        start: new Date("September 28, 2024 14:00:00"),
        end: new Date("September 28, 2024 15:59:00"),
      },
];
const localizer = momentLocalizer(moment)
//pull the data from the fetchMockEvents function in query.ts
// const mockEvents = fetchMockEvents()

export default function EventCalendar() {
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<View>(Views.MONTH)
    const [date, setDate] = useState<Date>(new Date())
    const [eventsList, setEventsList] = useState([
        {
            title: "8am mass",
            starttime: new Date("September 27, 2024 08:00:00"),
            endtime: new Date("September 27, 2024 08:30:00"),
            volunteer_name: "John Doe",
        }
    ])    
    
    useEffect(() => {
        fetcher()
    }, [])
    
    const fetcher = async () => {
        try {
            const data = await getEventsJson()
            console.log('LOG fetcher data===', JSON.stringify(data))
            const parsedData = JSON.parse(data);
            console.log('LOG fetcher PARSED data===', JSON.stringify(parsedData))
            setEventsList(parsedData);
        }catch(error) {
            console.log('LOG fetcher - error fetching evnets===', error)
            setError('Error fetching events');
        }
    }
    
    // if(!mockEvents) {
    //     console.log('no events')
    // }

    console.log('LOGIn component mockevents===', eventsList)

    const validateEventData = (data) => {
        if (!data.title || typeof data.title !== 'string') {
            return 'Invalid title';
        }
        if (!data.starttime || isNaN(new Date(data.starttime).getTime())) {
            return 'Invalid start time';
        }
        if (!data.endtime || isNaN(new Date(data.endtime).getTime())) {
            return 'Invalid end time';
        }
        if (new Date(data.starttime) >= new Date(data.endtime)) {
            return 'Start time must be before end time';
        }
        if (!data.volunteer_name || typeof data.volunteer_name !== 'string') {
            return 'Invalid volunteer name';
        }
        return null;
    };

    const handleSubmitEvents = async () => {
        try {
            const dataInserted = await createEventJson();
            console.log('LOG createEventJson data===', JSON.stringify(dataInserted));
            const parsedData = JSON.parse(dataInserted);
            console.log('LOG createEventJson PARSED data===', JSON.stringify(parsedData));

            // Check if parsedData is an array
            if (!Array.isArray(parsedData)) {
                setError('Invalid data format: expected an array of events');
                return;
            }

            // Validate each event
            for (const event of parsedData) {
                const validationError = validateEventData(event);
                if (validationError) {
                    setError(validationError);
                    return;
                }
            }

            // Log the data being sent to Supabase
            console.log('Data being sent to Supabase:', parsedData);

            // Assuming createEventJson sends data to Supabase
            // const { data, error } = await supabase
            //     .from('events')
            //     .insert(parsedData);

            // if (error) {
            //     console.error('Error inserting data:', error);
            //     setError('Error inserting data: ' + error.message);
            //     return;
            // }

            setEventsList(parsedData); // Update the state with the new data
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error creating event:', error);
            setError('Error creating event');
        }
    }

    const handleNavigate = (newDate: Date) => {
        // console.log(newDate)
        setDate(newDate)
    }

    const handleOnChangeView = (selectedView: View) => {
        console.log(view)
        setView(selectedView)
    }
    
  return (
    <>
        <div>
            {eventsList ? (<div className='text-sm border-spacing-1 bg-orange-300 '>{JSON.stringify(eventsList)}</div>) : (<div className="flex justify-center items-center">No events found.</div>)}
        </div>
        {error && <div className="text-amber-700 ">{error}</div>}
        {/* <div>
        <Button onClick={handleSubmitEvents}>Submit Events</Button>
        </div> */}
      <Calendar 
        selectable
        localizer={localizer}
        events={eventsList?.map((event) => ({
            title: event.title,
            start: new Date(event.starttime),
            end: new Date(event.endtime),
            volunteer_name: event.volunteer_name,
        }))}        
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        view={view}
        style={{ height: "100vh", width: 1020 }}
        onView={handleOnChangeView}
        onSelectEvent={event => setTimeout(() => alert(event.title), 0)}
        onNavigate={handleNavigate}
        min={new Date(2025, 1, 0, 6, 0, 0)}
        max={new Date(2025, 1, 0, 20, 0, 0)}
        date={date}//
      />
    </>
    
  )
}
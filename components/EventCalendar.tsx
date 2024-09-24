'use client';
import React,{useState} from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const myEventsList = [
  {
    title: 'church service',
    start: new Date(),
    end: new Date(),
    allDay: false,
  },
];
const localizer = momentLocalizer(moment)

export default function EventCalendar() {
    const [view, setView] = useState<View>(Views.MONTH)

    const handleOnChangeView = (selectedView: View) => {
        console.log(view)
        setView(selectedView)
    }
    
  return (
    <div>
      <Calendar 
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        view={view}
        style={{ height: "100vh" }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 6, 0, 0)}
        max={new Date(2025, 1, 0, 20, 0, 0)}
      />
    </div>
  )
}
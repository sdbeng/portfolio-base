const now = new Date();
export const calendarEvents = [
    {
      title: "7am Mass",
      allDay: false,
      start_date: "2024-09-25T00:00:00.000-04:00",
      end_date: "2024-09-25T00:00:00.000-05:00",
    //   start: new Date(2024, 9, 29, 7, 0, 0),// year, month, day, hour, minute
    //set start date September 29, 2024 at 7am
    // start: new Date(2024, 9, 29, 7, 0, 0),
    //set end time same day 1 hour after start time
    // end: new Date(2024, 9, 29, 8, 0, 0),
     
    },
    {
      title: "9am Mass",
      allDay: false,
      start: new Date(2024, 9, 29, 9, 0),
      end: new Date(2024, 9, 29, 10, 0),
    },
    {
      title: "11am Mass",
      allDay: false,
      start: new Date(2024, 9, 29, 11, 0),
      end: new Date(2024, 9, 29, 12, 0),
    },
    {
      title: "Today Mass",
      allDay: false,
      start: now,
      //end: //set end date to 1 hour after start date
      end: new Date(now.setHours(now.getHours() + 1)),
    },
]
'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  CurrentTimeIndicator,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';

const schedulerData = [
  { startDate: '2024-04-18T12:00', endDate: '2024-04-18T13:00', title: 'Meeting' },
  { startDate: '2024-04-18T14:00',endDate: '2024-04-18T20:00', title: 'Go to a gym' },
];


const Appointment = ({
  children,data,
} : {
  children: React.ReactNode,
  data: object,
}) => (

  <Appointments.Appointment
    onClick={() => alert(JSON.stringify(data))}
    style={{
      backgroundColor: '#FFC107',
      borderRadius: '8px',
      cursor: 'pointer',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default function Calendar() {
    const [data,setData] = useState(schedulerData);
    const [currentDate,setCurrentDate] = useState(new Date());

    return (
        <Paper>
          <Scheduler
            data={data}
            
          >
            <ViewState
              defaultCurrentDate = {currentDate}
            />
            
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments 
              appointmentComponent={Appointment}
            />
            <AppointmentTooltip
          // headerComponent={Header}
          // contentComponent={Content}
          // commandButtonComponent={CommandButton}
          // showCloseButton
        />
            <CurrentTimeIndicator
              updateInterval={1000}
            />
          </Scheduler>
        </Paper>
      );
}
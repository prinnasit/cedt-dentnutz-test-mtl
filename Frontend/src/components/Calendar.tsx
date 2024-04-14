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
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState,useEffect } from 'react';
import getAppointments from '@/libs/getAppointments';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Calendar() {
    const [data,setData] = useState();
    const [currentDate,setCurrentDate] = useState(new Date());

    const { data: session } = useSession();
    const token = session?.user.token;
    if (!token) return null;
    const router = useRouter();

    useEffect(() => {
        const fetchAppointment = async ()=>{
            const appointments = await getAppointments(token)
            setData(appointments.data.map((appointment:AppointmentItem) => ({
                startDate: appointment.appDate,
                endDate: new Date(new Date(appointment.appDate).setHours(new Date(appointment.appDate).getHours() + 3)),
                title: appointment.userName,
                appID: appointment._id
            })));
        }
        fetchAppointment()
    }, []);

    const Appointment = ({
        children,
        data
    }: {
        children: React.ReactNode;
        data: {
            startDate: string,
            endDate: string,
            title: string,
            appID: string
          };
    }) => (
        <Appointments.Appointment
            onClick={() => router.push('/appointment/'+data.appID)}
        >
            {children}
        </Appointments.Appointment>
    );

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
        />
            <CurrentTimeIndicator
              updateInterval={1000}
            />
          </Scheduler>
        </Paper>
      );
}
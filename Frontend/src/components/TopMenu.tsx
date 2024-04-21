import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import getUserProfile from '@/libs/getUserProfile'
import Link from 'next/link'
import { Button } from '@mui/material'

export default async function TopMenu() {

  const session = await getServerSession(authOptions)
  const profile = session ? await getUserProfile(session.user.token) : null

  function renderTopMenuItem() {
    if (!session) {
      return (
        <div className="flex gap-4 ml-[35%]">
          <TopMenuItem title='Dentist' pageRef='/dentist'/>
          <TopMenuItem title='Booking' pageRef='/makeappointment'/>
          <TopMenuItem title='View Appointment' pageRef='/appointment'/>
        </div>
      )
    }
    else {
      if (session.user.type === 'patient') {
        return (
          <div className="flex gap-4 ml-[32%]">
            <TopMenuItem title='Dentist' pageRef='/dentist'/>
            <TopMenuItem title='Booking' pageRef='/makeappointment'/>
            <TopMenuItem title='View Appointment' pageRef='/appointment'/>
            <TopMenuItem title='View Report' pageRef='/report'/>
          </div>
        )
      }
      else if (session.user.type === 'dentist') {
        return (
          <div className="flex gap-4 ml-[37%]">
            <TopMenuItem title='View Schedule' pageRef='/schedule'/>
            <TopMenuItem title='View Report' pageRef='/report'/>
          </div>
        )
      }
      else {
        return (
          <div className="flex gap-4 ml-[35%]">
            <TopMenuItem title='Dentist' pageRef='/dentist'/>
            <TopMenuItem title='View Schedule' pageRef='/schedule'/>
            <TopMenuItem title='View Appointment' pageRef='/appointment'/>
          </div>
        )
      }
    }
  }

  return (  
    <div
      className="h-[64px] top-0 left-0 right-0 z-30 px-10 fixed flex flex-row justify-stretch items-center shadow-lg "
      style={{ backgroundColor: 'rgb(65, 201, 226)' }}
    >
      <div className='h-[100%] justify-start w-fit'>
        <Link href="/" className='mr-5'>
          <Image src={'/img/logo.png'} className="h-[100%] w-auto p-1" alt='logo' width={0} height={0} sizes='100vh' />
        </Link>
      </div>


      
      {renderTopMenuItem()}
      

            <Link href="/api/auth/signin" className="text-xl text-slate-950 font-medium ml-3 flex items-center gap-2 px-2 py-3.5 rounded-2xl hover:text-primary-default hover:text-slate-700 hover:underline ">
              Sign In
            </Link>
          
            <Link href="/api/auth/register" className="py-1 border-b-2 text-medium border-transparent">
              <button className='bg-blue-500 text-white font-semibold py-2 
              px-2 my-8 rounded-lg hover:bg-blue-400   hover:text-blue-500' > Register</button>
      </Link>

      <div className='flex ml-auto items-center gap-4 w-auto'>
        <div>
          {
            session ? <div className='flex flex-row space-x-5'>
              <Link href="/api/auth/signout" className="py-1 border-b-2 text-medium border-transparent ml-3">
                <button className='bg-red-500 text-white font-semibold py-2 
                px-2 my-8 rounded-lg hover:bg-red-600  hover:text-red-200' >Sign-Out</button>
              </Link>
            </div>

            : <div className='flex flex-row-reverse '>
              <Link href="/api/auth/signin" className="py-1 border-b-2 text-medium border-transparent ml-4">
                <button className='bg-blue-500 text-white font-semibold py-2 
                px-2 my-8 rounded-lg hover:bg-blue-400   hover:text-blue-500' > Sign-in</button>
              </Link>
              <Link href="/api/auth/register" className="py-1 border-b-2 text-medium border-transparent">
                <button className='bg-blue-500 text-white font-semibold py-2 
                px-2 my-8 rounded-lg hover:bg-blue-400   hover:text-blue-500' > Register</button>
              </Link>
            </div>
          }
        </div>
          
        <div className='h-8 border-r border-default'></div>
        <Link href="/myaccount">
          <Button className='group flex items-center gap-2 rounded-2xl hover:text-primary-default hover:bg-cyan-500 py-2 outline-none text-high'>
              <img
                src={'/img/profilelogo.png'}
                alt="logoprofile"
                className="w-8 h-8 group-hover:border group-hover:border-primary-default group-hover:shadow-primary rounded-full object-cover border-default shadow-default"
              />
              {
                session ? <p className='text-white'>{profile.data.name}</p>
                : <p className='text-white'>Profile</p>
              }
          </Button>
        </Link>
      </div>
    </div>
  )
}
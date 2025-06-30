
import React from 'react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import DashboardLogo from "../../public/Group 16.png"
import clsx from 'clsx';
import { CreateProject } from '@/app/UI/CreateProject';
import { AppbarClient } from '../UI/AppbarClient';
import { FetchProjects } from '../actions/project';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/api/auth/signin')
  }
  const res = await FetchProjects()
  const projects = await res.json()
  
  if(projects.length > 0) {
    redirect('dashboard/projects')
  }
  
  return (
    <div className={ clsx( 
      'w-[100vw] h-[100vh] flex flex-col items-center' ,
      ' sm:bg-blue-400' ,
      ' xl:w-full xl:h-[100vh]' ,
      ' md:w-full md:h-[100vh]' ,
      ' lg:w-full lg:h-[100vh]' ,
     )} >
      <AppbarClient />
      <div className={ clsx( 
        ' w-full h-[6vh] text-3xl text-white font-extrabold flex items-center justify-center ' ,
        ' sm:text-5xl ' ,
        ' md:text-4xl ' ,
        ' lg:text-5xl ' ,
        ' xl:text-4xl xl:h-[7vh] ' ,
       ) } > Create a Project </div>
      <div className={ clsx( ' w-[90%] h-[40vh] flex flex-col items-center justify-evenly ' , 
         ' sm:w-[80%] sm:h-[40vh] ' ,
         ' md:w-[85%] md:h-[35vh] ' ,
         ' lg:w-[80%] lg:h-[35vh] ' ,
         ' xl:w-[50%] xl:h-[55vh] ' ,
      )}>
          <Image src={DashboardLogo} className= { clsx( ' w-[70vw] h-[20vh] ' , 
            ' md:h-[20vh] md:w-[40vw] ' ,
            ' lg:h-[20vh] lg:w-[40vw] ' ,
            ' xl:h-[30vh] xl:w-[25vw] ' ,
          )} alt="Dashboard Logo" />
          <p className= { clsx( ' w-[95%] text-center ' ) } >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, dolore. Autem eius, sed unde deserunt suscipit, labore hic, dignissimos minima dicta ducimus repudiandae obcaecati impedit architecto voluptate doloribus quas illum!</p>
      </div>
      <div >
        <CreateProject />
      </div>
    </div>
  )
}
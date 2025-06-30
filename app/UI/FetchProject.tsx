"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Project = {
  _id: string;
  name: string;
  description: string;
};

function FetchProject() {
  const [projects, setProjects] = useState<Project[]>([])
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/projects')
        setProjects(res.data)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    })()
  }, [])

  const handleRedirect = (projectId: string) => {
    router.push(`projects/${projectId}`)
  }

  return (
    <div >
      {projects.length === 0 ? (
        <div>Create New Projects</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 min-w-full h-full">
          {projects.map((project) => (
            <button
              key={project._id}
              onClick={() => handleRedirect(project._id)}
              className="border w-[25vw] p-2 gap-3 h-[15vh] flex justify-center items-center rounded-lg hover:bg-blue-500 transition"
            >
              <div className='w-[5vw] h-[10vh] text-3xl flex items-center justify-center rounded-xl'>
                {project?.name[0]}
              </div>
              <div>
                <div className="font-bold">Project Name: {project?.name}</div>
                <div>Description: {project?.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FetchProject

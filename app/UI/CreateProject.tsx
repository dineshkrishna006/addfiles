"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateProject() {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!projectName.trim()) return

      const response = await axios.post("/api/projects", {
        name: projectName,
        description: projectDescription,
      })

      if (response.status === 201) {
        router.push("/dashboard/projects") // ✅ works now
      }
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#211935] text-white" variant="outline">
          Create New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="project-name">Enter your project name</Label>
              <Input
                id="project-name"
                name="name"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="project-description">Project Description</Label>
              <Input
                id="project-description"
                name="description"
                placeholder="Project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="submit">Create Project</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

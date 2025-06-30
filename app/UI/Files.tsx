"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"

interface file {
  _id:string,
  name:string,
  createdAt:string
}

interface FilesProps {
  files: file[];
  onDelete: (fileId: string) => void;
}

export default function Files({ files, onDelete }: FilesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>File Name</TableHead>
          <TableHead>Upload Date & Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file, index) => (
          <TableRow key={file._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-center flex gap-2 justify-center items-center">
              <Button>Edit</Button>
              <Button onClick={() => onDelete(file._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

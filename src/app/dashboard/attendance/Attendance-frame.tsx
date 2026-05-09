"use client"
import { Button } from "@/components/ui/button"
import { Plus, UserRound } from "lucide-react"
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AttendanceTable from "./Attendance.Table";
interface StudentFramesProps {
  onAddStudent: () => void;
  onEditStudent: () => void;
  onViewStudent: () => void;
}



export default function AttendanceFrame({onAddStudent, onEditStudent, onViewStudent}:StudentFramesProps ) {

  return (
    <div>
       <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600">
            <UserRound size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Student Records</h1>
            <p className="text-xs text-slate-400">Manage and view all student details</p>
          </div>
        </div>
        <Button onClick={onAddStudent} className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer">
          <span className="text-base leading-none font-light">+</span> Add Student
        </Button>
      </div>

      <AttendanceTable
         onAddStudent={onAddStudent}
          onEditStudent={onEditStudent}
          onViewStudent={onViewStudent}
        />
      
    </div>
  )
}



"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Delete, Edit, Eye, UserRound } from "lucide-react";
import { Course, courses } from "@/data/coursesdumydata";


export default function AttendanceTable({onAddStudent, onEditStudent,onViewStudent}:{onAddStudent: () => void, onEditStudent: () => void, onViewStudent: () => void}) {
  const [statusFilter, setStatusFilter] = useState("all");

  // const filteredStudents = Course.filter((Course) => {
  //   const matchSearch =
  //     Course.name.toLowerCase().includes(search.toLowerCase())

  //   const matchStatus =
  //     statusFilter === "all" || Course.status === statusFilter

  //   return matchSearch && matchStatus
  // })

  return (
    <div className="w-full flex flex-col mt-5">

      {/* 📋 Table Card */}
      <Card className="w-full shadow-lg border gap-0! border-slate-200 rounded-2xl overflow-hidden bg-white">

        {/* 🔍 Search + Filter Section */}
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between bg-white border-b border-slate-100 p-0 px-4">
          <Input
            placeholder="Search by name..."
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 text-sm border-slate-200 bg-slate-50 shadow-sm focus-visible:ring-indigo-400 rounded-lg placeholder:text-slate-400 cursor-pointer"
          />

          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-44 h-9 text-sm border-slate-200 shadow-sm rounded-lg bg-slate-50 focus:ring-indigo-400 cursor-pointer">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-xl border-slate-100">
              <SelectItem value="all" className="text-sm">All Status</SelectItem>
              <SelectItem value="Active" className="text-sm">Active</SelectItem>
              <SelectItem value="Completed" className="text-sm">Completed</SelectItem>
              <SelectItem value="Pending" className="text-sm">Pending</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        {/* 📊 Table Section */}
        <CardContent className="p-0">
          <Table className="p-0">
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-14 pl-6">SNO</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Branch Name</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {["Active", "Inactive", "Active", "Pending", "Completed"].map((status, index) => (
                <AttendanceTableRow key={index} status={status} onAddStudent={onAddStudent} onEditStudent={onEditStudent} onViewStudent={onViewStudent} />
              ))}

              {/* {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No students found
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </CardContent>

      </Card>

    </div>
  );
}

function AttendanceTableRow({ status = "Active", onAddStudent, onEditStudent, onViewStudent }: { status?: string; onAddStudent: () => void; onEditStudent: () => void; onViewStudent: () => void }) {

  const statusStyles: Record<string, { badge: string; dot: string; label: string }> = {
    Active: {
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200 ",
      dot: "bg-emerald-500",
      label: "Active",
    },
    Inactive: {
      badge: "bg-red-50 text-red-600 border border-red-200",
      dot: "bg-red-500",
      label: "Inactive",
    },
    Completed: {
      badge: "bg-blue-50 text-blue-600 border border-blue-200",
      dot: "bg-blue-500",
      label: "Completed",
    },
    Pending: {
      badge: "bg-amber-50 text-amber-600 border border-amber-200",
      dot: "bg-amber-400",
      label: "Pending",
    },
  };

  const current = statusStyles[status] ?? {
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    dot: "bg-slate-400",
    label: status,
  };

  return (
    <TableRow
      key={1}
      className="group border-b border-slate-100 hover:bg-indigo-50/40 transition-colors duration-150"
    >
      <TableCell className="pl-6 text-sm text-slate-400 font-medium w-14">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
          1
        </span>
      </TableCell>
      <TableCell className="text-sm font-semibold text-slate-800">Ch</TableCell>
      <TableCell className="text-sm text-slate-500">mad</TableCell>
      <TableCell>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${current.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
          {current.label}
        </span>
      </TableCell>
      <TableCell className="text-sm text-slate-600">—</TableCell>
      <TableCell className="text-sm text-slate-600">—</TableCell>

      <TableCell className="text-right pr-6">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={onViewStudent}
            className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg transition-all duration-150 shadow-none cursor-pointer"
          >
            <Eye size={14} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onEditStudent}
            className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 rounded-lg transition-all duration-150 shadow-none cursor-pointer"
          >
            <Edit size={14} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            // onClick={() => onDeleteCourse(course)}
            className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 rounded-lg transition-all duration-150 shadow-none cursor-pointer"
          >
            <Delete size={14} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
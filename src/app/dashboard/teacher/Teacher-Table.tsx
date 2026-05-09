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
import { Edit, Eye } from "lucide-react";
import TeacherDelete from "./Teacher-Delete";
import { Teacher } from "@/lib/type";
import { useDeleteTeacher } from "./mutation";

interface TeacherInterface {
  onViewTeacher: (teacher: Teacher) => void;
  onEditTeacher: (teacher: Teacher) => void;
  teachersData: Teacher[];
}

export default function TeacherTable({
  teachersData,
  onEditTeacher,
  onViewTeacher,
}: TeacherInterface) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || teacher.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col mt-5">
      <Card className="w-full shadow-lg border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white border-b border-slate-100 p-4">
          <Input
            placeholder="Search by teacher name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-sm h-9 text-sm border-slate-200 bg-slate-50 shadow-sm rounded-lg"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44 h-9 text-sm border-slate-200 shadow-sm rounded-lg bg-slate-50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-xl border-slate-100">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="DOUBT_TEACHER">Doubt Teacher</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="text-xs w-14 pl-6">S.NO</TableHead>
                <TableHead className="text-xs">Teacher Name</TableHead>
                <TableHead className="text-xs">Teacher Id</TableHead>
                <TableHead className="text-xs">Phone</TableHead>
                <TableHead className="text-xs">Email</TableHead>
                <TableHead className="text-xs">Salary</TableHead>
                {/* <TableHead className="text-xs">Joining Date</TableHead> */}
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher, index) => (
                  <TeacherTableRow
                    index={index}
                    key={teacher.id}
                    teacher={teacher}
                    onEditTeacher={onEditTeacher}
                    onViewTeacher={onViewTeacher}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-sm text-slate-500"
                  >
                    No teachers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TeacherTableRow({
  index,
  teacher,
  onEditTeacher,
  onViewTeacher,
}: {
  index: number;
  teacher: Teacher;
  onEditTeacher: (teacher: Teacher) => void;
  onViewTeacher: (teacher: Teacher) => void;
}) {
  const deleteMutation = useDeleteTeacher();

  const statusStyles: Record<
    string,
    { badge: string; dot: string; label: string }
  > = {
    FULL_TIME: {
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      dot: "bg-emerald-500",
      label: "Full Time",
    },
    DOUBT_TEACHER: {
      badge: "bg-amber-50 text-amber-700 border border-amber-200",
      dot: "bg-amber-500",
      label: "Doubt Teacher",
    },
  };

  const current = statusStyles[teacher.status] ?? {
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    dot: "bg-slate-400",
    label: teacher.status,
  };

  return (
    <TableRow className="group border-b border-slate-100 hover:bg-indigo-50/40 transition">
      <TableCell className="pl-6 text-sm text-slate-400 w-14">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-xs">
          {index + 1}
        </span>
      </TableCell>

      <TableCell className="text-sm ">
          {teacher.id}
      </TableCell>
      <TableCell className="text-sm font-semibold text-slate-800">
        {teacher.name}
      </TableCell>


      <TableCell className="text-sm text-slate-600">{teacher.phone}</TableCell>

      <TableCell className="text-sm text-slate-600">{teacher.email}</TableCell>

      <TableCell className="text-sm text-slate-600">
        ₹ {teacher.salaryAmount}
      </TableCell>

      {/* <TableCell className="text-sm text-slate-600">
        {teacher.joiningDate
          ? new Date(teacher.joiningDate).toLocaleDateString()
          : "N/A"}
      </TableCell> */}

      <TableCell>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${current.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
          {current.label}
        </span>
      </TableCell>

      <TableCell className="text-right pr-6">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewTeacher(teacher)}
            className="h-8 w-8 p-0 rounded-lg"
          >
            <Eye size={14} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditTeacher(teacher)}
            className="h-8 w-8 p-0 rounded-lg"
          >
            <Edit size={14} />
          </Button>

          <TeacherDelete
            teacherName={teacher.name}
            isPending={deleteMutation.isPending}
            onConfirm={() => deleteMutation.mutate(teacher.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

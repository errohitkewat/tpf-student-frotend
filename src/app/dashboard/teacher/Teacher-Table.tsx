"use client";

import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Teacher } from "@/lib/type";
import TeacherDelete from "./Teacher-Delete";
import { useDeleteTeacher } from "./mutation";

type Props = {
  teachers: Teacher[];
  onViewTeacher: (teacher: Teacher) => void;
  onEditTeacher: (teacher: Teacher) => void;
};

const money = (value?: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

export default function TeacherTable({
  teachers,
  onViewTeacher,
  onEditTeacher,
}: Props) {
  if (teachers.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">
          No teacher records found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Teacher</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Qualification</th>
              <th className="px-5 py-4">Salary</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {teachers.map((teacher) => (
              <TeacherRow
                key={teacher.id}
                teacher={teacher}
                onViewTeacher={onViewTeacher}
                onEditTeacher={onEditTeacher}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeacherRow({
  teacher,
  onViewTeacher,
  onEditTeacher,
}: {
  teacher: Teacher;
  onViewTeacher: (teacher: Teacher) => void;
  onEditTeacher: (teacher: Teacher) => void;
}) {
  const deleteTeacher = useDeleteTeacher();

  return (
    <tr className="text-sm text-slate-700 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <p className="font-semibold text-slate-950">{teacher.name}</p>
        <p className="mt-1 text-xs text-slate-400">
          {teacher.code || "No code"} • {teacher.email || "No email"}
        </p>
      </td>

      <td className="px-5 py-4">{teacher.phone || "—"}</td>

      <td className="px-5 py-4">{teacher.qualification || "—"}</td>

      <td className="px-5 py-4 font-medium text-slate-900">
        {money(teacher.salaryAmount)}
      </td>

      <td className="px-5 py-4">{teacher.status}</td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            teacher.isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {teacher.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onViewTeacher(teacher)}
            className="h-9 rounded-lg border-slate-200 px-3"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => onEditTeacher(teacher)}
            className="h-9 rounded-lg bg-slate-950 px-3 text-white hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <TeacherDelete
            teacherName={teacher.name}
            isPending={deleteTeacher.isPending}
            onConfirm={() => deleteTeacher.mutate(teacher.id)}
          />
        </div>
      </td>
    </tr>
  );
}
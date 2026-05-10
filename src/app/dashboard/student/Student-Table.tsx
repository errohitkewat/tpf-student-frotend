"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/lib/type";
import { useDeleteStudent } from "./mutation";
import StudentDelete from "./Student-delete";

interface Props {
  studentsData: Student[];
  onEditStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;
}

const date = (value?: string | Date) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function StudentTable({
  studentsData,
  onEditStudent,
  onViewStudent,
}: Props) {
  if (studentsData.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">
          No student records found
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
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Mobile</th>
              <th className="px-5 py-4">College</th>
              <th className="px-5 py-4">Branch</th>
              <th className="px-5 py-4">Admission</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {studentsData.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onEditStudent={onEditStudent}
                onViewStudent={onViewStudent}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentRow({
  student,
  onEditStudent,
  onViewStudent,
}: {
  student: Student;
  onEditStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;
}) {
  const deleteStudent = useDeleteStudent();

  return (
    <tr className="text-sm text-slate-700 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <p className="font-semibold text-slate-950">{student.name}</p>
        <p className="mt-1 text-xs text-slate-400">{student.email}</p>
      </td>

      <td className="px-5 py-4">{student.mobile || "—"}</td>

      <td className="px-5 py-4">{student.collegeName || "—"}</td>

      <td className="px-5 py-4">{student.branchName || "—"}</td>

      <td className="px-5 py-4">{date(student.admissionDate)}</td>

      <td className="px-5 py-4">
        <StatusBadge status={student.status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onViewStudent(student)}
            className="h-9 rounded-lg border-slate-200 px-3"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => onEditStudent(student)}
            className="h-9 rounded-lg bg-slate-950 px-3 text-white hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <StudentDelete
            studentName={student.name}
            isPending={deleteStudent.isPending}
            onConfirm={() => deleteStudent.mutate(student.id)}
          />
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "ACTIVE"
      ? "bg-emerald-50 text-emerald-700"
      : status === "COMPLETED"
      ? "bg-indigo-50 text-indigo-700"
      : status === "DROPPED"
      ? "bg-red-50 text-red-700"
      : "bg-amber-50 text-amber-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
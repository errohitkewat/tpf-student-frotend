"use client";

import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/type";
import CourseDelete from "./Course-Delete";
import { useDeleteCourse } from "./mutation";

type Props = {
  courses: Course[];
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
};

const money = (value?: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

export default function CourseTable({
  courses,
  onViewCourse,
  onEditCourse,
}: Props) {
  if (courses.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">
          No course records found
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
              <th className="px-5 py-4">Course</th>
              <th className="px-5 py-4">Duration</th>
              <th className="px-5 py-4">Mode</th>
              <th className="px-5 py-4">Total Fee</th>
              <th className="px-5 py-4">Offered Fee</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <CourseRow
                key={course.id}
                course={course}
                onViewCourse={onViewCourse}
                onEditCourse={onEditCourse}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CourseRow({
  course,
  onViewCourse,
  onEditCourse,
}: {
  course: Course;
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
}) {
  const deleteCourse = useDeleteCourse();

  return (
    <tr className="text-sm text-slate-700 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <p className="font-semibold text-slate-950">{course.title}</p>
        <p className="mt-1 line-clamp-1 text-xs text-slate-400">
          {course.descriptionInShort || "No short description"}
        </p>
      </td>

      <td className="px-5 py-4">{course.duration} Months</td>

      <td className="px-5 py-4">{course.instractionMode || "—"}</td>

      <td className="px-5 py-4 font-medium text-slate-900">
        {money(course.totalFees)}
      </td>

      <td className="px-5 py-4 font-medium text-slate-900">
        {money(course.offeredFees)}
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            course.isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {course.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onViewCourse(course)}
            className="h-9 rounded-lg border-slate-200 px-3"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => onEditCourse(course)}
            className="h-9 rounded-lg bg-slate-950 px-3 text-white hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <CourseDelete
            courseName={course.title}
            isPending={deleteCourse.isPending}
            onConfirm={() => deleteCourse.mutate(course.id)}
          />
        </div>
      </td>
    </tr>
  );
}
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
import { Edit, Eye, Trash2 } from "lucide-react";

import { Course } from "@/lib/type";
import { useDeleteCourse } from "./mutation";
import CourseDelete from "./Course-Delete";

interface CourseTableProps {
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
  courseData: Course[];
}

export default function CourseTable({
  onViewCourse,
  onEditCourse,
  courseData,
}: CourseTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCourses = courseData.filter((course) => {
    const title = course?.title?.toLowerCase() || "";
    const searchValue = search?.toLowerCase() || "";

    const matchSearch = title.includes(searchValue);

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "ACTIVE" && course.isActive) ||
      (statusFilter === "INACTIVE" && !course.isActive);

    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full flex flex-col mt-5">
      <Card className="w-full shadow-lg border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-4">
          <Input
            placeholder="Search by course title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-sm h-9 bg-slate-50"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44 h-9 bg-slate-50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-6">S.NO</TableHead>
                <TableHead>Course ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <CourseRow
                    key={course.id}
                    course={course}
                    index={index}
                    onViewCourse={onViewCourse}
                    onEditCourse={onEditCourse}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10">
                    No courses found
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

function CourseRow({
  course,
  index,
  onViewCourse,
  onEditCourse,
}: {
  course: Course;
  index: number;
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
}) {
  const { mutate: deleteCourse, isPending } = useDeleteCourse();

  const status = course.isActive
    ? "bg-emerald-100 text-emerald-700"
    : "bg-slate-100 text-slate-600";

  return (
    <TableRow className="hover:bg-indigo-50/40">
      <TableCell className="pl-6">
        <span className="h-6 w-6 flex items-center justify-center bg-slate-100 rounded-full text-xs">
          {index + 1}
        </span>
      </TableCell>

      <TableCell className="text-sm">{course.id}</TableCell>

      <TableCell className="font-medium">{course.title}</TableCell>

      <TableCell>
        <span className={`px-2 py-1 text-xs rounded-full ${status}`}>
          {course.isActive ? "Active" : "Inactive"}
        </span>
      </TableCell>

      <TableCell>{course.duration}</TableCell>

      <TableCell>₹ {course.totalFees}</TableCell>

      <TableCell>{course.instractionMode || "N/A"}</TableCell>

      <TableCell>
        {course.createdAt
          ? new Date(course.createdAt).toLocaleDateString()
          : "N/A"}
      </TableCell>

      <TableCell className="text-right pr-6">
        <div className="flex justify-end gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => onViewCourse(course)}
          >
            <Eye size={14} />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => onEditCourse(course)}
          >
            <Edit size={14} />
          </Button>

          <CourseDelete
            courseTitle={course.title}
            isPending={isPending}
            onConfirm={() => deleteCourse(course.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

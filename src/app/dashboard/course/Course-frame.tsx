"use client";

import CourseTable from "./Course-Table";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Course } from "@/lib/type";

type CourseResponse = {
  data: Course[];
};

interface CourseFramesProps {
  onAddCourse: () => void;
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
}

function Courseframe({
  onAddCourse,
  onViewCourse,
  onEditCourse,
}: CourseFramesProps) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await kyInstance.get("courses").json<CourseResponse>();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading text="Courses are loading" />;
  }

  if (isError) {
    return <Error text="Something went wrong" />;
  }

  return (
    <div className="space-y-6 overflow-hidden font-[Poppins,sans-serif]">
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-200">
                <BookOpen className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-indigo-900 tracking-tight leading-tight">
                  Course Management
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Manage and track student courses
                </p>
              </div>
            </div>

            <Button
              onClick={onAddCourse}
              className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </div>
        </CardContent>
      </Card>

      <CourseTable
        courseData={data || []}
        onViewCourse={onViewCourse}
        onEditCourse={onEditCourse}
      />
    </div>
  );
}

export default Courseframe;

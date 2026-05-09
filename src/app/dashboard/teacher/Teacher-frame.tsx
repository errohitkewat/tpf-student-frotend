"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import TeacherTable from "../teacher/Teacher-Table";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Teacher } from "@/lib/type";

type TeachersResponse = {
  data: Teacher[];
};

interface TeacherFramesProps {
  onEditTeacher: (teacher: Teacher) => void;
  onViewTeacher: (teacher: Teacher) => void;
  onAddTeacher: () => void;
  onDeleteTeacher: (teacher: Teacher) => void;
}

export default function TeacherFrame({
  onAddTeacher,
  onEditTeacher,
  onViewTeacher,
  onDeleteTeacher,
}: TeacherFramesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await kyInstance.get("teachers").json<TeachersResponse>();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading text="Teachers are Loading" />;
  }

  if (isError) {
    return <Error text="Something is Wrong" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600">
            <User size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Teachers
            </h1>
            <p className="text-xs text-slate-400">Manage and view teachers</p>
          </div>
        </div>

        <Button
          onClick={onAddTeacher}
          className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
        >
          <span className="text-base leading-none font-light">+</span>
          Add Teacher
        </Button>
      </div>

      <TeacherTable
        teachersData={data || []}
        onEditTeacher={onEditTeacher}
        onViewTeacher={onViewTeacher}
      />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { UserRound, Plus } from "lucide-react";
import StudentTable from "./Student-Table";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Student } from "@/lib/type";

type StudentsResponse = {
  data: Student[];
};

interface StudentFrameProps {
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;
}

export default function Studentframe({
  onAddStudent,
  onEditStudent,
  onViewStudent,
}: StudentFrameProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await kyInstance.get("students").json<StudentsResponse>();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading text="Students are Loading" />;
  }

  if (isError) {
    return <Error text="Something is Wrong" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600">
            <UserRound size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Students
            </h1>
            <p className="text-xs text-slate-400">Manage and view students</p>
          </div>
        </div>

        <Button
          onClick={onAddStudent}
          className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      <StudentTable
        studentsData={data || []}
        onAddStudent={onAddStudent}
        onEditStudent={onEditStudent}
        onViewStudent={onViewStudent}
      />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, UserCheck, UserRound, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Student, StudentStatus } from "@/lib/type";
import StudentTable from "./Student-Table";

type StudentsResponse = {
  data: Student[];
};

interface Props {
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;
}

export default function Studentframe({
  onAddStudent,
  onEditStudent,
  onViewStudent,
}: Props) {
  const [search, setSearch] = useState("");

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await kyInstance.get("students").json<StudentsResponse>();
      return res.data || [];
    },
  });

  const filteredStudents = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return data;

    return data.filter((student) => {
      return (
        student.name?.toLowerCase().includes(value) ||
        student.email?.toLowerCase().includes(value) ||
        student.mobile?.includes(value) ||
        student.branchName?.toLowerCase().includes(value) ||
        student.collegeName?.toLowerCase().includes(value)
      );
    });
  }, [data, search]);

  const stats = {
    total: data.length,
    active: data.filter((s) => s.status === StudentStatus.ACTIVE).length,
    completed: data.filter((s) => s.status === StudentStatus.COMPLETED).length,
    dropped: data.filter((s) => s.status === StudentStatus.DROPPED).length,
  };

  if (isLoading) return <Loading text="Students are loading..." />;
  if (isError) return <Error text="Failed to load students" />;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              Student Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Students
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Manage student profiles, admissions, batches, academic status and contact details from one clean module.
            </p>
          </div>

          <Button
            onClick={onAddStudent}
            className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Students" value={stats.total} icon={Users} />
        <StatCard title="Active" value={stats.active} icon={UserCheck} />
        <StatCard title="Completed" value={stats.completed} icon={GraduationCap} />
        <StatCard title="Dropped" value={stats.dropped} icon={UserRound} />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Student Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search, view and update student information.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, email..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        <StudentTable
          studentsData={filteredStudents}
          onEditStudent={onEditStudent}
          onViewStudent={onViewStudent}
        />
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
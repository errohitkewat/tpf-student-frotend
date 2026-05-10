"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  Layers,
  Plus,
  Search,
  Users,
} from "lucide-react";
import kyInstance from "@/lib/ky";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Batch, BatchStatus } from "@/lib/type";
import BatchTable from "./Batch-Table";

type ApiResponse<T> = {
  data: T;
};

type Props = {
  onAddBatch: () => void;
  onViewBatch: (batch: Batch) => void;
  onEditBatch: (batch: Batch) => void;
};

async function getBatches() {
  const res = await kyInstance.get("batches").json<ApiResponse<Batch[]>>();
  return res.data || [];
}

export default function BatchFrame({
  onAddBatch,
  onViewBatch,
  onEditBatch,
}: Props) {
  const [search, setSearch] = useState("");

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["batches"],
    queryFn: getBatches,
  });

  const filteredBatches = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return data;

    return data.filter((batch) => {
      return (
        batch.name?.toLowerCase().includes(value) ||
        batch.batchCode?.toLowerCase().includes(value) ||
        batch.course?.title?.toLowerCase().includes(value) ||
        batch.teacher?.name?.toLowerCase().includes(value) ||
        batch.roomNo?.toLowerCase().includes(value)
      );
    });
  }, [data, search]);

  const stats = {
    total: data.length,
    ongoing: data.filter((b) => b.status === BatchStatus.ONGOING).length,
    completed: data.filter((b) => b.status === BatchStatus.COMPLETED).length,
    students: data.reduce(
      (sum, batch) => sum + Number(batch.students?.length || 0),
      0
    ),
  };

  if (isLoading) return <Loading text="Batches are loading..." />;
  if (isError) return <Error text="Failed to load batches" />;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              Batch Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Batches
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Manage batch schedules, assigned teachers, courses, capacity and
              student strength from one clean module.
            </p>
          </div>

          <Button
            onClick={onAddBatch}
            className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Batch
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Batches" value={stats.total} icon={Layers} />
        <StatCard title="Ongoing" value={stats.ongoing} icon={Clock} />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle} />
        <StatCard title="Students" value={stats.students} icon={Users} />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Batch Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search, view and update batch information.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search batch, course, teacher..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        <BatchTable
          batches={filteredBatches}
          onViewBatch={onViewBatch}
          onEditBatch={onEditBatch}
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
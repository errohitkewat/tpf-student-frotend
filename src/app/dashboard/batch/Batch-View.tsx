"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  Layers,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Batch } from "@/lib/type";

const date = (value?: string | Date) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function BatchView({
  batch,
  onBack,
}: {
  batch: Batch;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="rounded-xl border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Layers size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Batch Details
            </h1>
            <p className="text-sm text-slate-500">
              Complete overview of selected batch.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm text-indigo-100">Batch Program</p>
        <h2 className="mt-1 text-2xl font-bold">{batch.name}</h2>
        <p className="mt-2 text-sm text-indigo-100">
          {batch.course?.title || "Course"} • {batch.teacher?.name || "Teacher"}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Summary label="Status" value={batch.status} />
        <Summary label="Capacity" value={String(batch.capacity || 0)} />
        <Summary
          label="Students"
          value={`${batch.students?.length || 0}/${batch.capacity || 0}`}
        />
        <Summary label="Room" value={batch.roomNo || "—"} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Batch Information" icon={Layers}>
          <Info label="Batch Name" value={batch.name} />
          <Info label="Batch Code" value={batch.batchCode} />
          <Info label="Status" value={batch.status} />
          <Info label="Room No" value={batch.roomNo} />
          <Info label="Capacity" value={batch.capacity} />
        </Card>

        <Card title="Course & Teacher" icon={BookOpen}>
          <Info label="Course" value={batch.course?.title} />
          <Info label="Teacher" value={batch.teacher?.name} />
          <Info label="Teacher Phone" value={batch.teacher?.phone} />
          <Info label="Teacher Email" value={batch.teacher?.email} />
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Schedule" icon={CalendarDays}>
          <Info label="Start Date" value={date(batch.startDate)} />
          <Info label="End Date" value={date(batch.endDate)} />
          <Info label="Timing" value={batch.scheduleTime} />
          <Info
            label="Created On"
            value={date(batch.createdAt)}
          />
        </Card>

        <Card title="Student Strength" icon={Users}>
          <Info label="Total Students" value={batch.students?.length || 0} />
          <Info label="Enrollments" value={batch.enrollments?.length || 0} />
          <Info
            label="Available Seats"
            value={Math.max(
              Number(batch.capacity || 0) - Number(batch.students?.length || 0),
              0
            )}
          />
        </Card>
      </section>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
    </div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={20} />
        </div>
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-right text-sm font-semibold text-slate-900">
        {value || "—"}
      </p>
    </div>
  );
}
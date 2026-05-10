"use client";

import { ArrowLeft, CalendarDays, IndianRupee, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Teacher } from "@/lib/type";

const money = (value?: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const date = (value?: string | Date) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TeacherView({
  teacher,
  onBack,
}: {
  teacher: Teacher;
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
            <UserRound size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Teacher Details
            </h1>
            <p className="text-sm text-slate-500">
              Complete overview of selected teacher.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm text-indigo-100">Faculty Profile</p>
        <h2 className="mt-1 text-2xl font-bold">{teacher.name}</h2>
        <p className="mt-2 text-sm text-indigo-100">
          {teacher.phone} • {teacher.email}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Summary label="Status" value={teacher.isActive ? "Active" : "Inactive"} />
        <Summary label="Type" value={teacher.status} />
        <Summary label="Salary" value={money(teacher.salaryAmount)} />
        <Summary label="Joining" value={date(teacher.joiningDate)} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Basic Information" icon={UserRound}>
          <Info label="Name" value={teacher.name} />
          <Info label="Code" value={teacher.code} />
          <Info label="Qualification" value={teacher.qualification} />
          <Info label="Teacher Type" value={teacher.status} />
          <Info label="Active Status" value={teacher.isActive ? "Active" : "Inactive"} />
        </Card>

        <Card title="Contact Information" icon={CalendarDays}>
          <Info label="Phone" value={teacher.phone} />
          <Info label="Alternate Phone" value={teacher.alternatePhone} />
          <Info label="Email" value={teacher.email} />
          <Info label="Professional Email" value={teacher.professionalEmail} />
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Job Details" icon={IndianRupee}>
          <Info label="Salary Amount" value={money(teacher.salaryAmount)} />
          <Info label="Joining Date" value={date(teacher.joiningDate)} />
          <Info label="Created On" value={date(teacher.createdAt)} />
        </Card>

        <Card title="Assigned Batches" icon={UserRound}>
          <Info label="Total Batches" value={teacher.batches?.length || 0} />
          <div className="space-y-2">
            {teacher.batches?.length ? (
              teacher.batches.map((batch) => (
                <div
                  key={batch.id}
                  className="rounded-xl bg-slate-50 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {batch.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {batch.course?.title || "Course"} • {batch.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                No batch assigned
              </p>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-950">{value || "—"}</p>
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
"use client";

import { ArrowLeft, GraduationCap, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/lib/type";

export default function StudentView({
  student,
  onBack,
}: {
  student: Student;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UserRound size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">Student Details</h1>
            <p className="text-sm text-slate-500">Complete student profile overview.</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm text-indigo-100">Student Profile</p>
        <h2 className="mt-1 text-2xl font-bold">{student.name}</h2>
        <p className="mt-2 text-sm text-indigo-100">
          {student.mobile} • {student.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Summary label="Status" value={student.status} />
        <Summary label="Gender" value={student.gender} />
        <Summary label="Batch" value={student.batch?.name || "—"} />
        <Summary label="Admission" value={formatDate(student.admissionDate)} />
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Personal Details">
          <Info label="Name" value={student.name} />
          <Info label="Gender" value={student.gender} />
          <Info label="DOB" value={formatDate(student.DOB)} />
          <Info label="Mobile" value={student.mobile} />
          <Info label="Alternate Mobile" value={student.alternateMobile} />
          <Info label="Email" value={student.email} />
          <Info label="Address" value={student.address} />
        </Card>

        <Card title="Academic Details">
          <Info label="College" value={student.collegeName} />
          <Info label="Branch" value={student.branchName} />
          <Info label="Batch" value={student.batch?.name} />
          <Info label="Admission Date" value={formatDate(student.admissionDate)} />
          <Info
            label="Courses"
            value={
              student.course?.length
                ? student.course.map((course) => course.title).join(", ")
                : "—"
            }
          />
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Father Details">
          <Info label="Father Name" value={student.fatherName} />
          <Info label="Father Contact" value={student.fatherContact} />
          <Info label="Father Occupation" value={student.fatherOccupation} />
        </Card>

        <Card title="Mother Details">
          <Info label="Mother Name" value={student.motherName} />
          <Info label="Mother Contact" value={student.motherContact} />
          <Info label="Mother Occupation" value={student.motherOccupation} />
        </Card>
      </section>
    </div>
  );
}

function formatDate(value?: string | Date) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-950">{value || "—"}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <GraduationCap size={20} />
        </div>
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-right text-sm font-semibold text-slate-900">
        {value || "—"}
      </p>
    </div>
  );
}
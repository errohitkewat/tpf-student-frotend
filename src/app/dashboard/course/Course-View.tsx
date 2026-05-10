"use client";

import { ArrowLeft, BookOpen, IndianRupee, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/type";

const money = (value?: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

export default function CourseView({
  course,
  onBack,
}: {
  course: Course;
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
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Course Details
            </h1>
            <p className="text-sm text-slate-500">
              Complete overview of selected course.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm text-indigo-100">Course Program</p>
        <h2 className="mt-1 text-2xl font-bold">{course.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
          {course.descriptionInShort || "No description available"}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Summary label="Duration" value={`${course.duration} Months`} />
        <Summary label="Mode" value={course.instractionMode || "—"} />
        <Summary label="Total Fee" value={money(course.totalFees)} />
        <Summary label="Offered Fee" value={money(course.offeredFees)} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Course Information" icon={BookOpen}>
          <Info label="Course Title" value={course.title} />
          <Info label="Duration" value={`${course.duration} Months`} />
          <Info label="Instruction Mode" value={course.instractionMode} />
          <Info label="Status" value={course.isActive ? "Active" : "Inactive"} />
          <Info
            label="Created On"
            value={new Date(course.createdAt).toLocaleDateString("en-IN")}
          />
        </Card>

        <Card title="Course Fees" icon={IndianRupee}>
          <Info label="Total Fees" value={money(course.totalFees)} />
          <Info label="Offered Fees" value={money(course.offeredFees)} />
          <Info
            label="Discount"
            value={money(Number(course.totalFees || 0) - Number(course.offeredFees || 0))}
          />
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card title="Students & Batches" icon={Users}>
          <Info label="Total Students" value={course.students?.length || 0} />
          <Info label="Total Batches" value={course.batches?.length || 0} />
          <Info label="Enrollments" value={course.enrollments?.length || 0} />
        </Card>

        <Card title="Roadmap" icon={Layers}>
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
            {course.roadmap || "No roadmap added"}
          </p>
        </Card>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">
          Detailed Description
        </h2>

        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {course.descriptionInDetail || "No detailed description added"}
        </p>
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
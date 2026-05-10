"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Layers, Loader2 } from "lucide-react";
import kyInstance from "@/lib/ky";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BatchStatus, Course, Teacher } from "@/lib/type";
import { useCreateBatch } from "./mutation";

type ApiResponse<T> = {
  data: T;
};

async function getCourses() {
  const res = await kyInstance.get("courses").json<ApiResponse<Course[]>>();
  return res.data || [];
}

async function getTeachers() {
  const res = await kyInstance.get("teachers").json<ApiResponse<Teacher[]>>();
  return res.data || [];
}

export default function BatchAdd({ onBack }: { onBack: () => void }) {
  const createBatch = useCreateBatch();

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const [form, setForm] = useState({
    name: "",
    batchCode: "",
    capacity: "",
    startDate: "",
    endDate: "",
    scheduleTime: "",
    roomNo: "",
    courseId: "",
    teacherId: "",
    status: BatchStatus.STARTED,
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createBatch.mutate(
      {
        name: form.name,
        batchCode: form.batchCode,
        capacity: Number(form.capacity),
        startDate: form.startDate,
        endDate: form.endDate,
        scheduleTime: form.scheduleTime,
        roomNo: form.roomNo || undefined,
        courseId: form.courseId,
        teacherId: form.teacherId,
        status: form.status,
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="space-y-6">
      <Header
        title="Add Batch"
        desc="Create a new batch with course, teacher and schedule details."
        onBack={onBack}
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Section title="Batch Details">
          <Field label="Batch Name">
            <Input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Batch Code">
            <Input
              required
              value={form.batchCode}
              onChange={(e) => update("batchCode", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Capacity">
            <Input
              required
              type="number"
              value={form.capacity}
              onChange={(e) => update("capacity", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Room No">
            <Input
              value={form.roomNo}
              onChange={(e) => update("roomNo", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>
        </Section>

        <Section title="Course & Teacher">
          <Field label="Course">
            <Select
              value={form.courseId}
              onValueChange={(value) => update("courseId", value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Teacher">
            <Select
              value={form.teacherId}
              onValueChange={(value) => update("teacherId", value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <Section title="Schedule">
          <Field label="Start Date">
            <Input
              required
              type="date"
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="End Date">
            <Input
              required
              type="date"
              value={form.endDate}
              onChange={(e) => update("endDate", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Schedule Time">
            <Input
              required
              placeholder="Example: 10:00 AM - 12:00 PM"
              value={form.scheduleTime}
              onChange={(e) => update("scheduleTime", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Status">
            <Select
              value={form.status}
              onValueChange={(value) => update("status", value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={BatchStatus.STARTED}>Started</SelectItem>
                <SelectItem value={BatchStatus.ONGOING}>Ongoing</SelectItem>
                <SelectItem value={BatchStatus.COMPLETED}>Completed</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="rounded-xl border-slate-200"
          >
            Cancel
          </Button>

          <Button
            disabled={createBatch.isPending}
            className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
          >
            {createBatch.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Batch
          </Button>
        </div>
      </form>
    </div>
  );
}

function Header({
  title,
  desc,
  onBack,
}: {
  title: string;
  desc: string;
  onBack: () => void;
}) {
  return (
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
          <h1 className="text-xl font-bold text-slate-950">{title}</h1>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <h2 className="mb-4 text-lg font-bold text-slate-950">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
    </div>
  );
}
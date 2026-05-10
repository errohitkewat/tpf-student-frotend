"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, UserRound } from "lucide-react";
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
import { TeacherStatus } from "@/lib/type";
import { useCreateTeacher } from "./mutation";

export default function TeacherAdd({ onBack }: { onBack: () => void }) {
  const createTeacher = useCreateTeacher();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    alternatePhone: "",
    email: "",
    professionalEmail: "",
    qualification: "",
    salaryAmount: "",
    joiningDate: new Date().toISOString().split("T")[0],
    status: TeacherStatus.FULL_TIME,
    code: "",
    isActive: "true",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTeacher.mutate(
      {
        name: form.name,
        phone: form.phone,
        alternatePhone: form.alternatePhone || undefined,
        email: form.email,
        professionalEmail: form.professionalEmail || undefined,
        qualification: form.qualification,
        salaryAmount: Number(form.salaryAmount),
        joiningDate: form.joiningDate,
        status: form.status,
        code: form.code,
        // isActive: form.isActive === "true",
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="space-y-6">
      <Header
        title="Add Teacher"
        desc="Create a new teacher profile with contact and salary details."
        onBack={onBack}
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Section title="Basic Details">
          <Field label="Teacher Name">
            <Input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Teacher Code">
            <Input
              required
              value={form.code}
              onChange={(e) => update("code", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Qualification">
            <Input
              required
              value={form.qualification}
              onChange={(e) => update("qualification", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Joining Date">
            <Input
              required
              type="date"
              value={form.joiningDate}
              onChange={(e) => update("joiningDate", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>
        </Section>

        <Section title="Contact Details">
          <Field label="Phone">
            <Input
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Alternate Phone">
            <Input
              value={form.alternatePhone}
              onChange={(e) => update("alternatePhone", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Email">
            <Input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Professional Email">
            <Input
              type="email"
              value={form.professionalEmail}
              onChange={(e) => update("professionalEmail", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>
        </Section>

        <Section title="Job Details">
          <Field label="Salary Amount">
            <Input
              required
              type="number"
              value={form.salaryAmount}
              onChange={(e) => update("salaryAmount", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Teacher Type">
            <Select
              value={form.status}
              onValueChange={(value) => update("status", value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TeacherStatus.FULL_TIME}>
                  Full Time
                </SelectItem>
                <SelectItem value={TeacherStatus.DOUBT_TEACHER}>
                  Doubt Teacher
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Active Status">
            <Select
              value={form.isActive}
              onValueChange={(value) => update("isActive", value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
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
            disabled={createTeacher.isPending}
            className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
          >
            {createTeacher.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Teacher
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
          <UserRound size={22} />
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
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";
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
import { Batch, Gender, Student, StudentStatus } from "@/lib/type";
import { useUpdateStudent } from "./mutation";

type ApiResponse<T> = {
  data: T;
};

async function getBatches() {
  const res = await kyInstance.get("batches").json<ApiResponse<Batch[]>>();
  return res.data || [];
}

const inputDate = (value?: string | Date) => {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
};

export default function StudentEdit({
  student,
  onBack,
}: {
  student: Student;
  onBack: () => void;
}) {
  const updateStudent = useUpdateStudent();

  const { data: batches = [] } = useQuery({
    queryKey: ["batches"],
    queryFn: getBatches,
  });

  const [form, setForm] = useState({
    name: student.name || "",
    gender: student.gender || Gender.MALE,
    address: student.address || "",
    collegeName: student.collegeName || "",
    branchName: student.branchName || "",
    DOB: inputDate(student.DOB),
    mobile: student.mobile || "",
    alternateMobile: student.alternateMobile || "",
    email: student.email || "",
    fatherName: student.fatherName || "",
    fatherContact: student.fatherContact || "",
    fatherOccupation: student.fatherOccupation || "",
    motherName: student.motherName || "",
    motherContact: student.motherContact || "",
    motherOccupation: student.motherOccupation || "",
    admissionDate: inputDate(student.admissionDate),
    status: student.status || StudentStatus.ACTIVE,
    batchId: student.batchId || student.batch?.id || "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateStudent.mutate(
      {
        studentId: student.id,
        data: {
          ...form,
          alternateMobile: form.alternateMobile || undefined,
          fatherName: form.fatherName || undefined,
          fatherContact: form.fatherContact || undefined,
          fatherOccupation: form.fatherOccupation || undefined,
          motherName: form.motherName || undefined,
          motherContact: form.motherContact || undefined,
          motherOccupation: form.motherOccupation || undefined,
        },
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-bold text-slate-950">Edit Student</h1>
            <p className="text-sm text-slate-500">
              Update student profile and academic details.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Section title="Personal Details">
          <Field label="Student Name">
            <Input required value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Gender">
            <Select value={form.gender} onValueChange={(v) => handleChange("gender", v)}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Gender.MALE}>Male</SelectItem>
                <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                <SelectItem value={Gender.OTHER}>Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Date of Birth">
            <Input required type="date" value={form.DOB} onChange={(e) => handleChange("DOB", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Admission Date">
            <Input required type="date" value={form.admissionDate} onChange={(e) => handleChange("admissionDate", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>
        </Section>

        <Section title="Contact Details">
          <Field label="Mobile">
            <Input required value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Alternate Mobile">
            <Input value={form.alternateMobile} onChange={(e) => handleChange("alternateMobile", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Email">
            <Input required type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Address">
            <Input required value={form.address} onChange={(e) => handleChange("address", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>
        </Section>

        <Section title="Academic Details">
          <Field label="College Name">
            <Input required value={form.collegeName} onChange={(e) => handleChange("collegeName", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Branch Name">
            <Input required value={form.branchName} onChange={(e) => handleChange("branchName", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Batch">
            <Select value={form.batchId} onValueChange={(v) => handleChange("batchId", v)}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Status">
            <Select value={form.status} onValueChange={(v) => handleChange("status", v)}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={StudentStatus.ACTIVE}>Active</SelectItem>
                <SelectItem value={StudentStatus.COMPLETED}>Completed</SelectItem>
                <SelectItem value={StudentStatus.DROPPED}>Dropped</SelectItem>
                <SelectItem value={StudentStatus.SUSPENDED}>Suspended</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <Section title="Parent Details">
          <Field label="Father Name">
            <Input value={form.fatherName} onChange={(e) => handleChange("fatherName", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Father Contact">
            <Input value={form.fatherContact} onChange={(e) => handleChange("fatherContact", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Mother Name">
            <Input value={form.motherName} onChange={(e) => handleChange("motherName", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>

          <Field label="Mother Contact">
            <Input value={form.motherContact} onChange={(e) => handleChange("motherContact", e.target.value)} className="h-11 rounded-xl border-slate-200" />
          </Field>
        </Section>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl border-slate-200">
            Cancel
          </Button>

          <Button disabled={updateStudent.isPending} className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800">
            {updateStudent.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Update Student
          </Button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="mb-4 text-lg font-bold text-slate-950">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
    </div>
  );
}
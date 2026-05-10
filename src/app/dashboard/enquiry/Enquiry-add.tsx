"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, UserPlus } from "lucide-react";
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
import kyInstance from "@/lib/ky";
import { Course, Employee, EnquirySource, Gender } from "@/lib/type";
import { useCreateEnquiry } from "./mutation";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function getCourses() {
  const res = await kyInstance.get("courses").json<ApiResponse<Course[]>>();
  return res.data || [];
}

async function getEmployees() {
  const res = await kyInstance.get("employees").json<ApiResponse<Employee[]>>();
  return res.data || [];
}

export default function EnquiryAdd({ onBack }: { onBack: () => void }) {
  const createEnquiry = useCreateEnquiry();

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const [form, setForm] = useState({
    studentName: "",
    gender: Gender.MALE,
    address: "",
    collegeName: "",
    branchName: "",
    DOB: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    source: EnquirySource.WALK_IN,
    followUpDate: "",
    remarks: "",
    assignedToId: "",
    courseId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createEnquiry.mutate(
      {
        studentName: form.studentName,
        gender: form.gender,
        address: form.address,
        collegeName: form.collegeName,
        branchName: form.branchName,
        DOB: form.DOB,
        mobile: form.mobile,
        alternateMobile: form.alternateMobile || undefined,
        email: form.email,
        source: form.source,
        followUpDate: form.followUpDate || undefined,
        remarks: form.remarks || undefined,
        assignedToId: form.assignedToId,
        courseIds: form.courseId ? [form.courseId] : [],
      },
      { onSuccess: onBack }
    );
  };

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
            <UserPlus size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">Add Enquiry</h1>
            <p className="text-sm text-slate-500">
              Add student lead and follow-up details.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Student Name">
            <Input className="h-11 rounded-xl border-slate-200" required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
          </Field>

          <Field label="Gender">
            <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as Gender })}>
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

          <Field label="Mobile">
            <Input className="h-11 rounded-xl border-slate-200" required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
          </Field>

          <Field label="Alternate Mobile">
            <Input className="h-11 rounded-xl border-slate-200" value={form.alternateMobile} onChange={(e) => setForm({ ...form, alternateMobile: e.target.value })} />
          </Field>

          <Field label="Email">
            <Input type="email" className="h-11 rounded-xl border-slate-200" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>

          <Field label="Date of Birth">
            <Input type="date" className="h-11 rounded-xl border-slate-200" required value={form.DOB} onChange={(e) => setForm({ ...form, DOB: e.target.value })} />
          </Field>

          <Field label="College Name">
            <Input className="h-11 rounded-xl border-slate-200" required value={form.collegeName} onChange={(e) => setForm({ ...form, collegeName: e.target.value })} />
          </Field>

          <Field label="Branch Name">
            <Input className="h-11 rounded-xl border-slate-200" required value={form.branchName} onChange={(e) => setForm({ ...form, branchName: e.target.value })} />
          </Field>

          <Field label="Interested Course">
            <Select value={form.courseId} onValueChange={(v) => setForm({ ...form, courseId: v })}>
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

          <Field label="Source">
            <Select value={form.source} onValueChange={(v) => setForm({ ...form, source: v as EnquirySource })}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EnquirySource.WALK_IN}>Walk In</SelectItem>
                <SelectItem value={EnquirySource.INSTAGRAM}>Instagram</SelectItem>
                <SelectItem value={EnquirySource.FACEBOOK}>Facebook</SelectItem>
                <SelectItem value={EnquirySource.GOOGLE}>Google</SelectItem>
                <SelectItem value={EnquirySource.REFERRAL}>Referral</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Assigned To">
            <Select value={form.assignedToId} onValueChange={(v) => setForm({ ...form, assignedToId: v })}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Follow Up Date">
            <Input type="date" className="h-11 rounded-xl border-slate-200" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
          </Field>

          <div className="md:col-span-2">
            <Field label="Address">
              <Input className="h-11 rounded-xl border-slate-200" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Remarks">
              <Input className="h-11 rounded-xl border-slate-200" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl border-slate-200">
            Cancel
          </Button>

          <Button disabled={createEnquiry.isPending} className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800">
            {createEnquiry.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Enquiry
          </Button>
        </div>
      </form>
    </div>
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

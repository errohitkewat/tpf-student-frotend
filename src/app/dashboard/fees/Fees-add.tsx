"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CreditCard, IndianRupee, Loader2 } from "lucide-react";
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
import { DiscountType, Enrollment, Student } from "@/lib/type";
import { useCreateFeeStructure } from "./mutation";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function getStudents() {
  const res = await kyInstance.get("students").json<ApiResponse<Student[]>>();
  return res.data || [];
}

export default function AddFees({ onBack }: { onBack: () => void }) {
  const createFee = useCreateFeeStructure();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students-for-fee"],
    queryFn: getStudents,
  });

  const [form, setForm] = useState({
    studentId: "",
    enrollmentId: "",
    courseTotalFee: "",
    discountType: DiscountType.PERCENTAGE,
    discountValue: "",
    emiOption: "false",
  });

  const selectedStudent = students.find((s) => s.id === form.studentId);

  const enrollments: Enrollment[] = selectedStudent?.enrollments || [];

  const selectedEnrollment = enrollments.find(
    (e) => e.id === form.enrollmentId
  );

  const feePreview = useMemo(() => {
    const total = Number(form.courseTotalFee || 0);
    const discount = Number(form.discountValue || 0);

    const discountAmount =
      form.discountType === DiscountType.PERCENTAGE
        ? Math.round((total * discount) / 100)
        : discount;

    const finalFee = Math.max(total - discountAmount, 0);

    return { total, discountAmount, finalFee };
  }, [form.courseTotalFee, form.discountType, form.discountValue]);

  const handleStudentChange = (studentId: string) => {
    setForm((prev) => ({
      ...prev,
      studentId,
      enrollmentId: "",
      courseTotalFee: "",
    }));
  };

  const handleEnrollmentChange = (enrollmentId: string) => {
    const enrollment = enrollments.find((e) => e.id === enrollmentId);

    setForm((prev) => ({
      ...prev,
      enrollmentId,
      courseTotalFee: String(
        enrollment?.course?.offeredFees || enrollment?.course?.totalFees || ""
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createFee.mutate(
      {
        courseTotalFee: Number(form.courseTotalFee),
        discountType: form.discountType,
        discountValue: Number(form.discountValue || 0),
        emiOption: form.emiOption === "true",
        enrollmentId: form.enrollmentId,
        studentId: form.studentId,
      },
      {
        onSuccess: onBack,
      }
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
            <CreditCard size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">Add Fee</h1>
            <p className="text-sm text-slate-500">
              Create a new fee record for a student enrollment.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Student">
              <Select
                value={form.studentId}
                onValueChange={handleStudentChange}
                disabled={isLoading}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200">
                  <SelectValue
                    placeholder={isLoading ? "Loading..." : "Select student"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} — {student.mobile}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Enrollment">
              <Select
                value={form.enrollmentId}
                onValueChange={handleEnrollmentChange}
                disabled={!form.studentId}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200">
                  <SelectValue placeholder="Select enrollment" />
                </SelectTrigger>
                <SelectContent>
                  {enrollments.map((enrollment) => (
                    <SelectItem key={enrollment.id} value={enrollment.id}>
                      {enrollment.course?.title || "Course"} —{" "}
                      {enrollment.batch?.name || "Batch"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Course Total Fee">
              <Input
                type="number"
                value={form.courseTotalFee}
                onChange={(e) =>
                  setForm({ ...form, courseTotalFee: e.target.value })
                }
                placeholder="Enter total fee"
                required
                className="h-11 rounded-xl border-slate-200"
              />
            </Field>

            <Field label="Discount Type">
              <Select
                value={form.discountType}
                onValueChange={(value) =>
                  setForm({ ...form, discountType: value as DiscountType })
                }
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DiscountType.PERCENTAGE}>
                    Percentage
                  </SelectItem>
                  <SelectItem value={DiscountType.FIXED}>Fixed</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Discount Value">
              <Input
                type="number"
                value={form.discountValue}
                onChange={(e) =>
                  setForm({ ...form, discountValue: e.target.value })
                }
                placeholder="Enter discount"
                className="h-11 rounded-xl border-slate-200"
              />
            </Field>

            <Field label="EMI Option">
              <Select
                value={form.emiOption}
                onValueChange={(value) =>
                  setForm({ ...form, emiOption: value })
                }
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="rounded-xl border-slate-200"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createFee.isPending}
              className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
            >
              {createFee.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Fee
            </Button>
          </div>
        </form>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <IndianRupee size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-950">Fee Preview</h2>
              <p className="text-sm text-slate-500">Auto calculated summary</p>
            </div>
          </div>

          <div className="space-y-3">
            <PreviewRow label="Student" value={selectedStudent?.name || "—"} />
            <PreviewRow
              label="Course"
              value={selectedEnrollment?.course?.title || "—"}
            />
            <PreviewRow
              label="Batch"
              value={selectedEnrollment?.batch?.name || "—"}
            />
            <PreviewRow
              label="Total Fee"
              value={`₹${feePreview.total.toLocaleString("en-IN")}`}
            />
            <PreviewRow
              label="Discount"
              value={`₹${feePreview.discountAmount.toLocaleString("en-IN")}`}
            />
            <PreviewRow
              label="Final Fee"
              value={`₹${feePreview.finalFee.toLocaleString("en-IN")}`}
              strong
            />
          </div>
        </div>
      </div>
    </div>
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

function PreviewRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`text-sm ${
          strong ? "font-bold text-indigo-700" : "font-semibold text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
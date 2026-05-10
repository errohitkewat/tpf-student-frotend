"use client";

import { ArrowLeft, CreditCard, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeeStructure } from "@/lib/type";

type Props = {
  fee: FeeStructure;
  onBack: () => void;
};

const money = (value: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const date = (value?: string) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function FeesViewDetails({ fee, onBack }: Props) {
  const paidAmount =
    fee.feePayments?.reduce(
      (total, payment) => total + Number(payment.totalAmount || 0),
      0
    ) ?? 0;

  const pendingAmount = Math.max(Number(fee.finalFee || 0) - paidAmount, 0);

  const status =
    pendingAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Pending";

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
            <h1 className="text-xl font-bold text-slate-950">Fee Details</h1>
            <p className="text-sm text-slate-500">
              Complete billing information of selected student.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-indigo-100">Student</p>
            <h2 className="mt-1 text-2xl font-bold">
              {fee.student?.name || "Unknown Student"}
            </h2>
            <p className="mt-2 text-sm text-indigo-100">
              {fee.enrollment?.course?.title || "Course"} •{" "}
              {fee.enrollment?.batch?.name || "Batch"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4">
            <p className="text-sm text-indigo-100">Final Fee</p>
            <p className="mt-1 text-3xl font-bold">{money(fee.finalFee)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Summary label="Total Fee" value={money(fee.courseTotalFee)} />
        <Summary label="Paid" value={money(paidAmount)} />
        <Summary label="Pending" value={money(pendingAmount)} danger />
        <Summary label="Status" value={status} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Student & Course
          </h2>

          <div className="mt-5 space-y-3">
            <Info label="Student Name" value={fee.student?.name} />
            <Info label="Mobile" value={fee.student?.mobile} />
            <Info label="Email" value={fee.student?.email} />
            <Info label="Course" value={fee.enrollment?.course?.title} />
            <Info label="Batch" value={fee.enrollment?.batch?.name} />
            <Info
              label="Enrollment Date"
              value={date(fee.enrollment?.enrollmentDate)}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Fee Breakdown</h2>

          <div className="mt-5 space-y-3">
            <Info label="Course Total Fee" value={money(fee.courseTotalFee)} />
            <Info label="Discount Type" value={fee.discountType || "—"} />
            <Info label="Discount Value" value={String(fee.discountValue ?? 0)} />
            <Info
              label="Discount Amount"
              value={money(fee.discountAmount ?? 0)}
            />
            <Info label="Final Fee" value={money(fee.finalFee)} />
            <Info label="EMI Option" value={fee.emiOption ? "Yes" : "No"} />
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <IndianRupee size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Payment History
            </h2>
            <p className="text-sm text-slate-500">
              All payments recorded for this fee.
            </p>
          </div>
        </div>

        {!fee.feePayments || fee.feePayments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm text-slate-500">
            No payment added yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase text-slate-500">
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Mode</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Note</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {fee.feePayments.map((payment) => (
                  <tr key={payment.id} className="text-sm text-slate-700">
                    <td className="px-5 py-4">{date(payment.paidDate)}</td>
                    <td className="px-5 py-4 font-semibold text-slate-950">
                      {money(payment.totalAmount)}
                    </td>
                    <td className="px-5 py-4">{payment.paymentMode}</td>
                    <td className="px-5 py-4">{payment.status}</td>
                    <td className="px-5 py-4">{payment.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Summary({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-2 text-xl font-bold ${
          danger ? "text-red-600" : "text-slate-950"
        }`}
      >
        {value}
      </p>
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
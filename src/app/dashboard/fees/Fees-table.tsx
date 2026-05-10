"use client";

import { FeeStructure } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";

interface Props {
  feeData: FeeStructure[];
  onEditFees: (fee: FeeStructure) => void;
  onViewFees: (fee: FeeStructure) => void;
}

const money = (value: number) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const getPaidAmount = (fee: FeeStructure) => {
  return (
    fee.feePayments?.reduce(
      (total, payment) => total + Number(payment.totalAmount || 0),
      0
    ) ?? 0
  );
};

const getStatus = (total: number, paid: number) => {
  if (paid >= total) return "Paid";
  if (paid > 0) return "Partial";
  return "Pending";
};

export default function FeesTable({
  feeData,
  onEditFees,
  onViewFees,
}: Props) {
  if (feeData.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">
          No fee records found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Course</th>
              <th className="px-5 py-4">Batch</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Paid</th>
              <th className="px-5 py-4">Pending</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {feeData.map((fee) => {
              const total = Number(fee.finalFee || fee.courseTotalFee || 0);
              const paid = getPaidAmount(fee);
              const pending = Math.max(total - paid, 0);
              const status = getStatus(total, paid);

              return (
                <tr
                  key={fee.id}
                  className="text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-950">
                        {fee.student?.name || "Unknown Student"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {fee.student?.mobile || "No mobile"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {fee.enrollment?.course?.title || "—"}
                  </td>

                  <td className="px-5 py-4">
                    {fee.enrollment?.batch?.name || "—"}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-900">
                    {money(total)}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-900">
                    {money(paid)}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-900">
                    {money(pending)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        status === "Paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : status === "Partial"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => onViewFees(fee)}
                        className="h-9 rounded-lg border-slate-200 px-3"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={() => onEditFees(fee)}
                        className="h-9 rounded-lg bg-slate-950 px-3 text-white hover:bg-slate-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
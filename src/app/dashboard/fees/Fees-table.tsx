"use client";

import { FeeStructure } from "@/lib/type";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CreditCard,
  Eye,
  IndianRupee,
  Pencil,
  Phone,
  UserRound,
  BookOpen,
  Layers,
} from "lucide-react";

interface Props {
  feeData: FeeStructure[];
  onEditFees: (f: FeeStructure) => void;
  onViewFees: (f: FeeStructure) => void;
}

const fmt = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const statusOf = (finalFee: number, paid: number) => {
  const p = finalFee - paid;
  if (p <= 0) return "Paid";
  if (paid > 0) return "Partial";
  return "Pending";
};

export default function FeesTable({
  feeData,
  onEditFees,
  onViewFees,
}: Props) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      {feeData.length === 0 ? (
        <p className="text-sm text-slate-500">No fee records found.</p>
      ) : (
        <div className="space-y-4">
          {feeData.map((fee) => {
            const paid =
              fee.feePayments?.reduce(
                (t, p) => t + Number(p.totalAmount || 0),
                0
              ) ?? 0;

            const pending = Number(fee.finalFee || 0) - paid;
            const status = statusOf(Number(fee.finalFee || 0), paid);

            return (
              <div
                key={fee.id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserRound className="text-indigo-600" />
                      <h2 className="font-bold text-indigo-950">
                        {fee.student?.name}
                      </h2>

                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        {status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex gap-3 flex-wrap">
                      <span className="flex gap-1 items-center">
                        <Phone className="w-3 h-3" />
                        {fee.student?.mobile}
                      </span>
                      <span className="flex gap-1 items-center">
                        <CalendarDays className="w-3 h-3" />
                        {fmt(fee.enrollment?.enrollmentDate)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <Box label="Total" v={fee.courseTotalFee} />
                      <Box label="Discount" v={fee.discountAmount ?? 0} />
                      <Box label="Final" v={fee.finalFee} highlight />
                      <Box label="Paid" v={paid} />
                      <Box label="Pending" v={pending} danger />
                    </div>

                    <div className="text-xs text-slate-500 flex gap-4">
                      <span className="flex gap-1 items-center">
                        <BookOpen className="w-3 h-3" />
                        {fee.enrollment?.course?.title}
                      </span>
                      <span className="flex gap-1 items-center">
                        <Layers className="w-3 h-3" />
                        {fee.enrollment?.batch?.name}
                      </span>
                      <span className="flex gap-1 items-center">
                        <CreditCard className="w-3 h-3" />
                        EMI: {fee.emiOption ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => onViewFees(fee)} variant="outline">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button onClick={() => onEditFees(fee)}>
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Box({
  label,
  v,
  highlight,
  danger,
}: {
  label: string;
  v: number;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-3 border ${
        highlight
          ? "bg-indigo-50 border-indigo-100"
          : danger
          ? "bg-red-50 border-red-100"
          : "bg-slate-50 border-slate-100"
      }`}
    >
      <p className="text-[10px] text-slate-400">{label}</p>
      <p
        className={`font-bold text-sm ${
          highlight
            ? "text-indigo-900"
            : danger
            ? "text-red-600"
            : "text-slate-800"
        }`}
      >
        ₹{v}
      </p>
    </div>
  );
}
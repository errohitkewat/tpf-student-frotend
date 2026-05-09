"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CircleDollarSign,
  CreditCard,
  FileText,
  IndianRupee,
  User,
} from "lucide-react";
import { FeeStructure } from "@/lib/type";

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number | undefined | null;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}

      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-700">
          {value !== undefined && value !== null && value !== ""
            ? String(value)
            : "—"}
        </p>
      </div>
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type Props = {
  fee: FeeStructure;
  onBack: () => void;
};

export default function FeesViewDetails({ fee, onBack }: Props) {
  const paidAmount =
    fee.feePayments?.reduce(
      (total, payment) => total + Number(payment.totalAmount || 0),
      0
    ) ?? 0;

  const pendingAmount = Number(fee.finalFee || 0) - paidAmount;

  return (
    <div className="min-h-screen p-4 font-[Poppins,sans-serif]">
      {/* Header */}
      <Card className="mb-4 shadow-md border-0 bg-white rounded-2xl">
        <CardContent className="py-4 px-5">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="w-px h-7 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-indigo-900">
                  Fee Details
                </h1>
                <p className="text-xs text-slate-400">
                  View complete fee information
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main */}
      <div className="border-2 border-slate-200 rounded-xl p-4 space-y-4 bg-white">
        {/* Top Card */}
        <div className="bg-indigo-600 rounded-2xl px-6 py-5 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center">
            <IndianRupee className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              ₹{fee.finalFee}
            </h2>

            <p className="text-sm text-indigo-100">
              Total Fee: ₹{fee.courseTotalFee}
            </p>

            <p className="text-sm text-indigo-100">
              EMI: {fee.emiOption ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fee Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Fee Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <DetailRow label="Fee ID" value={fee.id} icon={FileText} />
              <DetailRow
                label="Course Total Fee"
                value={`₹${fee.courseTotalFee}`}
                icon={IndianRupee}
              />
              <DetailRow
                label="Discount Type"
                value={fee.discountType}
                icon={CircleDollarSign}
              />
              <DetailRow
                label="Discount Value"
                value={fee.discountValue}
                icon={CircleDollarSign}
              />
              <DetailRow
                label="Discount Amount"
                value={`₹${fee.discountAmount ?? 0}`}
                icon={IndianRupee}
              />
              <DetailRow
                label="Final Fee"
                value={`₹${fee.finalFee}`}
                icon={IndianRupee}
              />
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Payment Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <DetailRow
                label="Paid Amount"
                value={`₹${paidAmount}`}
                icon={IndianRupee}
              />
              <DetailRow
                label="Pending Amount"
                value={`₹${pendingAmount}`}
                icon={IndianRupee}
              />
              <DetailRow
                label="Installments"
                value={fee.installments?.length ?? 0}
                icon={CreditCard}
              />
              <DetailRow
                label="Payments"
                value={fee.feePayments?.length ?? 0}
                icon={CreditCard}
              />
              <DetailRow
                label="Created At"
                value={formatDate(fee.createdAt)}
                icon={Calendar}
              />
              <DetailRow
                label="Updated At"
                value={formatDate(fee.updatedAt)}
                icon={Calendar}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
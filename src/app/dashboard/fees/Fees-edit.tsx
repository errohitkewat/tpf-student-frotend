"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DiscountType,
  FeeStructure,
  PaymentMode,
  PaymentStatus,
} from "@/lib/type";
import { useCreateFeePayment, useUpdateFeeStructure } from "./mutation";

type Props = {
  fee: FeeStructure;
  onBack: () => void;
};

export default function FeesEditForm({ fee, onBack }: Props) {
  const updateFee = useUpdateFeeStructure();
  const addPayment = useCreateFeePayment();

  const [feeForm, setFeeForm] = useState({
    courseTotalFee: String(fee.courseTotalFee ?? ""),
    discountType: fee.discountType ?? DiscountType.PERCENTAGE,
    discountValue: String(fee.discountValue ?? ""),
    emiOption: String(fee.emiOption ?? false),
  });

  const [paymentForm, setPaymentForm] = useState({
    totalAmount: "",
    paymentMode: PaymentMode.CASH,
    transactionRef: "",
    note: "",
    paidDate: new Date().toISOString().split("T")[0],
  });

  const handleFeeChange = (field: string, value: string) => {
    setFeeForm((p) => ({ ...p, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentForm((p) => ({ ...p, [field]: value }));
  };

  const paidAmount =
    fee.feePayments?.reduce(
      (t, p) => t + Number(p.totalAmount || 0),
      0
    ) ?? 0;

  const pendingAmount = Number(fee.finalFee || 0) - paidAmount;

  const handleUpdateFee = (e: React.FormEvent) => {
    e.preventDefault();

    updateFee.mutate(
      {
        feeId: fee.id,
        data: {
          courseTotalFee: Number(feeForm.courseTotalFee),
          discountType: feeForm.discountType,
          discountValue: Number(feeForm.discountValue || 0),
          emiOption: feeForm.emiOption === "true",
        },
      },
      { onSuccess: onBack }
    );
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(paymentForm.totalAmount);

    if (amount <= 0) {
      alert("Amount should be > 0");
      return;
    }

    if (amount > pendingAmount) {
      alert("Cannot exceed pending amount");
      return;
    }

    addPayment.mutate(
      {
        totalAmount: amount,
        paymentMode: paymentForm.paymentMode,
        status: PaymentStatus.COMPLETED,
        transactionRef: paymentForm.transactionRef || undefined,
        note: paymentForm.note || undefined,
        paidDate: new Date(paymentForm.paidDate).toISOString(),
        studentId: fee.studentId,
        festructureId: fee.id, // backend typo (keep same)
      },
      {
        onSuccess: () => {
          setPaymentForm({
            totalAmount: "",
            paymentMode: PaymentMode.CASH,
            transactionRef: "",
            note: "",
            paidDate: new Date().toISOString().split("T")[0],
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen p-4 font-[Poppins,sans-serif]">
      {/* Header (same as your theme) */}
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
                  Edit Fee Structure
                </h1>
                <p className="text-xs text-slate-400">
                  Update fee and record payment
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary (same style blocks) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <SummaryBox label="Final Fee" value={`₹${fee.finalFee}`} />
        <SummaryBox label="Paid" value={`₹${paidAmount}`} />
        <SummaryBox label="Pending" value={`₹${pendingAmount}`} danger />
        <SummaryBox label="EMI" value={fee.emiOption ? "Yes" : "No"} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Update Fee (same theme) */}
        <form
          onSubmit={handleUpdateFee}
          className="space-y-4 border-2 border-slate-200 rounded-xl p-4 bg-white"
        >
          <h2 className="font-bold text-indigo-900">
            Update Fee Structure
          </h2>

          <Field
            label="Course Total Fee"
            value={feeForm.courseTotalFee}
            onChange={(v) => handleFeeChange("courseTotalFee", v)}
          />

          <div className="space-y-1.5">
            <Label>Discount Type</Label>
            <Select
              value={feeForm.discountType}
              onValueChange={(v) => handleFeeChange("discountType", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DiscountType.PERCENTAGE}>
                  Percentage
                </SelectItem>
                <SelectItem value={DiscountType.FIXED}>
                  Fixed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Field
            label="Discount Value"
            value={feeForm.discountValue}
            onChange={(v) => handleFeeChange("discountValue", v)}
          />

          <div className="space-y-1.5">
            <Label>EMI Option</Label>
            <Select
              value={feeForm.emiOption}
              onValueChange={(v) => handleFeeChange("emiOption", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={updateFee.isPending}>
            {updateFee.isPending ? "Updating..." : "Update Fee"}
          </Button>
        </form>

        {/* Add Payment (same theme) */}
        <form
          onSubmit={handleAddPayment}
          className="space-y-4 border-2 border-slate-200 rounded-xl p-4 bg-white"
        >
          <h2 className="font-bold text-indigo-900">
            Add Student Payment
          </h2>

          <Field
            label="Amount"
            value={paymentForm.totalAmount}
            onChange={(v) => handlePaymentChange("totalAmount", v)}
          />

          <div className="space-y-1.5">
            <Label>Payment Mode</Label>
            <Select
              value={paymentForm.paymentMode}
              onValueChange={(v) =>
                handlePaymentChange("paymentMode", v)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentMode.CASH}>Cash</SelectItem>
                <SelectItem value={PaymentMode.UPI}>UPI</SelectItem>
                <SelectItem value={PaymentMode.MIXED}>
                  Mixed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Field
            label="Transaction Ref"
            value={paymentForm.transactionRef}
            onChange={(v) =>
              handlePaymentChange("transactionRef", v)
            }
          />

          <Field
            label="Note"
            value={paymentForm.note}
            onChange={(v) => handlePaymentChange("note", v)}
          />

          <Button
            type="submit"
            disabled={addPayment.isPending || pendingAmount <= 0}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <IndianRupee className="w-4 h-4 mr-1" />
            {addPayment.isPending ? "Adding..." : "Add Payment"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SummaryBox({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 bg-white ${
        danger ? "border-red-100" : "border-indigo-100"
      }`}
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className={`text-sm font-bold ${
          danger ? "text-red-600" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
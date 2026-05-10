"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  IndianRupee,
  Loader2,
  Save,
} from "lucide-react";
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

const money = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function FeesEditForm({ fee, onBack }: Props) {
  const updateFee = useUpdateFeeStructure();
  const addPayment = useCreateFeePayment();

  const [feeForm, setFeeForm] = useState({
    courseTotalFee: String(fee.courseTotalFee ?? ""),
    discountType: fee.discountType ?? DiscountType.PERCENTAGE,
    discountValue: String(fee.discountValue ?? 0),
    emiOption: String(fee.emiOption ?? false),
  });

  const [paymentForm, setPaymentForm] = useState({
    totalAmount: "",
    paymentMode: PaymentMode.CASH,
    transactionRef: "",
    note: "",
    paidDate: new Date().toISOString().split("T")[0],
  });

  const currentPaidAmount =
    fee.feePayments?.reduce(
      (total, payment) => total + Number(payment.totalAmount || 0),
      0
    ) ?? 0;

  const preview = useMemo(() => {
    const total = Number(feeForm.courseTotalFee || 0);
    const discount = Number(feeForm.discountValue || 0);

    const discountAmount =
      feeForm.discountType === DiscountType.PERCENTAGE
        ? Math.round((total * discount) / 100)
        : discount;

    const finalFee = Math.max(total - discountAmount, 0);
    const pending = Math.max(finalFee - currentPaidAmount, 0);

    return {
      total,
      discountAmount,
      finalFee,
      paid: currentPaidAmount,
      pending,
    };
  }, [
    feeForm.courseTotalFee,
    feeForm.discountType,
    feeForm.discountValue,
    currentPaidAmount,
  ]);

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
      alert("Amount should be greater than 0");
      return;
    }

    if (amount > preview.pending) {
      alert("Payment amount cannot be greater than pending amount");
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
        festructureId: fee.id,
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
            <h1 className="text-xl font-bold text-slate-950">Edit Fee</h1>
            <p className="text-sm text-slate-500">
              Update fee structure and add student payment.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Summary label="Final Fee" value={money(preview.finalFee)} />
        <Summary label="Paid" value={money(preview.paid)} />
        <Summary label="Pending" value={money(preview.pending)} danger />
        <Summary label="EMI" value={feeForm.emiOption === "true" ? "Yes" : "No"} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <form
            onSubmit={handleUpdateFee}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-950">
              Fee Structure
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Change course fee, discount and EMI option.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Course Total Fee">
                <Input
                  type="number"
                  value={feeForm.courseTotalFee}
                  onChange={(e) =>
                    setFeeForm({ ...feeForm, courseTotalFee: e.target.value })
                  }
                  className="h-11 rounded-xl border-slate-200"
                />
              </Field>

              <Field label="Discount Type">
                <Select
                  value={feeForm.discountType}
                  onValueChange={(value) =>
                    setFeeForm({
                      ...feeForm,
                      discountType: value as DiscountType,
                    })
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
                  value={feeForm.discountValue}
                  onChange={(e) =>
                    setFeeForm({ ...feeForm, discountValue: e.target.value })
                  }
                  className="h-11 rounded-xl border-slate-200"
                />
              </Field>

              <Field label="EMI Option">
                <Select
                  value={feeForm.emiOption}
                  onValueChange={(value) =>
                    setFeeForm({ ...feeForm, emiOption: value })
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
                disabled={updateFee.isPending}
                className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
              >
                {updateFee.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Update Fee
              </Button>
            </div>
          </form>

          <form
            onSubmit={handleAddPayment}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-950">Add Payment</h2>
            <p className="mt-1 text-sm text-slate-500">
              Record a new payment for this student.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Amount">
                <Input
                  type="number"
                  value={paymentForm.totalAmount}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      totalAmount: e.target.value,
                    })
                  }
                  placeholder="Enter amount"
                  className="h-11 rounded-xl border-slate-200"
                />
              </Field>

              <Field label="Payment Mode">
                <Select
                  value={paymentForm.paymentMode}
                  onValueChange={(value) =>
                    setPaymentForm({
                      ...paymentForm,
                      paymentMode: value as PaymentMode,
                    })
                  }
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PaymentMode.CASH}>Cash</SelectItem>
                    <SelectItem value={PaymentMode.UPI}>UPI</SelectItem>
                    <SelectItem value={PaymentMode.MIXED}>Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Paid Date">
                <Input
                  type="date"
                  value={paymentForm.paidDate}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      paidDate: e.target.value,
                    })
                  }
                  className="h-11 rounded-xl border-slate-200"
                />
              </Field>

              <Field label="Transaction Reference">
                <Input
                  value={paymentForm.transactionRef}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      transactionRef: e.target.value,
                    })
                  }
                  placeholder="Optional"
                  className="h-11 rounded-xl border-slate-200"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Note">
                  <Input
                    value={paymentForm.note}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, note: e.target.value })
                    }
                    placeholder="Optional note"
                    className="h-11 rounded-xl border-slate-200"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                disabled={addPayment.isPending || preview.pending <= 0}
                className="rounded-xl bg-indigo-600 px-6 text-white hover:bg-indigo-700"
              >
                {addPayment.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <IndianRupee className="mr-2 h-4 w-4" />
                )}
                Add Payment
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Fee Preview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Live calculation based on entered values.
          </p>

          <div className="mt-5 space-y-3">
            <Preview label="Student" value={fee.student?.name || "—"} />
            <Preview
              label="Course"
              value={fee.enrollment?.course?.title || "—"}
            />
            <Preview label="Batch" value={fee.enrollment?.batch?.name || "—"} />
            <Preview label="Course Fee" value={money(preview.total)} />
            <Preview label="Discount" value={money(preview.discountAmount)} />
            <Preview label="Final Fee" value={money(preview.finalFee)} strong />
            <Preview label="Already Paid" value={money(preview.paid)} />
            <Preview label="Pending" value={money(preview.pending)} danger />
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

function Preview({
  label,
  value,
  strong,
  danger,
}: {
  label: string;
  value: string;
  strong?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`text-right text-sm font-semibold ${
          danger
            ? "text-red-600"
            : strong
            ? "text-indigo-700"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  IndianRupee,
  Plus,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { FeeStructure } from "@/lib/type";
import { getAllFeeStructures } from "@/app/service/fee.service";
import FeesTable from "./Fees-table";

interface FeesFrameProps {
  onAddFees: () => void;
  onEditFees: (fee: FeeStructure) => void;
  onViewFees: (fee: FeeStructure) => void;
}

export default function Feesframe({
  onAddFees,
  onEditFees,
  onViewFees,
}: FeesFrameProps) {
  const [search, setSearch] = useState("");

  const {
    data: feeData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fee-structures"],
    queryFn: getAllFeeStructures,
  });

  const summary = useMemo(() => {
    const totalFee = feeData.reduce(
      (sum, fee) => sum + Number(fee.finalFee || 0),
      0
    );

    const collected = feeData.reduce((sum, fee) => {
      const paid =
        fee.feePayments?.reduce(
          (total, payment) => total + Number(payment.totalAmount || 0),
          0
        ) ?? 0;

      return sum + paid;
    }, 0);

    const pending = Math.max(totalFee - collected, 0);

    const paidStudents = feeData.filter((fee) => {
      const paid =
        fee.feePayments?.reduce(
          (total, payment) => total + Number(payment.totalAmount || 0),
          0
        ) ?? 0;

      return paid >= Number(fee.finalFee || 0);
    }).length;

    return {
      totalFee,
      collected,
      pending,
      paidStudents,
      totalRecords: feeData.length,
    };
  }, [feeData]);

  const filteredFees = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return feeData;

    return feeData.filter((fee) => {
      const studentName = fee.student?.name?.toLowerCase() || "";
      const mobile = fee.student?.mobile || "";
      const course = fee.enrollment?.course?.title?.toLowerCase() || "";
      const batch = fee.enrollment?.batch?.name?.toLowerCase() || "";

      return (
        studentName.includes(value) ||
        mobile.includes(value) ||
        course.includes(value) ||
        batch.includes(value)
      );
    });
  }, [feeData, search]);

  if (isLoading) return <Loading text="Fee records are loading..." />;

  if (isError) {
    return (
      <Error
        text={error instanceof Error ? error.message : "Something went wrong"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              Billing Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Fees & Payments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Monitor fee records, collected payments, pending dues, and student
              billing status from one clean module.
            </p>
          </div>

          <Button
            onClick={onAddFees}
            className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Fee
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Fee"
          value={`₹${summary.totalFee.toLocaleString("en-IN")}`}
          icon={IndianRupee}
        />

        <SummaryCard
          title="Collected"
          value={`₹${summary.collected.toLocaleString("en-IN")}`}
          icon={Wallet}
        />

        <SummaryCard
          title="Pending"
          value={`₹${summary.pending.toLocaleString("en-IN")}`}
          icon={CreditCard}
        />

        <SummaryCard
          title="Paid Students"
          value={`${summary.paidStudents}/${summary.totalRecords}`}
          icon={TrendingUp}
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Billing Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View fee status, pending amount and payment details.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, course, batch..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        <FeesTable
          feeData={filteredFees}
          onEditFees={onEditFees}
          onViewFees={onViewFees}
        />
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
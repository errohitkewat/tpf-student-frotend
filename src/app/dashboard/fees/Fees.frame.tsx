"use client";

import { Button } from "@/components/ui/button";
import { Plus, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FeeStructure } from "@/lib/type";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import FeesTable from "./Fees-table";
import { getAllFeeStructures } from "@/app/service/fee.service";


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
  const {
    data: feeData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fee-structures"],
    queryFn: getAllFeeStructures,
  });

  if (isLoading) {
    return <Loading text="Fee records are loading..." />;
  }

  if (isError) {
    return (
      <Error
        text={error instanceof Error ? error.message : "Something went wrong"}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600">
            <UserRound size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Fee Records
            </h1>
            <p className="text-xs text-slate-400">
              Manage and view all fee details
            </p>
          </div>
        </div>

        <Button
          onClick={onAddFees}
          className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Fee
        </Button>
      </div>

      <FeesTable
        feeData={feeData}
        onEditFees={onEditFees}
        onViewFees={onViewFees}
      />
    </div>
  );
}

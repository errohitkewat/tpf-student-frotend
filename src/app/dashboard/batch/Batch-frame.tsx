"use client";

import { Button } from "@/components/ui/button";
import { ChevronsRightLeftIcon, Plus } from "lucide-react";
import BatchTable from "../batch/Batch-Table";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Batch } from "@/lib/type";

type BatchResponse = {
  data: Batch[];
};

interface BatchFramesProps {
  onAddBatch: () => void;
  onEditBatch: (batch: Batch) => void;
  onViewBatch: (batch: Batch) => void;
}

export default function BatchFrame({
  onAddBatch,
  onEditBatch,
  onViewBatch,
}: BatchFramesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["batches"],
    queryFn: async () => {
      const res = await kyInstance.get("batches").json<BatchResponse>();
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading text="Batches are Loading" />;
  }

  if (isError) {
    return <Error text="Something went wrong" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600">
            <ChevronsRightLeftIcon size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Course Batches
            </h1>
            <p className="text-xs text-slate-400">
              Manage and view course batches
            </p>
          </div>
        </div>

        <Button
          onClick={onAddBatch}
          className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Batch
        </Button>
      </div>

      <BatchTable
        batchData={data || []}
        onEditBatch={onEditBatch}
        onViewBatch={onViewBatch}
      />
    </div>
  );
}

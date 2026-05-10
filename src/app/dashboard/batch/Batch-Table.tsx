"use client";

import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Batch } from "@/lib/type";
import BatchDelete from "./Batch-Delete";
import { useDeleteBatch } from "./mutation";

type Props = {
  batches: Batch[];
  onViewBatch: (batch: Batch) => void;
  onEditBatch: (batch: Batch) => void;
};

const date = (value?: string | Date) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function BatchTable({
  batches,
  onViewBatch,
  onEditBatch,
}: Props) {
  if (batches.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">
          No batch records found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Batch</th>
              <th className="px-5 py-4">Course</th>
              <th className="px-5 py-4">Teacher</th>
              <th className="px-5 py-4">Schedule</th>
              <th className="px-5 py-4">Capacity</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {batches.map((batch) => (
              <BatchRow
                key={batch.id}
                batch={batch}
                onViewBatch={onViewBatch}
                onEditBatch={onEditBatch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BatchRow({
  batch,
  onViewBatch,
  onEditBatch,
}: {
  batch: Batch;
  onViewBatch: (batch: Batch) => void;
  onEditBatch: (batch: Batch) => void;
}) {
  const deleteBatch = useDeleteBatch();

  return (
    <tr className="text-sm text-slate-700 transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <p className="font-semibold text-slate-950">{batch.name}</p>
        <p className="mt-1 text-xs text-slate-400">
          {batch.batchCode || "No code"} • Room {batch.roomNo || "—"}
        </p>
      </td>

      <td className="px-5 py-4">{batch.course?.title || "—"}</td>

      <td className="px-5 py-4">{batch.teacher?.name || "—"}</td>

      <td className="px-5 py-4">
        <p className="font-medium text-slate-900">
          {batch.scheduleTime || "—"}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {date(batch.startDate)} - {date(batch.endDate)}
        </p>
      </td>

      <td className="px-5 py-4">
        {batch.students?.length || 0}/{batch.capacity || 0}
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={batch.status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onViewBatch(batch)}
            className="h-9 rounded-lg border-slate-200 px-3"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => onEditBatch(batch)}
            className="h-9 rounded-lg bg-slate-950 px-3 text-white hover:bg-slate-800"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <BatchDelete
            batchName={batch.name}
            isPending={deleteBatch.isPending}
            onConfirm={() => deleteBatch.mutate(batch.id)}
          />
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "ONGOING"
      ? "bg-emerald-50 text-emerald-700"
      : status === "COMPLETED"
      ? "bg-indigo-50 text-indigo-700"
      : status === "STARTED"
      ? "bg-amber-50 text-amber-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}
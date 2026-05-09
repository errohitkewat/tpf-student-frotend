"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import BatchDelete from "./Batch-Delete";
import { Batch } from "@/lib/type";
import { useDeleteBatch } from "./mutation";

interface BatchTableProps {
  batchData: Batch[];
  onEditBatch: (batch: Batch) => void;
  onViewBatch: (batch: Batch) => void;
}

export default function BatchTable({
  batchData,
  onEditBatch,
  onViewBatch,
}: BatchTableProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBatches = batchData.filter((batch) => {
    const matchesSearch =
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || batch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col mt-5">
      <Card className="w-full shadow-lg border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white border-b border-slate-100 p-4">
          <Input
            placeholder="Search by batch name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-sm h-9 text-sm border-slate-200 bg-slate-50 shadow-sm rounded-lg"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44 h-9 text-sm border-slate-200 shadow-sm rounded-lg bg-slate-50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-xl border-slate-100">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="STARTED">Started</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="text-xs w-14 pl-6">SNO</TableHead>
                <TableHead className="text-xs">Batch Name</TableHead>
                <TableHead className="text-xs">Batch Code</TableHead>
                <TableHead className="text-xs">Capacity</TableHead>
                <TableHead className="text-xs">Schedule Time</TableHead>
                <TableHead className="text-xs">Start Date</TableHead>
                <TableHead className="text-xs">End Date</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredBatches.length > 0 ? (
                filteredBatches.map((batch, index) => (
                  <BatchTableRow
                    key={batch.id}
                    batch={batch}
                    index={index}
                    onEditBatch={onEditBatch}
                    onViewBatch={onViewBatch}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-10 text-sm text-slate-500"
                  >
                    No batches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function BatchTableRow({
  batch,
  index,
  onEditBatch,
  onViewBatch,
}: {
  batch: Batch;
  index: number;
  onEditBatch: (batch: Batch) => void;
  onViewBatch: (batch: Batch) => void;
}) {
  const deleteMutation = useDeleteBatch();

  const statusStyles: Record<
    string,
    { badge: string; dot: string; label: string }
  > = {
    STARTED: {
      badge: "bg-blue-50 text-blue-700 border border-blue-200",
      dot: "bg-blue-500",
      label: "Started",
    },
    ONGOING: {
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      dot: "bg-emerald-500",
      label: "Ongoing",
    },
    COMPLETED: {
      badge: "bg-slate-100 text-slate-700 border border-slate-200",
      dot: "bg-slate-500",
      label: "Completed",
    },
  };

  const current = statusStyles[batch.status] ?? {
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    dot: "bg-slate-400",
    label: batch.status,
  };

  return (
    <TableRow className="group border-b border-slate-100 hover:bg-indigo-50/40 transition">
      <TableCell className="pl-6 text-sm text-slate-400 w-14">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-xs">
          {index + 1}
        </span>
      </TableCell>

      <TableCell className="text-sm font-semibold text-slate-800">
        {batch.name}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {batch.batchCode}
      </TableCell>

      <TableCell className="text-sm text-slate-600">{batch.capacity}</TableCell>

      <TableCell className="text-sm text-slate-600">
        {batch.scheduleTime}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {batch.startDate
          ? new Date(batch.startDate).toLocaleDateString()
          : "N/A"}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {batch.endDate ? new Date(batch.endDate).toLocaleDateString() : "N/A"}
      </TableCell>

      <TableCell>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${current.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
          {current.label}
        </span>
      </TableCell>

      <TableCell className="text-right pr-6">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewBatch(batch)}
            className="h-8 w-8 p-0 rounded-lg"
          >
            <Eye size={14} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditBatch(batch)}
            className="h-8 w-8 p-0 rounded-lg"
          >
            <Edit size={14} />
          </Button>

          <BatchDelete
            batchName={batch.name}
            isPending={deleteMutation.isPending}
            onConfirm={() => deleteMutation.mutate(batch.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

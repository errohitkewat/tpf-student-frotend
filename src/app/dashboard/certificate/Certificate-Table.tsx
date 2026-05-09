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
import CertificateDelete from "./Certificate-Delete";
import { Certificate } from "@/lib/type";
import { useDeleteCertificate } from "./mutation";

interface CertificateInterface {
  onViewCertificate: (certificate: Certificate) => void;
  onEditCertificate: (certificate: Certificate) => void;
  certificateData: Certificate[];
}

export default function CertificateTable({
  certificateData,
  onEditCertificate,
  onViewCertificate,
}: CertificateInterface) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = certificateData.filter((certificate) => {
    const matchesSearch =
      certificate.certificateNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      certificate.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (certificate.student?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (certificate.course?.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const certificateStatus =
      certificate.isActive && !certificate.revokedAt ? "ACTIVE" : "REVOKED";

    const matchesStatus =
      statusFilter === "all" || certificateStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col mt-5">
      <Card className="w-full shadow-lg border gap-0! border-slate-200 rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between bg-white border-b border-slate-100 p-0 px-4">
          <Input
            placeholder="Search by certificate number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 text-sm border-slate-200 bg-slate-50 shadow-sm rounded-lg"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44 h-9 text-sm border-slate-200 shadow-sm rounded-lg bg-slate-50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-xl border-slate-100">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="REVOKED">Revoked</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="text-xs w-14 pl-6">SNO</TableHead>
                <TableHead className="text-xs">Certificate No</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">Course</TableHead>
                <TableHead className="text-xs">Completion Date</TableHead>
                <TableHead className="text-xs">Grade</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate, index) => (
                  <CertificateTableRow
                    key={certificate.id}
                    index={index}
                    certificate={certificate}
                    onEditCertificate={onEditCertificate}
                    onViewCertificate={onViewCertificate}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-sm text-slate-500"
                  >
                    No certificates found.
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

function CertificateTableRow({
  index,
  onEditCertificate,
  onViewCertificate,
  certificate,
}: {
  index: number;
  onEditCertificate: (certificate: Certificate) => void;
  onViewCertificate: (certificate: Certificate) => void;
  certificate: Certificate;
}) {
  const deleteMutation = useDeleteCertificate();

  const status =
    certificate.isActive && !certificate.revokedAt ? "ACTIVE" : "REVOKED";

  const statusStyles: Record<
    string,
    { badge: string; dot: string; label: string }
  > = {
    ACTIVE: {
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      dot: "bg-emerald-500",
      label: "Active",
    },
    REVOKED: {
      badge: "bg-red-50 text-red-600 border border-red-200",
      dot: "bg-red-500",
      label: "Revoked",
    },
  };

  const current = statusStyles[status] ?? {
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    dot: "bg-slate-400",
    label: status,
  };

  return (
    <TableRow className="group border-b border-slate-100 hover:bg-indigo-50/40 transition">
      <TableCell className="pl-6 text-sm text-slate-400 w-14">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-xs">
          {index + 1}
        </span>
      </TableCell>

      <TableCell className="text-sm font-semibold text-slate-800">
        {certificate.certificateNumber}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {certificate.student?.name || certificate.studentId}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {certificate.course?.title || certificate.courseId}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {certificate.completionDate
          ? new Date(certificate.completionDate).toLocaleDateString()
          : "N/A"}
      </TableCell>

      <TableCell className="text-sm text-slate-600">
        {certificate.grade}
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
            onClick={() => onViewCertificate(certificate)}
            className="h-8 w-8 p-0 rounded-lg"
          >
            <Eye size={14} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditCertificate(certificate)}
            className="h-8 w-8 p-0 rounded-lg"
          >
            <Edit size={14} />
          </Button>

          <CertificateDelete
            certificateNumber={certificate.certificateNumber}
            isPending={deleteMutation.isPending}
            onConfirm={() => deleteMutation.mutate(certificate.id)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

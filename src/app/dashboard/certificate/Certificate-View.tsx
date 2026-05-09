"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  ArrowLeft,
  FileBadge,
  Calendar,
  Hash,
  BookOpen,
  Users,
  Layers,
  FileText,
  CheckCircle,
  XCircle,
  Link,
  User,
  FileBadge2,
} from "lucide-react";

import { Certificate } from "@/lib/type";

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      {Icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-md border">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value || "—"}</span>
      </div>
    </div>
  );
}

export default function CertificateViewDetails({
  onBack,
  certificate,
}: {
  onBack: () => void;
  certificate?: Certificate;
}) {
  if (!certificate) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">Certificate data not found.</p>
        <Button onClick={onBack} type="button" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-indigo-100 text-indigo-700"
                type="button"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="w-px h-7 bg-slate-200" />

              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white p-2 rounded-xl">
                  <FileBadge2 className="w-5 h-5" />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-indigo-900">
                    View Certificate
                  </h1>

                  <p className="text-xs text-slate-400">
                    View certificate information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBadge className="w-4 h-4" />
                Certificate Info
              </CardTitle>

              <CardDescription>Basic certificate details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <DetailRow
                label="Certificate Number"
                value={certificate.certificateNumber}
                icon={FileText}
              />
              <DetailRow
                label="Verification Hash"
                value={certificate.verificationHash}
                icon={Hash}
              />
              <DetailRow
                label="Issue Date"
                value={
                  certificate.issueDate
                    ? new Date(certificate.issueDate).toLocaleDateString()
                    : "—"
                }
                icon={Calendar}
              />
              <DetailRow
                label="Completion Date"
                value={
                  certificate.completionDate
                    ? new Date(certificate.completionDate).toLocaleDateString()
                    : "—"
                }
                icon={Calendar}
              />
              <DetailRow
                label="Grade"
                value={certificate.grade}
                icon={CheckCircle}
              />
              <DetailRow
                label="Remarks"
                value={certificate.remarks || "—"}
                icon={FileText}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Relations
              </CardTitle>

              <CardDescription>Related student and course info</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <DetailRow
                label="Student"
                value={certificate.student?.name || certificate.studentId}
                icon={User}
              />
              <DetailRow
                label="Course"
                value={certificate.course?.title || certificate.courseId}
                icon={BookOpen}
              />
              <DetailRow
                label="Enrollment ID"
                value={certificate.enrollmentId}
                icon={Layers}
              />
              <DetailRow
                label="Batch"
                value={certificate.batch?.name || certificate.batchId}
                icon={Layers}
              />
              <DetailRow
                label="Template"
                value={certificate.template?.name || certificate.templateId}
                icon={Layers}
              />
              <DetailRow
                label="Generated By"
                value={certificate.generatedBy}
                icon={User}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>

            <CardDescription>Certificate current status</CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-3">
            <DetailRow
              label="Active"
              value={
                <Badge variant={certificate.isActive ? "default" : "secondary"}>
                  {certificate.isActive ? "Active" : "Inactive"}
                </Badge>
              }
              icon={CheckCircle}
            />

            <DetailRow
              label="Deleted"
              value={
                <Badge
                  variant={certificate.isDeleted ? "destructive" : "secondary"}
                >
                  {certificate.isDeleted ? "Deleted" : "No"}
                </Badge>
              }
              icon={XCircle}
            />

            <DetailRow
              label="Revoked Reason"
              value={certificate.revokedReason || "—"}
              icon={FileText}
            />

            <DetailRow
              label="Revoked At"
              value={
                certificate.revokedAt
                  ? new Date(certificate.revokedAt).toLocaleDateString()
                  : "—"
              }
              icon={Calendar}
            />

            <DetailRow
              label="PDF URL"
              value={certificate.pdfUrl || "—"}
              icon={Link}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

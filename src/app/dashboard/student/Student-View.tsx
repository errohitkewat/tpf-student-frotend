"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Briefcase,
  GraduationCap,
  Smartphone,
} from "lucide-react";

import { Student } from "@/lib/type";

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | undefined;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100">
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 uppercase">{label}</span>
        <span className="text-sm font-semibold text-slate-700">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

export default function StudentViewDetails({
  onBack,
  student,
}: {
  onBack: () => void;
  student?: Student;
}) {
  if (!student) {
    return (
      <div className="p-6">
        <p className="text-red-500">No student selected</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 font-[Poppins,sans-serif]">
      <div className="w-full">
        {/* HEADER */}
        <Card className="mb-4 shadow-md border-0 bg-white/80 rounded-2xl">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-3">
              <Button onClick={onBack} variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="w-px h-7 bg-slate-200" />

              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white p-2 rounded-xl">
                  <User className="w-5 h-5" />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-indigo-900">
                    Student Details
                  </h1>
                  <p className="text-xs text-slate-400">
                    View complete information
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MAIN */}
        <div className="border-2 border-slate-200 rounded-xl p-4 space-y-4">
          {/* HERO */}
          <div className="bg-indigo-600 rounded-2xl px-6 py-5 flex items-center gap-5 text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>

              <div className="flex gap-2 flex-wrap text-xs mt-1">
                <span>{student.branchName}</span>
                <span>{student.collegeName}</span>
                <span>{student.gender}</span>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4">
            {/* LEFT */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <DetailRow label="Name" value={student.name} icon={User} />
                <DetailRow label="Gender" value={student.gender} icon={Users} />
                <DetailRow
                  label="DOB"
                  value={new Date(student.DOB).toLocaleDateString()}
                  icon={Calendar}
                />
                <DetailRow
                  label="Mobile"
                  value={student.mobile}
                  icon={Smartphone}
                />
                <DetailRow label="Email" value={student.email} icon={Mail} />
                <DetailRow
                  label="Address"
                  value={student.address}
                  icon={MapPin}
                />
                <DetailRow
                  label="College"
                  value={student.collegeName}
                  icon={GraduationCap}
                />
              </CardContent>
            </Card>

            {/* RIGHT */}
            <Card>
              <CardHeader>
                <CardTitle>Other Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <DetailRow
                  label="Father"
                  value={student.fatherName}
                  icon={User}
                />
                <DetailRow
                  label="Father Contact"
                  value={student.fatherContact}
                  icon={Phone}
                />
                <DetailRow
                  label="Mother"
                  value={student.motherName}
                  icon={User}
                />
                <DetailRow
                  label="Mother Contact"
                  value={student.motherContact}
                  icon={Phone}
                />
                <DetailRow
                  label="Mother Job"
                  value={student.motherOccupation}
                  icon={Briefcase}
                />
                <DetailRow
                  label="Admission"
                  value={new Date(student.admissionDate).toLocaleDateString()}
                  icon={Calendar}
                />
                <DetailRow
                  label="Batch"
                  value={student.batch?.name || student.batchId}
                  icon={BookOpen}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  GraduationCap,
  Wallet,
  Calendar,
  Hash,
  Briefcase,
} from "lucide-react";

import { Teacher, TeacherStatus } from "@/lib/type";

interface Props {
  teacher?: Teacher;
  onBack: () => void;
}

export default function TeacherView({ teacher, onBack }: Props) {
  if (!teacher) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">Teacher data not found.</p>
        <Button onClick={onBack} type="button" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: TeacherStatus) => {
    switch (status) {
      case TeacherStatus.FULL_TIME:
        return (
          <Badge className="bg-green-600 hover:bg-green-600">Full Time</Badge>
        );
      case TeacherStatus.DOUBT_TEACHER:
        return (
          <Badge className="bg-amber-500 hover:bg-amber-500">
            Doubt Teacher
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 mt-6 pb-12 font-[Poppins,sans-serif]">
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
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
              <User className="w-5 h-5" />
            </div>

            <div>
              <CardTitle className="text-xl font-bold text-indigo-900">
                Teacher Details
              </CardTitle>

              <p className="text-xs text-slate-400">
                View complete information about this teacher
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Teacher Name
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Main name of the teacher
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <p className="text-slate-700 leading-8 text-base font-medium">
                  {teacher.name || "No teacher name available."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Contact Information
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Teacher phone and email details
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {teacher.phone || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {teacher.alternatePhone || "No alternate phone available."}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {teacher.email || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {teacher.professionalEmail ||
                      "No professional email available."}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Professional Information
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Qualification, salary and joining details
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {teacher.qualification || "No qualification available."}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Wallet className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    ₹ {teacher.salaryAmount}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {teacher.joiningDate
                      ? new Date(teacher.joiningDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Teacher Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center gap-3">
                <span>Teacher ID</span>
                <span className="font-medium break-all text-right">
                  {teacher.id}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center gap-3">
                <span>Teacher Code</span>
                <span className="font-medium">{teacher.code}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center gap-3">
                <span>Created</span>
                <span>
                  {teacher.createdAt
                    ? new Date(teacher.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center gap-3">
                <span>Last Updated</span>
                <span>
                  {teacher.updatedAt
                    ? new Date(teacher.updatedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Teacher Status
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Employment Type</span>
                {getStatusBadge(teacher.status)}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span>Active Status</span>
                <Badge variant={teacher.isActive ? "default" : "destructive"}>
                  {teacher.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span>Deleted</span>
                <Badge variant={teacher.isDeleted ? "destructive" : "default"}>
                  {teacher.isDeleted ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Quick Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-500">Code</p>
                  <p className="text-base font-semibold">{teacher.code}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-500">Qualification</p>
                  <p className="text-base font-semibold">
                    {teacher.qualification}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-500">Salary</p>
                  <p className="text-base font-semibold">
                    ₹ {teacher.salaryAmount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

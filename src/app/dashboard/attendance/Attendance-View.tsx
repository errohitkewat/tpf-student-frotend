"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, BookOpen, Users, Briefcase, GraduationCap, Smartphone } from "lucide-react";

interface StudentDetails {
  name: string;
  gender: string;
  address: string;
  collegeName: string;
  branchName: string;
  dob: string;
  mobileNo: string;
  fatherName: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  email: string;
  admissionDate: string;
}

const dummyStudent: StudentDetails = {
  name: "Alfiya Khan",
  gender: "Female",
  address: "Satna, Madhya Pradesh",
  collegeName: "Rajive Gandhi Computer College",
  branchName: "Computer Science",
  dob: "2005-06-02",
  mobileNo: "8871036940",
  fatherName: "Sarfaraz Khan",
  fatherContactNo: "9981212230",
  motherName: "Asham Begam",
  motherContactNo: "9823456789",
  motherOccupation: "Teacher",
  email: "alfiya.khan@example.com",
  admissionDate: "2021-07-20",
};

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all duration-200 group">
      {Icon && (
        <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-100 flex items-center justify-center shadow-sm transition-all duration-200">
          <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" />
        </div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">
          {label}
        </span>
        <span className="text-sm font-semibold text-slate-700 truncate leading-snug">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

export default function AttendanceDetails({
  onBack,
  student = dummyStudent,
}: {
  onBack: () => void;
  student?: StudentDetails;
}) {
  return (
    <div className="min-h-screen p-4 font-[Poppins,sans-serif]">
      <div className="w-full">

        <Card className="mb-4 shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onBack()}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-indigo-100 text-indigo-700 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-200">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-indigo-900 tracking-tight leading-tight">
                    Student Details
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    View complete information of the student
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="border-2 border-slate-200 rounded-xl p-4 space-y-4">

          <div className="relative bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-500 rounded-2xl px-6 py-5 flex items-center gap-5 overflow-hidden shadow-lg shadow-indigo-100">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 right-16 w-24 h-24 bg-white/10 rounded-full" />

            <div className="relative shrink-0 w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-inner">
              <User className="w-8 h-8 text-white" />
            </div>

            <div className="flex flex-col gap-1 z-10">
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                {student.name}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-100 bg-white/15 px-2.5 py-1 rounded-full">
                  <GraduationCap className="w-3 h-3" />
                  {student.branchName}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-100 bg-white/15 px-2.5 py-1 rounded-full">
                  <BookOpen className="w-3 h-3" />
                  {student.collegeName}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-100 bg-white/15 px-2.5 py-1 rounded-full">
                  <User className="w-3 h-3" />
                  {student.gender}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">

            <Card className="rounded-2xl overflow-hidden">
              <CardHeader className="py-3 px-5 ">
                <CardTitle className="text-sm font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col gap-2.5">
                  <DetailRow label="Full Name"     value={student.name}        icon={User} />
                  <DetailRow label="Gender"        value={student.gender}      icon={Users} />
                  <DetailRow label="Date of Birth" value={student.dob}         icon={Calendar} />
                  <DetailRow label="Mobile No."    value={student.mobileNo}    icon={Smartphone} />
                  <DetailRow label="Email"         value={student.email}       icon={Mail} />
                  <DetailRow label="Address"       value={student.address}     icon={MapPin} />
                  <DetailRow label="College Name"  value={student.collegeName} icon={GraduationCap} />
                </div>
              </CardContent>
            </Card>

           
            <Card className="border border-slate-200 shadow-sm  rounded-2xl overflow-hidden">
              <CardHeader className="py-3 px-5 ">
                <CardTitle className="text-sm font-bold text-slate-700 tracking-wide flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg  flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-violet-600" />
                  </div>
                  Other Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col gap-2.5">
                  <DetailRow label="Father Name"        value={student.fatherName}       icon={User} />
                  <DetailRow label="Father Contact No." value={student.fatherContactNo}  icon={Phone} />
                  <DetailRow label="Mother Name"        value={student.motherName}       icon={User} />
                  <DetailRow label="Mother Contact No." value={student.motherContactNo}  icon={Phone} />
                  <DetailRow label="Mother Occupation"  value={student.motherOccupation} icon={Briefcase} />
                  <DetailRow label="Admission Date"     value={student.admissionDate}    icon={Calendar} />
                  <DetailRow label="Branch Name"        value={student.branchName}       icon={BookOpen} />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, X } from "lucide-react";

import { Student } from "@/lib/type";
import { useUpdateStudent } from "./mutation";

interface StudentFormData {
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

const initialFormData: StudentFormData = {
  name: "",
  gender: "",
  address: "",
  collegeName: "",
  branchName: "",
  dob: "",
  mobileNo: "",
  fatherName: "",
  fatherContactNo: "",
  motherName: "",
  motherContactNo: "",
  motherOccupation: "",
  email: "",
  admissionDate: "",
};

export default function EditStudentForm({
  onBack,
  student,
}: {
  onBack: () => void;
  student: Student;
}) {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [isPending, startTransition] = useTransition();
  const mutation = useUpdateStudent();

  useEffect(() => {
    if (!student) return;

    setFormData({
      name: student.name || "",
      gender: student.gender || "",
      address: student.address || "",
      collegeName: student.collegeName || "",
      branchName: student.branchName || "",
      dob: student.DOB ? new Date(student.DOB).toISOString().split("T")[0] : "",
      mobileNo: student.mobile || "",
      fatherName: student.fatherName || "",
      fatherContactNo: student.fatherContact || "",
      motherName: student.motherName || "",
      motherContactNo: student.motherContact || "",
      motherOccupation: student.motherOccupation || "",
      email: student.email || "",
      admissionDate: student.admissionDate
        ? new Date(student.admissionDate).toISOString().split("T")[0]
        : "",
    });
  }, [student]);

  const handleChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    onBack();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      gender: formData.gender as Student["gender"],

      address: formData.address.trim(),
      collegeName: formData.collegeName.trim(),
      branchName: formData.branchName.trim(),

      DOB: formData.dob,

      mobile: formData.mobileNo.trim(),
      email: formData.email.trim(),

      admissionDate: formData.admissionDate,

      status: student.status,
      batchId: student.batchId,

      ...(formData.fatherName.trim()
        ? { fatherName: formData.fatherName.trim() }
        : {}),
      ...(formData.fatherContactNo.trim()
        ? { fatherContact: formData.fatherContactNo.trim() }
        : {}),
      ...(formData.motherName.trim()
        ? { motherName: formData.motherName.trim() }
        : {}),
      ...(formData.motherContactNo.trim()
        ? { motherContact: formData.motherContactNo.trim() }
        : {}),
      ...(formData.motherOccupation.trim()
        ? { motherOccupation: formData.motherOccupation.trim() }
        : {}),
    };

    try {
      await mutation.mutateAsync({
        studentId: student.id,
        data: payload,
      });

      startTransition(() => {
        onBack();
      });
    } catch (error) {
      console.log("Student update error:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 font-[Poppins,sans-serif] ">
      <div className="w-full">
        <Card className="mb-4 shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onBack()}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-indigo-100 text-indigo-700 cursor-pointer"
                type="button"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-200">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-indigo-900 tracking-tight leading-tight">
                    Edit Student
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Fill in the details below to edit student information
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form
          onSubmit={handleSubmit}
          className="space-y-4  border-2 border-slate-200 rounded-xl p-4"
        >
          <div className="grid grid-cols-2 gap-4 items-start">
            <Card className="border-none! shadow-none! bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className=" text-slate-800 py-3 px-6">
                <CardTitle className="text-base font-semibold tracking-wide flex items-center gap-2 border-b border-slate-500 pb-3 w-38">
                  <b>Personal Details</b>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 py-0">
                <div className="flex flex-col gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-700"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter student name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="gender"
                      className="text-sm font-medium text-slate-700"
                    >
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(val) => handleChange("gender", val)}
                    >
                      <SelectTrigger
                        id="gender"
                        className="border-slate-200 focus:border-indigo-400 rounded-lg"
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-slate-700"
                    >
                      Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="collegeName"
                      className="text-sm font-medium text-slate-700"
                    >
                      College Name
                    </Label>
                    <Input
                      id="collegeName"
                      placeholder="Enter college name"
                      value={formData.collegeName}
                      onChange={(e) =>
                        handleChange("collegeName", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="dob"
                      className="text-sm font-medium text-slate-700"
                    >
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleChange("dob", e.target.value)}
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="mobileNo"
                      className="text-sm font-medium text-slate-700"
                    >
                      Mobile No.
                    </Label>
                    <Input
                      id="mobileNo"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={formData.mobileNo}
                      onChange={(e) => handleChange("mobileNo", e.target.value)}
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-700"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" border-none shadow-none! bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className=" text-slate-800 py-3 px-6">
                <CardTitle className="text-base font-semibold tracking-wide flex items-center gap-2 border-b border-slate-500 pb-3 w-35">
                  <b>Other Details</b>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 py-0">
                <div className="flex flex-col gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="fatherName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Father Name
                    </Label>
                    <Input
                      id="fatherName"
                      placeholder="Enter father's name"
                      value={formData.fatherName}
                      onChange={(e) =>
                        handleChange("fatherName", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="fatherContactNo"
                      className="text-sm font-medium text-slate-700"
                    >
                      Father Contact No.
                    </Label>
                    <Input
                      id="fatherContactNo"
                      type="tel"
                      placeholder="Enter father's contact"
                      value={formData.fatherContactNo}
                      onChange={(e) =>
                        handleChange("fatherContactNo", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="motherName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Mother Name
                    </Label>
                    <Input
                      id="motherName"
                      placeholder="Enter mother's name"
                      value={formData.motherName}
                      onChange={(e) =>
                        handleChange("motherName", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="motherContactNo"
                      className="text-sm font-medium text-slate-700"
                    >
                      Mother Contact No.
                    </Label>
                    <Input
                      id="motherContactNo"
                      type="tel"
                      placeholder="Enter mother's contact"
                      value={formData.motherContactNo}
                      onChange={(e) =>
                        handleChange("motherContactNo", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="motherOccupation"
                      className="text-sm font-medium text-slate-700"
                    >
                      Mother Occupation
                    </Label>
                    <Input
                      id="motherOccupation"
                      placeholder="Enter mother's occupation"
                      value={formData.motherOccupation}
                      onChange={(e) =>
                        handleChange("motherOccupation", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="admissionDate"
                      className="text-sm font-medium text-slate-700"
                    >
                      Admission Date
                    </Label>
                    <Input
                      id="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) =>
                        handleChange("admissionDate", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="branchName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Branch Name
                    </Label>
                    <Input
                      id="branchName"
                      placeholder="Enter branch name"
                      value={formData.branchName}
                      onChange={(e) =>
                        handleChange("branchName", e.target.value)
                      }
                      className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3 pt-2 pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl font-medium"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || mutation.isPending}
              className="h-9 px-4 text-sm bg-slate-900 hover:bg-slate-700 text-white rounded-lg shadow-sm gap-2 cursor-pointer"
            >
              {isPending || mutation.isPending ? (
                "Updating..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Update Student
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

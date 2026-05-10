"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen, Loader2, UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  CreateCertificateSchema,
  CreateCertificateFormValues,
} from "@/lib/schema";
import { useCreateCertificate } from "./mutation";

interface CertificateAddProps {
  onBack: () => void;
}

const today = new Date().toISOString().split("T")[0];

const generateCertificateNumber = () => {
  return `TFP-CERT-${Date.now()}`;
};

const generateVerificationHash = () => {
  return `verify-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const defaultValues: CreateCertificateFormValues = {
  certificateNumber: generateCertificateNumber(),
  verificationHash: generateVerificationHash(),
  studentId: "",
  courseId: "",
  enrollmentId: "",
  batchId: "",
  templateId: "",
  issueDate: today,
  completionDate: "",
  grade: "",
  remarks: "",
  revokedReason: "",
  revokedAt: "",
  generatedBy: "",
  pdfUrl: "",
  isActive: true,
};

export default function AddCertificateForm({ onBack }: CertificateAddProps) {
  const form = useForm<CreateCertificateFormValues>({
    resolver: zodResolver(CreateCertificateSchema),
    defaultValues,
  });

  const mutation = useCreateCertificate();

  async function onSubmit(values: CreateCertificateFormValues) {
    const payload = {
      certificateNumber:
        values.certificateNumber?.trim() || generateCertificateNumber(),

      verificationHash:
        values.verificationHash?.trim() || generateVerificationHash(),

      studentId: values.studentId.trim(),
      courseId: values.courseId.trim(),
      enrollmentId: values.enrollmentId.trim(),
      batchId: values.batchId.trim(),
      templateId: values.templateId.trim(),

      issueDate: values.issueDate || today,
      completionDate: values.completionDate,

      grade: values.grade.trim(),
      generatedBy: values.generatedBy.trim(),
      isActive: values.isActive,

      remarks: values.remarks?.trim() || undefined,
      revokedReason: values.revokedReason?.trim() || undefined,
      revokedAt: values.revokedAt || undefined,
      pdfUrl: values.pdfUrl?.trim() || undefined,
    };

    try {
      await mutation.mutateAsync(payload);
      form.reset({
        ...defaultValues,
        certificateNumber: generateCertificateNumber(),
        verificationHash: generateVerificationHash(),
        issueDate: today,
      });
      onBack();
    } catch (error) {
      console.log("Certificate submit error:", error);
    }
  }

  const handleCancel = () => {
    form.reset();
    onBack();
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="flex items-center gap-3 p-5">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            type="button"
            className="rounded-xl border-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BookOpen className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Add Certificate
            </h1>
            <p className="text-sm text-slate-500">
              Create a new student certificate.
            </p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-950">
                  Certificate Info
                </CardTitle>
                <CardDescription>
                  Basic certificate details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <TextInput
                  control={form.control}
                  name="certificateNumber"
                  label="Certificate Number"
                />

                <TextInput
                  control={form.control}
                  name="verificationHash"
                  label="Verification Hash"
                />

                <DateInput
                  control={form.control}
                  name="issueDate"
                  label="Issue Date"
                />

                <DateInput
                  control={form.control}
                  name="completionDate"
                  label="Completion Date"
                />

                <TextInput control={form.control} name="grade" label="Grade" />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-950">
                  Student & Course
                </CardTitle>
                <CardDescription>
                  Add related student, course, batch and template IDs
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <TextInput control={form.control} name="studentId" label="Student ID" />
                <TextInput control={form.control} name="courseId" label="Course ID" />
                <TextInput control={form.control} name="enrollmentId" label="Enrollment ID" />
                <TextInput control={form.control} name="batchId" label="Batch ID" />
                <TextInput control={form.control} name="templateId" label="Template ID" />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">
                Additional Info
              </CardTitle>
              <CardDescription>
                Optional notes, PDF URL and certificate status
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-2">
              <TextareaInput control={form.control} name="remarks" label="Remarks" />
              <TextareaInput
                control={form.control}
                name="revokedReason"
                label="Revoked Reason"
              />

              <TextInput
                control={form.control}
                name="generatedBy"
                label="Generated By"
              />

              <TextInput control={form.control} name="pdfUrl" label="PDF URL" />

              <DateInput control={form.control} name="revokedAt" label="Revoked At" />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>

                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl border-slate-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={mutation.isPending}
              className="rounded-xl border-slate-200"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Add Certificate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function TextInput({ control, name, label }: any) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={String(field.value ?? "")}
              className="h-11 rounded-xl border-slate-200"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DateInput({ control, name, label }: any) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="date"
              {...field}
              value={String(field.value ?? "")}
              className="h-11 rounded-xl border-slate-200"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function TextareaInput({ control, name, label }: any) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={String(field.value ?? "")}
              className="min-h-24 rounded-xl border-slate-200"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
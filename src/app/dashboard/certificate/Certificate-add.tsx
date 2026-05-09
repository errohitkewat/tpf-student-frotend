"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowLeft, BookOpen, UserPlus, X } from "lucide-react";

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

const defaultValues: CreateCertificateFormValues = {
  certificateNumber: "",
  verificationHash: "",
  studentId: "",
  courseId: "",
  enrollmentId: "",
  batchId: "",
  templateId: "",
  issueDate: "",
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
      studentId: values.studentId.trim(),
      courseId: values.courseId.trim(),
      enrollmentId: values.enrollmentId.trim(),
      batchId: values.batchId.trim(),
      templateId: values.templateId.trim(),
      completionDate: values.completionDate,
      grade: values.grade.trim(),
      generatedBy: values.generatedBy.trim(),
      ...(values.remarks?.trim() ? { remarks: values.remarks.trim() } : {}),
      ...(values.revokedReason?.trim()
        ? { revokedReason: values.revokedReason.trim() }
        : {}),
      ...(values.pdfUrl?.trim() ? { pdfUrl: values.pdfUrl.trim() } : {}),
    };

    console.log("Certificate payload:", payload);

    try {
      await mutation.mutateAsync(payload);
      form.reset(defaultValues);
      onBack();
    } catch (error) {
      console.log("Certificate submit error:", error);
    }
  }

  const handleCancel = () => {
    form.reset(defaultValues);
    onBack();
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <Card className="shadow-sm">
        <CardContent className="py-4 px-5 flex items-center gap-3">
          <Button onClick={onBack} variant="ghost" size="icon" type="button">
            <ArrowLeft className="w-5 h-5 text-indigo-700" />
          </Button>

          <div className="w-px h-7 bg-border" />

          <div className="flex items-center gap-3">
            <div className="bg-indigo-700 text-white p-2 rounded-md">
              <BookOpen className="w-5 h-5" />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-indigo-900">
                Add Certificate
              </h1>

              <p className="text-sm text-slate-400">Create a new certificate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Info</CardTitle>
                <CardDescription>Basic certificate details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="certificateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="verificationHash"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Hash</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="completionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completion Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student & Course</CardTitle>
                <CardDescription>Relation details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  { name: "studentId", label: "Student" },
                  { name: "courseId", label: "Course" },
                  { name: "enrollmentId", label: "Enrollment" },
                  { name: "batchId", label: "Batch" },
                  { name: "templateId", label: "Template" },
                ].map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name as keyof CreateCertificateFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input {...field} value={String(field.value ?? "")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Additional Info</CardTitle>
              <CardDescription>Extra certificate details</CardDescription>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="revokedReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revoked Reason</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generatedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generated By</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pdfUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PDF URL</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="revokedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revoked At</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectTrigger>
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
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                "Loading..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

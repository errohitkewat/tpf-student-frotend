"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, startTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ArrowLeft, BookOpen, Save, X } from "lucide-react";

import {
  UpdateCertificateSchema,
  UpdateCertificateFormValues,
} from "@/lib/schema";
import { useUpdateCertificate } from "./mutation";
import { Certificate } from "@/lib/type";

export default function EditCertificateForm({
  onBack,
  certificate,
}: {
  onBack: () => void;
  certificate: Certificate;
}) {
  const form = useForm<UpdateCertificateFormValues>({
    resolver: zodResolver(UpdateCertificateSchema),
    defaultValues: {
      id: certificate.id,
      certificateNumber: certificate.certificateNumber,
      verificationHash: certificate.verificationHash,
      studentId: certificate.studentId,
      courseId: certificate.courseId,
      enrollmentId: certificate.enrollmentId,
      batchId: certificate.batchId,
      templateId: certificate.templateId,
      issueDate: certificate.issueDate,
      completionDate: certificate.completionDate,
      grade: certificate.grade,
      remarks: certificate.remarks || "",
      revokedReason: certificate.revokedReason || "",
      revokedAt: certificate.revokedAt || "",
      generatedBy: certificate.generatedBy,
      pdfUrl: certificate.pdfUrl || "",
      isActive: certificate.isActive,
    },
  });

  const mutation = useUpdateCertificate();

  // 🔥 IMPORTANT: jab bhi certificate change ho → form reset
  useEffect(() => {
    if (certificate) {
      form.reset({
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        verificationHash: certificate.verificationHash,
        studentId: certificate.studentId,
        courseId: certificate.courseId,
        enrollmentId: certificate.enrollmentId,
        batchId: certificate.batchId,
        templateId: certificate.templateId,
        issueDate: certificate.issueDate,
        completionDate: certificate.completionDate,
        grade: certificate.grade,
        remarks: certificate.remarks || "",
        revokedReason: certificate.revokedReason || "",
        revokedAt: certificate.revokedAt || "",
        generatedBy: certificate.generatedBy,
        pdfUrl: certificate.pdfUrl || "",
        isActive: certificate.isActive,
      });
    }
  }, [certificate, form]);

  async function onSubmit(data: UpdateCertificateFormValues) {
    try {
      const { id, ...payload } = data;

      await mutation.mutateAsync({
        certificateId: id,
        data: payload,
      });

      startTransition(() => {
        onBack();
      });
    } catch (error) {
      console.log("Update error:", error);
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="py-4 px-5">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-indigo-100 text-indigo-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="w-px h-7 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-indigo-900">
                  Edit Certificate
                </h1>

                <p className="text-xs text-slate-400">
                  Update certificate information
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* LEFT */}
            <Card>
              <CardHeader>
                <CardTitle>Certificate Info</CardTitle>
                <CardDescription>Basic certificate information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  "certificateNumber",
                  "studentId",
                  "courseId",
                  "enrollmentId",
                  "batchId",
                ].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof UpdateCertificateFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldName}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>

            {/* RIGHT */}
            <Card>
              <CardHeader>
                <CardTitle>Other Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  "templateId",
                  "issueDate",
                  "completionDate",
                  "grade",
                  "remarks",
                  "pdfUrl",
                ].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof UpdateCertificateFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldName}</FormLabel>
                        <FormControl>
                          {fieldName.includes("Date") ? (
                            <Input type="date" {...field} />
                          ) : fieldName === "remarks" ? (
                            <Textarea {...field} />
                          ) : (
                            <Input {...field} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={mutation.isPending}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                "Updating..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

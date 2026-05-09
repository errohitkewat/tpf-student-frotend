"use client";

import { ArrowLeft, Save, X, User } from "lucide-react";
import { startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UpdateTeacherSchema, UpdateTeacherFormValues } from "@/lib/schema";
import { useUpdateTeacher } from "./mutation";
import { Teacher, TeacherStatus } from "@/lib/type";

interface Props {
  teacher?: Teacher;
  onBack: () => void;
}

export default function EditTeacherForm({ teacher, onBack }: Props) {
  const form = useForm<UpdateTeacherFormValues>({
    resolver: zodResolver(UpdateTeacherSchema),
    defaultValues: {
      id: "",
      name: "",
      code: "",
      phone: "",
      alternatePhone: "",
      email: "",
      professionalEmail: "",
      qualification: "",
      salaryAmount: 0,
      joiningDate: "",
      status: TeacherStatus.FULL_TIME,
    },
  });

  useEffect(() => {
    if (teacher) {
      form.reset({
        id: teacher.id,
        name: teacher.name,
        code: teacher.code,
        phone: teacher.phone,
        alternatePhone: teacher.alternatePhone || "",
        email: teacher.email,
        professionalEmail: teacher.professionalEmail || "",
        qualification: teacher.qualification || "",
        salaryAmount: teacher.salaryAmount,
        joiningDate: teacher.joiningDate,
        status: teacher.status,
      });
    }
  }, [teacher, form]);

  const mutation = useUpdateTeacher();

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

  async function onSubmit(data: UpdateTeacherFormValues) {
    try {
      const { id, ...payload } = data;

      await mutation.mutateAsync({
        teacherId: id,
        data: {
          ...payload,
          alternatePhone: payload.alternatePhone?.trim()
            ? payload.alternatePhone
            : undefined,
          professionalEmail: payload.professionalEmail?.trim()
            ? payload.professionalEmail
            : undefined,
        },
      });

      startTransition(() => {
        onBack();
      });
    } catch (error) {
      console.log("Teacher update error:", error);
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="py-4 px-5">
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
                <User className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-indigo-900">
                  Edit Teacher
                </h1>

                <p className="text-xs text-slate-400">
                  Update teacher information
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Info</CardTitle>
                <CardDescription>Teacher basic information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter teacher name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter teacher code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alternatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter alternate phone"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professionalEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter professional email"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Info</CardTitle>
                <CardDescription>Teacher professional details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter qualification" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter salary"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="joiningDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joining Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value={TeacherStatus.FULL_TIME}>
                            Full Time
                          </SelectItem>
                          <SelectItem value={TeacherStatus.DOUBT_TEACHER}>
                            Doubt Teacher
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

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
                "Loading..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Teacher
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

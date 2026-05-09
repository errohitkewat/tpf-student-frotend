"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, User, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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


import { useCreateTeacher } from "./mutation";
import { CreateTeacherFormInput, CreateTeacherFormValues, CreateTeacherSchema } from "@/lib/schema";
import { TeacherStatus } from "@/lib/type";


export default function AddTeacherForm({ onBack }: { onBack: () => void }) {
  const [isPending, startTransition] = useTransition();

const form = useForm<CreateTeacherFormInput, any, CreateTeacherFormValues>({
  resolver: zodResolver(CreateTeacherSchema),
  defaultValues: {
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

  const mutation = useCreateTeacher();

  async function onSubmit(values: CreateTeacherFormValues) {
    const payload = {
      name: values.name,
      code: values.code,
      phone: values.phone,
      email: values.email,
      qualification: values.qualification,
      salaryAmount: values.salaryAmount,
      joiningDate: values.joiningDate,
      status: values.status,
      ...(values.alternatePhone?.trim()
        ? { alternatePhone: values.alternatePhone.trim() }
        : {}),
      ...(values.professionalEmail?.trim()
        ? { professionalEmail: values.professionalEmail.trim() }
        : {}),
    };

    console.log("Teacher payload:", payload);

    try {
      await mutation.mutateAsync(payload);
      onBack();
      form.reset();
    } catch (error) {
      console.log("Teacher submit error:", error);
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      <Card className="shadow-sm">
        <CardContent className="py-4 px-5 flex items-center gap-3">
          <Button onClick={onBack} variant="ghost" size="icon" type="button">
            <ArrowLeft className="w-5 h-5 text-indigo-700" />
          </Button>

          <div className="w-px h-7 bg-border" />

          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-md">
              <User className="w-5 h-5" />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-indigo-900">
                Add Teacher
              </h1>

              <p className="text-sm text-slate-400">Create a new teacher</p>
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
                <CardDescription>Teacher basic details</CardDescription>
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
                          value={
                            typeof field.value === "number" ? field.value : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value),
                            )
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
              onClick={() => form.reset()}
              disabled={isPending || mutation.isPending}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button type="submit" disabled={isPending || mutation.isPending}>
              {isPending || mutation.isPending ? (
                "loading..."
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Teacher
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

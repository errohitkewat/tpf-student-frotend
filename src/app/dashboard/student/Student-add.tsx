"use client";

import { useTransition } from "react";
import { ArrowLeft, Save, UserPlus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateStudentFormValues, CreateStudentSchema } from "@/lib/schema";
import { useCreateStudent } from "./mutation";

export default function AddStudentForm({ onBack }: { onBack: () => void }) {
  const [isPending, startTransition] = useTransition();
  const mutation = useCreateStudent();

  const form = useForm<CreateStudentFormValues>({
    resolver: zodResolver(CreateStudentSchema),
    defaultValues: {
      name: "",
      gender: undefined,

      address: "",
      collegeName: "",
      branchName: "",

      DOB: "",

      mobile: "",
      alternateMobile: "",

      email: "",

      fatherName: "",
      fatherContact: "",
      fatherOccupation: "",

      motherName: "",
      motherContact: "",
      motherOccupation: "",

      admissionDate: "",

      status: undefined,

      batchId: "",
    },
  });

  async function onSubmit(data: CreateStudentFormValues) {
    const payload = {
      ...data,
      name: data.name.trim(),
      address: data.address.trim(),
      collegeName: data.collegeName.trim(),
      branchName: data.branchName.trim(),
      mobile: data.mobile.trim(),
      email: data.email.trim(),
      batchId: data.batchId.trim(),
      status: data.status ?? "ACTIVE",

      ...(data.alternateMobile?.trim()
        ? { alternateMobile: data.alternateMobile.trim() }
        : {}),

      ...(data.fatherName?.trim()
        ? { fatherName: data.fatherName.trim() }
        : {}),

      ...(data.fatherContact?.trim()
        ? { fatherContact: data.fatherContact.trim() }
        : {}),

      ...(data.fatherOccupation?.trim()
        ? { fatherOccupation: data.fatherOccupation.trim() }
        : {}),

      ...(data.motherName?.trim()
        ? { motherName: data.motherName.trim() }
        : {}),

      ...(data.motherContact?.trim()
        ? { motherContact: data.motherContact.trim() }
        : {}),

      ...(data.motherOccupation?.trim()
        ? { motherOccupation: data.motherOccupation.trim() }
        : {}),
    };

    try {
      await mutation.mutateAsync(payload);
      form.reset();
      startTransition(() => {
        onBack();
      });
    } catch (error) {
      console.log("Student submit error:", error);
    }
  }

  function handleCancel() {
    form.reset();
    onBack();
  }

  return (
    <div className="min-h-screen p-4 font-[Poppins,sans-serif]">
      <div className="w-full">
        <Card className="mb-4 overflow-hidden rounded-2xl border-0 bg-white/80 shadow-md backdrop-blur-sm">
          <CardContent className="px-5 py-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="cursor-pointer rounded-full text-indigo-700 hover:bg-indigo-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="h-7 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-md shadow-indigo-200">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-900">
                    Add Student
                  </h1>
                  <p className="text-xs font-medium text-slate-400">
                    Fill in the details below to register
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 rounded-xl border-2 border-slate-200 p-4"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card className="overflow-hidden rounded-2xl border-none bg-white/80 shadow-none backdrop-blur-sm">
                <CardHeader className="px-6 py-3 text-slate-800">
                  <CardTitle className="flex w-fit items-center gap-2 border-b border-slate-500 pb-3 text-base font-semibold tracking-wide">
                    <b>Personal Details</b>
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 py-0">
                  <div className="flex flex-col gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter student name"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-lg border-slate-200 focus:border-indigo-400">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MALE">Male</SelectItem>
                              <SelectItem value="FEMALE">Female</SelectItem>
                              <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="DOB"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile No.</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter mobile number"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="alternateMobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Mobile</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter alternate mobile number"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
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
                              placeholder="Enter email address"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter address"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="collegeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter college name"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="branchName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter branch name"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl border-none bg-white/80 shadow-none backdrop-blur-sm">
                <CardHeader className="px-6 py-3 text-slate-800">
                  <CardTitle className="flex w-fit items-center gap-2 border-b border-slate-500 pb-3 text-base font-semibold tracking-wide">
                    <b>Other Details</b>
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 py-0">
                  <div className="flex flex-col gap-5">
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter father's name"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fatherContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father Contact No.</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter father's contact"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fatherOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father Occupation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter father's occupation"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter mother's name"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motherContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother Contact No.</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter mother's contact"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motherOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother Occupation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter mother's occupation"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="admissionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admission Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
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
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-lg border-slate-200 focus:border-indigo-400">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="COMPLETED">
                                Completed
                              </SelectItem>
                              <SelectItem value="DROPPED">Dropped</SelectItem>
                              <SelectItem value="SUSPENDED">
                                Suspended
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="batchId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Batch ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter batch id"
                              {...field}
                              className="rounded-lg border-slate-200 focus:border-indigo-400 focus:ring-indigo-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-3 pb-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="rounded-xl border-red-200 px-6 font-medium text-red-600 hover:border-red-300 hover:bg-red-50"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button type="submit" disabled={isPending || mutation.isPending}>
                {isPending || mutation.isPending ? (
                  "loading..."
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    <span>save</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Layers, Save, X } from "lucide-react";

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
  CreateBatchSchema,
  CreateBatchFormValues,
  CreateBatchFormInput,
} from "@/lib/schema";
import { useCreateBatch } from "./mutation";
import { BatchStatus } from "@/lib/type";

interface Props {
  onBack: () => void;
}

const defaultFormValues: CreateBatchFormInput = {
  name: "",
  capacity: 0,
  startDate: "",
  endDate: "",
  scheduleTime: "",
  roomNo: "",
  teacherId: "",
  courseId: "",
  batchCode: "",
  status: BatchStatus.ONGOING,
};

export default function BatchAdd({ onBack }: Props) {
  const form = useForm<CreateBatchFormInput, any, CreateBatchFormValues>({
    resolver: zodResolver(CreateBatchSchema),
    defaultValues: defaultFormValues,
  });

  const mutation = useCreateBatch();

  const onSubmit = async (values: CreateBatchFormValues) => {
    const payload = {
      name: values.name.trim(),
      capacity: values.capacity,
      startDate: values.startDate,
      endDate: values.endDate,
      scheduleTime: values.scheduleTime.trim(),
      batchCode: values.batchCode.trim(),
      courseId: values.courseId.trim(),
      teacherId: values.teacherId.trim(),
      status: values.status,
      ...(values.roomNo?.trim() ? { roomNo: values.roomNo.trim() } : {}),
    };

    try {
      await mutation.mutateAsync(payload);
      form.reset(defaultFormValues);
      onBack();
    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  const handleCancel = () => {
    form.reset(defaultFormValues);
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
            <div className="bg-indigo-600 text-white p-2 rounded-md">
              <Layers className="w-5 h-5" />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-indigo-900">
                Add Batch
              </h1>
              <p className="text-sm text-slate-400">Create a new batch</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Batch Info</CardTitle>
                <CardDescription>Basic batch details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter batch name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batchCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter batch code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter batch capacity"
                          value={
                            typeof field.value === "number" ? field.value : ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? 0
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
                  name="scheduleTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule Time</FormLabel>
                      <FormControl>
                        <Input placeholder="10:00 AM - 12:00 PM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter room number"
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value={BatchStatus.STARTED}>Started</option>
                          <option value={BatchStatus.ONGOING}>Ongoing</option>
                          <option value={BatchStatus.COMPLETED}>
                            Completed
                          </option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule & Relations</CardTitle>
                <CardDescription>Batch timeline and relations</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter teacher id" {...field} />
                      </FormControl>
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
                  <Save size={18} className="mr-2" />
                  <span>Save</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

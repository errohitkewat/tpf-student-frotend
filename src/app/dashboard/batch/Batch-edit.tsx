"use client";

import { useEffect, startTransition } from "react";
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

import { ArrowLeft, Layers, Save, X } from "lucide-react";

import { Batch, BatchStatus } from "@/lib/type";
import { UpdateBatchSchema, UpdateBatchFormValues } from "@/lib/schema";
import { useUpdateBatch } from "./mutation";

interface Props {
  batch?: Batch;
  onBack: () => void;
}

export default function BatchEdit({ batch, onBack }: Props) {
  const form = useForm<UpdateBatchFormValues>({
    resolver: zodResolver(UpdateBatchSchema),
    defaultValues: {
      id: "",
      name: "",
      batchCode: "",
      capacity: 0,
      scheduleTime: "",
      startDate: "",
      endDate: "",
      roomNo: "",
      courseId: "",
      teacherId: "",
      status: BatchStatus.ONGOING,
    },
  });

  useEffect(() => {
    if (batch) {
      form.reset({
        id: batch.id,
        name: batch.name,
        batchCode: batch.batchCode,
        capacity: batch.capacity,
        scheduleTime: batch.scheduleTime,
        startDate: batch.startDate ? batch.startDate.slice(0, 10) : "",
        endDate: batch.endDate ? batch.endDate.slice(0, 10) : "",
        roomNo: batch.roomNo || "",
        courseId: batch.courseId,
        teacherId: batch.teacherId,
        status: batch.status,
      });
    }
  }, [batch, form]);

  const mutation = useUpdateBatch();

  if (!batch) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">Batch data not found.</p>
        <Button onClick={onBack} type="button" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  async function onSubmit(data: UpdateBatchFormValues) {
    try {
      const { id, ...payload } = data;

      await mutation.mutateAsync({
        batchId: id,
        data: {
          ...payload,
          roomNo: payload.roomNo?.trim() ? payload.roomNo.trim() : undefined,
        },
      });

      startTransition(() => {
        onBack();
      });
    } catch (error) {
      console.log("Batch update error:", error);
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
                <Layers className="w-5 h-5" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-indigo-900">
                  Edit Batch
                </h1>
                <p className="text-xs text-slate-400">
                  Update batch information
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
                <CardTitle>Batch Info</CardTitle>
                <CardDescription>Basic batch information</CardDescription>
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
                          value={field.value ?? ""}
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
                          <SelectItem value={BatchStatus.STARTED}>
                            Started
                          </SelectItem>
                          <SelectItem value={BatchStatus.ONGOING}>
                            Ongoing
                          </SelectItem>
                          <SelectItem value={BatchStatus.COMPLETED}>
                            Completed
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
                  Update Batch
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

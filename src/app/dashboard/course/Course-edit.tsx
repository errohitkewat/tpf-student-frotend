"use client";

import { ArrowLeft, Save, XCircle, BookOpen } from "lucide-react";
import { startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { UpdateCourseSchema, UpdateCourseFormValues } from "@/lib/schema";
import { Course } from "@/lib/type";
import { useUpdateCourse } from "./mutation";

interface Props {
  course: Course;
  onBack: () => void;
}

export default function CourseEdit({ course, onBack }: Props) {
  const form = useForm<UpdateCourseFormValues>({
    resolver: zodResolver(UpdateCourseSchema),
    defaultValues: {
      id: course.id,
      title: course.title,
      duration: course.duration,
      descriptionInShort: course.descriptionInShort || "",
      descriptionInDetail: course.descriptionInDetail || "",
      imageForThumbnail: course.imageForThumbnail || "",
      roadmap: course.roadmap || "",
      totalFees: course.totalFees,
      offeredFees: course.offeredFees || 0,
      instractionMode: course.instractionMode || "Online",
    },
  });

  const mutation = useUpdateCourse();

  useEffect(() => {
    if (course) {
      form.reset({
        id: course.id,
        title: course.title,
        duration: course.duration,
        descriptionInShort: course.descriptionInShort || "",
        descriptionInDetail: course.descriptionInDetail || "",
        imageForThumbnail: course.imageForThumbnail || "",
        roadmap: course.roadmap || "",
        totalFees: course.totalFees,
        offeredFees: course.offeredFees || 0,
        instractionMode: course.instractionMode || "Online",
      });
    }
  }, [course, form]);

  async function onSubmit(data: UpdateCourseFormValues) {
    try {
      const { id, ...payload } = data;

      await mutation.mutateAsync({
        courseId: id,
        data: payload,
      });

      startTransition(() => {
        onBack();
      });
    } catch (error) {
      console.log("Course update error:", error);
    }
  }

  return (
    <div className="space-y-8 mt-6 font-[Poppins,sans-serif]">
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
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
                  <BookOpen className="w-5 h-5" />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-indigo-900">
                    Edit Course
                  </h1>

                  <p className="text-xs text-slate-400">
                    Update course information
                  </p>
                </div>
              </div>
            </div>

            <span
              className={`px-4 py-1 text-xs rounded-full font-medium ${
                course.isActive
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {course.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Months)</FormLabel>
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
                  name="instractionMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instruction Mode</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Offline">Offline</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Fees</FormLabel>
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
                  name="offeredFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offered Fees</FormLabel>
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
                  name="imageForThumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter thumbnail URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="descriptionInShort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descriptionInDetail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roadmap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roadmap</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-32"
                          placeholder="Enter course roadmap"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 pb-10">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-red-200 text-red-600 hover:bg-red-50"
              disabled={mutation.isPending}
            >
              <XCircle size={18} className="mr-2" />
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

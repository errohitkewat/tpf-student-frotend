"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { ArrowLeft, Save, X, BookOpen } from "lucide-react"
import { CreateCourseFormValues, CreateCourseSchema  } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateCourse } from "./mutation"


interface Props {
  onBack: () => void
}

export default function CourseAdd({ onBack }: Props) {          // Main Function


  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
      descriptionInDetail: "",
      duration: 0,
      descriptionInShort: "",
      imageForThumbnail: "",
      instractionMode: "",
      offeredFees: 0,
      roadmap: "",
      totalFees: 0,
    },
  });

  const mutation = useCreateCourse();

  async function onSubmit(data: CreateCourseFormValues) {
    try {
      await mutation.mutateAsync(data);

      startTransition(() => {
        onBack();
        form.reset();

      });
    } catch (error) {
      console.log(error);
    }
  }






  return (
    <div className="space-y-8 mt-6 font-[Poppins,sans-serif]">
      {/* HEADER */}

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
                  Add Course
                </h1>

                <p className="text-xs text-slate-400">Create a new course</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FORM */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mb-10"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT CARD */}

            <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
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
                      <FormLabel>Duration (Days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* RIGHT CARD */}

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
                        <Textarea {...field} />
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
                        <Textarea {...field} />
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
                        <Input {...field} />
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
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              <X size={18} className="mr-2" />
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? ("loading...") : 
              ( <>
                  {" "}<Save size={18} className="mr-2" /> <p>save</p>
                </>)
              }
            </Button>
            
          </div>
        </form>
      </Form>
    </div>
  );
}
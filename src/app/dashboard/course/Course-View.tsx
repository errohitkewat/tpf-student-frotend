"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { ArrowLeft, BookOpen } from "lucide-react"

interface Course {
  id: string
  title: string
  duration: number
  descriptionInDetail?: string
  descriptionInShort?: string
  imageForThumbnail?: string
  roadmap?: string
  totalFees: number
  offeredFees?: number
  instractionMode?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface Props {
  course: Course
  onBack: () => void
}

export default function CourseView({ course, onBack }: Props) {

  if (!course) return null

  return (
    <div className="space-y-8 mt-6 pb-12 font-[Poppins,sans-serif]">
      {/* HEADER */}

      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
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
              <CardTitle className="text-xl font-bold text-indigo-900">
                Course Details
              </CardTitle>

              <p className="text-xs text-slate-400">
                View complete information about this course
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SECTION */}

        <div className="lg:col-span-2 space-y-6">
          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm transition ">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Course Title
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Main title of this course
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <p className="text-slate-700 leading-8 text-base font-medium">
                  {course.title || "No course title available."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm transition ">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    About This Course
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Quick overview and summary
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <p className="text-slate-600 leading-8 text-[15px]">
                  {course.descriptionInShort ||
                    "No short description available."}
                </p>
              </div>
            </CardContent>
          </Card>

          {course.descriptionInDetail && (
            <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm transition ">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1 rounded-full bg-slate-900" />
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      Detailed Description
                    </CardTitle>
                    <p className="text-sm text-slate-500 mt-1">
                      Complete explanation of the course
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-slate-600 leading-8 text-[15px] whitespace-pre-line">
                    {course.descriptionInDetail}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {course.roadmap && (
            <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm transition">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1 rounded-full bg-slate-900" />
                  <div>
                    <CardTitle className="text-xl font-semibold text-slate-900">
                      Course Roadmap
                    </CardTitle>
                    <p className="text-sm text-slate-500 mt-1">
                      Step by step learning path
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-slate-600 leading-8 text-[15px] whitespace-pre-line">
                    {course.roadmap}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-6">
          {/* COURSE META */}

          <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Course Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Course ID</span>
                <span className="font-medium">{course.id}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span>Created</span>
                <span>{new Date(course.createdAt).toLocaleDateString()}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span>Last Updated</span>
                <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* COURSE DETAILS */}

          <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Course Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span>Mode</span>
                <span>{course.instractionMode || "N/A"}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span>Status</span>

                <Badge variant={course.isActive ? "default" : "destructive"}>
                  {course.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {course.imageForThumbnail && (
                <div className="space-y-2 pt-3">
                  <span className="text-sm text-slate-500">Thumbnail</span>

                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={course.imageForThumbnail}
                      alt="Thumbnail"
                      className="rounded-lg object-cover w-full h-full border"
                    />
                  </AspectRatio>
                </div>
              )}
            </CardContent>
          </Card>

          {/* FEES CARD */}

          <Card className="border-0 shadow-lg bg-white/90 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Course Fees
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <p className="text-sm text-slate-500">Total Fees</p>

                <p className="text-2xl font-bold">₹ {course.totalFees}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-slate-500">Offered Fees</p>

                <p className="text-2xl font-bold text-green-600">
                  {course.offeredFees ? `₹ ${course.offeredFees}` : "N/A"}
                </p>
              </div>

              {course.offeredFees && (
                <div className="text-sm text-green-600 font-medium">
                  You Save ₹{course.totalFees - course.offeredFees}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
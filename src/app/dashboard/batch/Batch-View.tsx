"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  Layers,
  Calendar,
  Clock,
  DoorOpen,
  Hash,
  Users,
  BookOpen,
  User,
} from "lucide-react";

import { Batch, BatchStatus } from "@/lib/type";

interface Props {
  batch?: Batch;
  onBack: () => void;
}

export default function BatchView({ batch, onBack }: Props) {
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

  const getStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case BatchStatus.STARTED:
        return <Badge className="bg-blue-600 hover:bg-blue-600">Started</Badge>;
      case BatchStatus.ONGOING:
        return (
          <Badge className="bg-green-600 hover:bg-green-600">Ongoing</Badge>
        );
      case BatchStatus.COMPLETED:
        return (
          <Badge className="bg-slate-600 hover:bg-slate-600">Completed</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 mt-6 pb-12 font-[Poppins,sans-serif]">
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
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
              <CardTitle className="text-xl font-bold text-indigo-900">
                Batch Details
              </CardTitle>

              <p className="text-xs text-slate-400">
                View complete information about this batch
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Batch Name
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Main title of this batch
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                <p className="text-slate-700 leading-8 text-base font-medium">
                  {batch.name || "No batch name available."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Batch Information
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Basic information and schedule details
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {batch.batchCode || "No batch code available."}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    Capacity: {batch.capacity}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {batch.scheduleTime || "No schedule time available."}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <DoorOpen className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {batch.roomNo || "No room assigned."}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-slate-900" />
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Schedule & Relations
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    Batch timeline and linked course-teacher details
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    Start Date:{" "}
                    {batch.startDate
                      ? new Date(batch.startDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    End Date:{" "}
                    {batch.endDate
                      ? new Date(batch.endDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {batch.course?.title ||
                      batch.courseId ||
                      "No course assigned."}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">
                    {batch.teacher?.name ||
                      batch.teacherId ||
                      "No teacher assigned."}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Batch Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center gap-3">
                <span>Batch ID</span>
                <span className="font-medium break-all text-right">
                  {batch.id}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center gap-3">
                <span>Batch Code</span>
                <span className="font-medium">{batch.batchCode}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center gap-3">
                <span>Created</span>
                <span>
                  {batch.createdAt
                    ? new Date(batch.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center gap-3">
                <span>Last Updated</span>
                <span>
                  {batch.updatedAt
                    ? new Date(batch.updatedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Batch Status
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Current Status</span>
                {getStatusBadge(batch.status)}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span>Deleted</span>
                <Badge variant={batch.isDeleted ? "destructive" : "default"}>
                  {batch.isDeleted ? "Yes" : "No"}
                </Badge>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span>Students</span>
                <Badge variant="secondary">{batch.students?.length ?? 0}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">
                Quick Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-500">Capacity</p>
                  <p className="text-base font-semibold">{batch.capacity}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-500">Schedule</p>
                  <p className="text-base font-semibold">
                    {batch.scheduleTime}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <DoorOpen className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm text-slate-500">Room No</p>
                  <p className="text-base font-semibold">
                    {batch.roomNo || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

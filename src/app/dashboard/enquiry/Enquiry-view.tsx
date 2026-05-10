"use client";

import { ArrowLeft, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Enquiry } from "@/lib/type";

export default function EnquiryView({
  enquiry,
  onBack,
}: {
  enquiry: Enquiry;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UserRound size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-950">Enquiry Details</h1>
            <p className="text-sm text-slate-500">Complete enquiry overview.</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm text-indigo-100">Student Lead</p>
        <h2 className="mt-1 text-2xl font-bold">{enquiry.studentName}</h2>
        <p className="mt-2 text-sm text-indigo-100">
          {enquiry.mobile} • {enquiry.email}
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Basic Details</h2>

          <div className="mt-5 space-y-3">
            <Info label="Name" value={enquiry.studentName} />
            <Info label="Mobile" value={enquiry.mobile} />
            <Info label="Email" value={enquiry.email} />
            <Info label="Source" value={enquiry.source} />
            <Info label="Status" value={enquiry.status} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Follow Up</h2>

          <div className="mt-5 space-y-3">
            <Info label="Assigned To" value={enquiry.assignedTo?.name} />
            <Info
              label="Interested Courses"
              value={
                enquiry.courses?.length
                  ? enquiry.courses.map((c) => c.title).join(", ")
                  : "—"
              }
            />
            <Info
              label="Follow Up Date"
              value={
                enquiry.followUpDate
                  ? new Date(enquiry.followUpDate).toLocaleDateString("en-IN")
                  : "—"
              }
            />
            <Info
              label="Created On"
              value={new Date(enquiry.createdAt).toLocaleDateString("en-IN")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-right text-sm font-semibold text-slate-900">
        {value || "—"}
      </p>
    </div>
  );
}
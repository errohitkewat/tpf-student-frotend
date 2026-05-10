"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Enquiry, EnquiryStatus } from "@/lib/type";
import { useUpdateEnquiry } from "./mutation";

export default function EnquiryEdit({
  enquiry,
  onBack,
}: {
  enquiry: Enquiry;
  onBack: () => void;
}) {
  const updateEnquiry = useUpdateEnquiry();

  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [followUpDate, setFollowUpDate] = useState(
    enquiry.followUpDate ? enquiry.followUpDate.split("T")[0] : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateEnquiry.mutate(
      {
        id: enquiry.id,
        data: {
          status,
          followUpDate: followUpDate || undefined,
        },
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="outline" size="icon" className="rounded-xl border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-bold text-slate-950">Update Enquiry</h1>
            <p className="text-sm text-slate-500">
              Update follow-up date and enquiry status.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6 rounded-2xl bg-slate-50 p-4">
          <p className="font-semibold text-slate-950">{enquiry.studentName}</p>
          <p className="mt-1 text-sm text-slate-500">
            {enquiry.mobile} • {enquiry.email}
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as EnquiryStatus)}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EnquiryStatus.NEW}>New</SelectItem>
                <SelectItem value={EnquiryStatus.FOLLOW_UP}>Follow Up</SelectItem>
                <SelectItem value={EnquiryStatus.CONVERTED}>Converted</SelectItem>
                <SelectItem value={EnquiryStatus.LOST}>Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Follow Up Date
            </Label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl border-slate-200">
            Cancel
          </Button>

          <Button disabled={updateEnquiry.isPending} className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800">
            {updateEnquiry.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
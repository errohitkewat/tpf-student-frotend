"use client";

import { Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Enquiry } from "@/lib/type";

type Props = {
  data: Enquiry[];
  onView: (enquiry: Enquiry) => void;
  onEdit: (enquiry: Enquiry) => void;
};

const date = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function EnquiryTable({ data, onView, onEdit }: Props) {
  if (data.length === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <p className="text-sm font-medium text-slate-600">
          No enquiry records found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Mobile</th>
              <th className="px-5 py-4">Source</th>
              <th className="px-5 py-4">Courses</th>
              <th className="px-5 py-4">Follow Up</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr
                key={item.id}
                className="text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-950">
                    {item.studentName}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{item.email}</p>
                </td>

                <td className="px-5 py-4">{item.mobile}</td>

                <td className="px-5 py-4">{item.source || "—"}</td>

                <td className="px-5 py-4">
                  {item.courses?.length
                    ? item.courses.map((c) => c.title).join(", ")
                    : "—"}
                </td>

                <td className="px-5 py-4">{date(item.followUpDate)}</td>

                <td className="px-5 py-4">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => onView(item)}
                      className="h-9 rounded-lg border-slate-200 px-3"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => onEdit(item)}
                      className="h-9 rounded-lg bg-slate-950 px-3 text-white hover:bg-slate-800"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "CONVERTED"
      ? "bg-emerald-50 text-emerald-700"
      : status === "FOLLOW_UP"
      ? "bg-amber-50 text-amber-700"
      : status === "LOST"
      ? "bg-red-50 text-red-700"
      : "bg-indigo-50 text-indigo-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
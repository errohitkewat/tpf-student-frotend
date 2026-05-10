"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, UserPlus, Users, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Enquiry, EnquiryStatus } from "@/lib/type";
import { getAllEnquiries } from "@/app/service/enquiry.service";
import EnquiryTable from "./Enquiry-table";

type Props = {
  onAdd: () => void;
  onView: (enquiry: Enquiry) => void;
  onEdit: (enquiry: Enquiry) => void;
};

export default function EnquiryFrame({ onAdd, onView, onEdit }: Props) {
  const [search, setSearch] = useState("");

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["enquiries"],
    queryFn: getAllEnquiries,
  });

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return data;

    return data.filter((item) => {
      return (
        item.studentName?.toLowerCase().includes(q) ||
        item.mobile?.includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.source?.toLowerCase().includes(q)
      );
    });
  }, [data, search]);

  const stats = {
    total: data.length,
    new: data.filter((e) => e.status === EnquiryStatus.NEW).length,
    followUp: data.filter((e) => e.status === EnquiryStatus.FOLLOW_UP).length,
    converted: data.filter((e) => e.status === EnquiryStatus.CONVERTED).length,
  };

  if (isLoading) return <Loading text="Loading enquiries..." />;
  if (isError) return <Error text="Failed to load enquiries" />;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              Enquiry Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Student Enquiries
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Manage new leads, follow-ups, interested courses, and conversion
              status in one simple module.
            </p>
          </div>

          <Button
            onClick={onAdd}
            className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Enquiry
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Enquiries" value={stats.total} icon={Users} />
        <StatCard title="New Leads" value={stats.new} icon={UserPlus} />
        <StatCard title="Follow Ups" value={stats.followUp} icon={Clock} />
        <StatCard title="Converted" value={stats.converted} icon={CheckCircle} />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Enquiry Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search, view and update student enquiries.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, email..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        <EnquiryTable data={filtered} onView={onView} onEdit={onEdit} />
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  IndianRupee,
  Layers,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import kyInstance from "@/lib/ky";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error-loading";
import { Progress } from "@/components/ui/progress";
import {
  Batch,
  Course,
  FeePayment,
  FeeStructure,
  Student,
  Teacher,
} from "@/lib/type";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function getData<T>(url: string) {
  const res = await kyInstance.get(url).json<ApiResponse<T>>();
  return res.data || [];
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const [students, courses, batches, teachers, feeStructures, payments] =
        await Promise.all([
          getData<Student[]>("students"),
          getData<Course[]>("courses"),
          getData<Batch[]>("batches"),
          getData<Teacher[]>("teachers"),
          getData<FeeStructure[]>("fee-structures"),
          getData<FeePayment[]>("payments"),
        ]);

      return { students, courses, batches, teachers, feeStructures, payments };
    },
  });

  const overview = useMemo(() => {
    const students = data?.students || [];
    const courses = data?.courses || [];
    const batches = data?.batches || [];
    const teachers = data?.teachers || [];
    const feeStructures = data?.feeStructures || [];
    const payments = data?.payments || [];

    const activeStudents = students.filter((s) => s.status === "ACTIVE").length;
    const completedStudents = students.filter(
      (s) => s.status === "COMPLETED"
    ).length;

    const runningBatches = batches.filter((b) => b.status === "ONGOING").length;

    const totalFee = feeStructures.reduce(
      (sum, fee) => sum + Number(fee.finalFee || 0),
      0
    );

    const collectedFee = payments
      .filter((p) => p.status === "COMPLETED")
      .reduce((sum, payment) => sum + Number(payment.totalAmount || 0), 0);

    const pendingFee = Math.max(totalFee - collectedFee, 0);

    const collectionRate =
      totalFee > 0 ? Math.round((collectedFee / totalFee) * 100) : 0;

    const recentStudents = [...students]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    const recentPayments = [...payments]
      .sort(
        (a, b) =>
          new Date(b.paidDate || b.createdAt).getTime() -
          new Date(a.paidDate || a.createdAt).getTime()
      )
      .slice(0, 5);

    const activeCourses = courses.filter((c) => c.isActive).length;

    return {
      students,
      courses,
      batches,
      teachers,
      payments,
      activeStudents,
      completedStudents,
      runningBatches,
      totalFee,
      collectedFee,
      pendingFee,
      collectionRate,
      recentStudents,
      recentPayments,
      activeCourses,
    };
  }, [data]);

  if (isLoading) return <Loading text="Loading dashboard overview..." />;
  if (isError) return <Error text="Failed to load dashboard data" />;

  const stats = [
    {
      title: "Total Students",
      value: overview.students.length,
      info: `${overview.activeStudents} active`,
      icon: Users,
    },
    {
      title: "Running Batches",
      value: overview.runningBatches,
      info: `${overview.batches.length} total batches`,
      icon: Layers,
    },
    {
      title: "Active Courses",
      value: overview.activeCourses,
      info: `${overview.courses.length} total courses`,
      icon: BookOpen,
    },
    {
      title: "Teachers",
      value: overview.teachers.length,
      info: "Available faculty",
      icon: UserRound,
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-6 text-white shadow-sm md:p-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              TFP Coding Classes
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Dashboard Overview
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100">
              Monitor institute growth, student performance, revenue insights, batch activity, and overall operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniBox
              label="Collected Fee"
              value={`₹${overview.collectedFee.toLocaleString("en-IN")}`}
            />
            <MiniBox
              label="Pending Fee"
              value={`₹${overview.pendingFee.toLocaleString("en-IN")}`}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">
                    {item.value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-400">
                  {item.info}
                </p>
                <ArrowUpRight
                  size={16}
                  className="text-slate-300 transition group-hover:text-indigo-600"
                />
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Fee Collection Summary
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Total fee, collected amount and pending balance.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <IndianRupee size={22} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <AmountBox
              label="Total Fee"
              value={overview.totalFee}
              icon={<TrendingUp size={18} />}
            />
            <AmountBox
              label="Collected"
              value={overview.collectedFee}
              icon={<IndianRupee size={18} />}
            />
            <AmountBox
              label="Pending"
              value={overview.pendingFee}
              icon={<CalendarDays size={18} />}
            />
          </div>

          <div className="mt-7 rounded-2xl bg-slate-50 p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                Collection Progress
              </p>
              <p className="text-sm font-bold text-indigo-600">
                {overview.collectionRate}%
              </p>
            </div>

            <Progress value={overview.collectionRate} />

            <p className="mt-3 text-xs text-slate-500">
              ₹{overview.collectedFee.toLocaleString("en-IN")} collected out of
              ₹{overview.totalFee.toLocaleString("en-IN")}.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Student Status</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quick admission overview.
          </p>

          <div className="mt-6 space-y-4">
            <ProgressRow
              label="Active Students"
              value={overview.activeStudents}
              total={overview.students.length}
            />
            <ProgressRow
              label="Completed Students"
              value={overview.completedStudents}
              total={overview.students.length}
            />
            <ProgressRow
              label="Other Students"
              value={
                overview.students.length -
                overview.activeStudents -
                overview.completedStudents
              }
              total={overview.students.length}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Recent Students</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest students added to the system.
          </p>

          <div className="mt-5 space-y-3">
            {overview.recentStudents.length === 0 ? (
              <EmptyText text="No students found" />
            ) : (
              overview.recentStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-500">{student.email}</p>
                  </div>

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {student.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">Recent Payments</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest fee payments received.
          </p>

          <div className="mt-5 space-y-3">
            {overview.recentPayments.length === 0 ? (
              <EmptyText text="No payments found" />
            ) : (
              overview.recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {payment.student?.name || "Student"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {payment.paymentMode} • {payment.status}
                    </p>
                  </div>

                  <p className="font-bold text-slate-950">
                    ₹{Number(payment.totalAmount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-xs text-indigo-100">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function AmountBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
        {icon}
      </div>

      <p className="text-xs font-medium text-slate-500">{label}</p>
      <h3 className="mt-2 text-xl font-bold text-slate-950">
        ₹{value.toLocaleString("en-IN")}
      </h3>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
      <Progress value={percent} />
    </div>
  );
}

function EmptyText({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}
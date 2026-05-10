"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCourse } from "./mutation";

export default function CourseAdd({ onBack }: { onBack: () => void }) {
  const createCourse = useCreateCourse();

  const [form, setForm] = useState({
    title: "",
    duration: "",
    descriptionInShort: "",
    descriptionInDetail: "",
    imageForThumbnail: "",
    roadmap: "",
    totalFees: "",
    offeredFees: "",
    instractionMode: "",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCourse.mutate(
      {
        title: form.title,
        duration: Number(form.duration),
        descriptionInShort: form.descriptionInShort,
        descriptionInDetail: form.descriptionInDetail,
        imageForThumbnail: form.imageForThumbnail,
        roadmap: form.roadmap,
        totalFees: Number(form.totalFees),
        offeredFees: Number(form.offeredFees),
        instractionMode: form.instractionMode,
      },
      { onSuccess: onBack }
    );
  };

  return (
    <div className="space-y-6">
      <Header
        title="Add Course"
        desc="Create a new course with fee, duration and learning details."
        onBack={onBack}
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Section title="Course Details">
          <Field label="Course Title">
            <Input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Duration">
            <Input
              required
              type="number"
              placeholder="Duration in months"
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Instruction Mode">
            <Input
              required
              placeholder="Online / Offline / Hybrid"
              value={form.instractionMode}
              onChange={(e) => update("instractionMode", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Thumbnail URL">
            <Input
              value={form.imageForThumbnail}
              onChange={(e) => update("imageForThumbnail", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>
        </Section>

        <Section title="Fees">
          <Field label="Total Fees">
            <Input
              required
              type="number"
              value={form.totalFees}
              onChange={(e) => update("totalFees", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>

          <Field label="Offered Fees">
            <Input
              required
              type="number"
              value={form.offeredFees}
              onChange={(e) => update("offeredFees", e.target.value)}
              className="h-11 rounded-xl border-slate-200"
            />
          </Field>
        </Section>

        <Section title="Description">
          <div className="md:col-span-2">
            <Field label="Short Description">
              <Input
                required
                value={form.descriptionInShort}
                onChange={(e) => update("descriptionInShort", e.target.value)}
                className="h-11 rounded-xl border-slate-200"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Detailed Description">
              <textarea
                required
                value={form.descriptionInDetail}
                onChange={(e) => update("descriptionInDetail", e.target.value)}
                className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Roadmap">
              <textarea
                value={form.roadmap}
                onChange={(e) => update("roadmap", e.target.value)}
                placeholder="Example: HTML, CSS, JavaScript, React..."
                className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
              />
            </Field>
          </div>
        </Section>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="rounded-xl border-slate-200"
          >
            Cancel
          </Button>

          <Button
            disabled={createCourse.isPending}
            className="rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
          >
            {createCourse.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Course
          </Button>
        </div>
      </form>
    </div>
  );
}

function Header({
  title,
  desc,
  onBack,
}: {
  title: string;
  desc: string;
  onBack: () => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          size="icon"
          className="rounded-xl border-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <BookOpen size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-950">{title}</h1>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7">
      <h2 className="mb-4 text-lg font-bold text-slate-950">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
    </div>
  );
}
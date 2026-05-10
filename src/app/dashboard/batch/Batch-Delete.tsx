"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  batchName: string;
  onConfirm: () => void;
  isPending?: boolean;
};

export default function BatchDelete({
  batchName,
  onConfirm,
  isPending = false,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => setOpen(true)}
        className="h-9 rounded-lg border-slate-200 px-3 text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Delete Batch</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-950">{batchName}</span>?
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl border-slate-200"
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isPending}
              onClick={handleConfirm}
              className="rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
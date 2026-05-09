"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface StudentDeleteProps {
  studentName: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function StudentDelete({
  studentName,
  onConfirm,
  isPending = false,
}: StudentDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (isPending) return;
    setOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 rounded-lg transition-all duration-150 shadow-none cursor-pointer"
        onClick={handleDeleteClick}
        disabled={isPending}
      >
        <Trash2 size={14} />
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (isPending) return;
          setOpen(value);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
          </DialogHeader>

          <p className="py-2">
            Are you sure you want to delete <strong>{studentName}</strong>?
          </p>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

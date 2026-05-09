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

interface CourseDeleteProps {
  courseTitle: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function CourseDelete({
  courseTitle,
  onConfirm,
  isPending = false,
}: CourseDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    if (isPending) return;
    setOpen(false);
  };

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-red-100 text-red-600 rounded-lg"
        onClick={handleDeleteClick}
        disabled={isPending}
      >
        <Trash2 size={16} />
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
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>

          <p className="py-2">
            Are you sure you want to delete <strong>{courseTitle}</strong>?
          </p>

          <DialogFooter className="flex justify-end space-x-2">
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

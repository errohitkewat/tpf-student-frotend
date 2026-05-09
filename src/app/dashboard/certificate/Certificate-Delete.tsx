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

interface CertificateDeleteProps {
  certificateNumber: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function CertificateDelete({
  certificateNumber,
  onConfirm,
  isPending = false,
}: CertificateDeleteProps) {
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
        className="h-8 w-8 p-0 rounded-lg text-red-600 hover:bg-red-100"
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
            <DialogTitle>Delete Certificate</DialogTitle>
          </DialogHeader>

          <p className="py-2">
            Are you sure you want to delete certificate{" "}
            <strong>{certificateNumber}</strong>?
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

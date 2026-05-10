"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  CreateEnquiryPayload,
  UpdateEnquiryPayload,
} from "@/app/service/enquiry.service";

export const useCreateEnquiry = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEnquiryPayload) => createEnquiry(data),
    onSuccess: () => {
      toast.success("Enquiry added");
      qc.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (e: any) => toast.error(e.message || "Failed to add enquiry"),
  });
};

export const useUpdateEnquiry = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEnquiryPayload }) =>
      updateEnquiry(id, data),
    onSuccess: () => {
      toast.success("Enquiry updated");
      qc.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (e: any) => toast.error(e.message || "Failed to update enquiry"),
  });
};

export const useDeleteEnquiry = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEnquiry(id),
    onSuccess: () => {
      toast.success("Enquiry deleted");
      qc.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (e: any) => toast.error(e.message || "Failed to delete enquiry"),
  });
};
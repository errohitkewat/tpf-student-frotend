import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  createFeePayment,
  CreateFeeStructurePayload,
  UpdateFeeStructurePayload,
  CreatePaymentPayload,
} from "@/app/service/fee.service";

export const useCreateFeeStructure = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFeeStructurePayload) =>
      createFeeStructure(data),
    onSuccess: () => {
      toast.success("Fee created");
      qc.invalidateQueries({ queryKey: ["fee-structures"] });
    },
    onError: (e: any) => toast.error(e.message || "Error"),
  });
};

export const useUpdateFeeStructure = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      feeId,
      data,
    }: {
      feeId: string;
      data: UpdateFeeStructurePayload;
    }) => updateFeeStructure(feeId, data),
    onSuccess: () => {
      toast.success("Fee updated");
      qc.invalidateQueries({ queryKey: ["fee-structures"] });
    },
    onError: (e: any) => toast.error(e.message || "Error"),
  });
};

export const useDeleteFeeStructure = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (feeId: string) => deleteFeeStructure(feeId),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["fee-structures"] });
    },
    onError: (e: any) => toast.error(e.message || "Error"),
  });
};

export const useCreateFeePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePaymentPayload) =>
      createFeePayment(data),
    onSuccess: () => {
      toast.success("Payment added");
      qc.invalidateQueries({ queryKey: ["fee-structures"] });
    },
    onError: (e: any) => toast.error(e.message || "Error"),
  });
};
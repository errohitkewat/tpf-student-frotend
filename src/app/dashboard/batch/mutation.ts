import {
  CreateBatchPayload,
  UpdateBatchFormValues,
  UpdateBatchPayload,
} from "@/app/service/batch.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBatchAction,
  deleteBatchAction,
  UpdateBatchAction,
} from "./action";
import { toast } from "sonner";

export const useCreateBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBatchPayload) => createBatchAction(data),

    onMutate: async (newBatch) => {
      await queryClient.cancelQueries({ queryKey: ["batches"] });

      const previousBatches = queryClient.getQueryData(["batches"]);

      queryClient.setQueryData(["batches"], (old: CreateBatchPayload) => {
        return old ? [old, { ...newBatch, id: Date.now() }] : [newBatch];
      });

      return { previousBatches };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousBatches) {
        queryClient.setQueryData(["batches"], context.previousBatches);
      }
      console.log("batch error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Batch created successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};

type UpdateBatchVariables = {
  batchId: string;
  data: UpdateBatchPayload;
};

export const useUpdateBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ batchId, data }: UpdateBatchVariables) =>
      UpdateBatchAction(data, batchId),

    onMutate: async ({ batchId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["batches"] });

      const previousBatches =
        queryClient.getQueryData<UpdateBatchFormValues[]>(["batches"]);

      queryClient.setQueryData<UpdateBatchFormValues[]>(
        ["batches"],
        (oldBatches = []) => {
          return oldBatches.map((batch) =>
            batch.id === batchId ? { ...batch, ...data, id: batch.id } : batch
          );
        }
      );

      return { previousBatches };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousBatches) {
        queryClient.setQueryData(["batches"], context.previousBatches);
      }

      console.log("batch update error", error);
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Batch updated successfully 🎉");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};

export const useDeleteBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (batchId: string) => deleteBatchAction(batchId),

    onMutate: async (batchId) => {
      await queryClient.cancelQueries({ queryKey: ["batches"] });

      const previousBatches = queryClient.getQueryData<any[]>(["batches"]);

      queryClient.setQueryData<any[]>(["batches"], (oldBatches = []) => {
        return oldBatches.filter((batch) => batch.id !== batchId);
      });

      return { previousBatches };
    },

    onError: (error: Error, _variables, context) => {
      if (context?.previousBatches) {
        queryClient.setQueryData(["batches"], context.previousBatches);
      }

      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success("Batch deleted successfully 🗑️");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};